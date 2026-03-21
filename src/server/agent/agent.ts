/**
 * oh-my-sage - Agent 核心
 * 实现工具驱动的 Agent 循环
 */

import { streamText, CoreMessage } from 'ai';
import { createModel, ModelConfig, getModelConfigFromEnv } from '../ai/model';
import { createTools } from '../ai/tools';
import { SYSTEM_PROMPT } from '../ai/prompts';
import { GatewayClient } from '../gateway/client';
import { getSessionStore, ToolCall } from '../session/store';
import { formatSkillCatalogForPrompt } from '../skills/loader';


/**
 * Agent 输出类型
 */
export type AgentOutput =
  | { type: 'text'; content: string }
  | { type: 'thinking'; content: string }
  | { type: 'tool_start'; tool: string; args: any }
  | { type: 'tool_result'; tool: string; result: any }
  | { type: 'waiting_input'; question?: string; options?: string[] }
  | { type: 'complete'; message?: string }
  | { type: 'error'; error: string };

/**
 * Agent 类
 * 实现持续运行的思考-行动循环
 */
export class Agent {
  private messages: CoreMessage[] = [];
  private gateway: GatewayClient;
  private modelConfig: ModelConfig;
  private tools: any;
  private sessionId: string | null = null;
  private sessionStore = getSessionStore();
  private systemPrompt: string;

  constructor(gateway: GatewayClient, modelConfig?: ModelConfig) {
    this.gateway = gateway;
    this.modelConfig = modelConfig || getModelConfigFromEnv();
    this.tools = createTools(gateway, this.modelConfig);
    
    // 渐进式披露第一层：只添加 skill catalog（name + description）
    const skillsCatalog = formatSkillCatalogForPrompt();
    this.systemPrompt = SYSTEM_PROMPT + skillsCatalog;
  }

  /**
   * 设置当前 session
   */
  setSession(sessionId: string): void {
    this.sessionId = sessionId;
  }

  /**
   * 加载 session 历史到 messages
   */
  async loadSession(sessionId: string): Promise<void> {
    this.sessionId = sessionId;
    const sessionMessages = await this.sessionStore.getMessages(sessionId);

    // 转换为 CoreMessage 格式
    this.messages = sessionMessages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));
  }

  /**
   * 保存用户消息到 session
   */
  private async saveUserMessage(content: string): Promise<void> {
    if (!this.sessionId) return;

    try {
      await this.sessionStore.appendMessage(this.sessionId, {
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('保存用户消息失败:', error);
    }
  }

  /**
   * 保存助手消息到 session
   */
  private async saveAssistantMessage(
    content: string,
    thinking: string,
    toolCalls: ToolCall[]
  ): Promise<void> {
    if (!this.sessionId) return;

    try {
      await this.sessionStore.appendMessage(this.sessionId, {
        role: 'assistant',
        content,
        timestamp: new Date().toISOString(),
        thinking: thinking || undefined,
        toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
      });
    } catch (error) {
      console.error('保存助手消息失败:', error);
    }
  }

  /**
   * Agent 主循环
   * 返回一个异步生成器，用于流式输出
   */
  async *run(userInput?: string): AsyncGenerator<AgentOutput> {
    // 添加用户输入到消息历史
    if (userInput) {
      this.messages.push({ role: 'user', content: userInput });
      // 保存用户消息到 session
      await this.saveUserMessage(userInput);
    }

    try {
      // 创建模型实例
      const model = createModel(this.modelConfig);

      // 使用 Vercel AI SDK 的 streamText
      const result = await streamText({
        model,
        system: this.systemPrompt,
        messages: this.messages,
        tools: this.tools,
        maxSteps: 15,  // 防止无限循环
        temperature: this.modelConfig.temperature || 0.7,
      });

      // 处理流式输出
      let fullText = '';
      let thinkingText = '';
      const toolCalls: ToolCall[] = [];
      let needsUserInput = false;
      let waitingQuestion: string | undefined;
      let waitingOptions: string[] | undefined;
      let currentToolCall: { tool: string; args: any } | null = null;

      for await (const chunk of result.fullStream) {
        switch (chunk.type) {
          case 'text-delta':
            // 文本输出（思考过程）
            fullText += chunk.textDelta;
            thinkingText += chunk.textDelta;
            yield { type: 'thinking', content: chunk.textDelta };
            break;

          case 'tool-call':
            // 工具调用开始
            currentToolCall = { tool: chunk.toolName, args: chunk.args };
            yield {
              type: 'tool_start',
              tool: chunk.toolName,
              args: chunk.args,
            };
            break;

          case 'tool-result':
            // 工具执行结果
            const toolCall: ToolCall = {
              tool: currentToolCall?.tool || chunk.toolName,
              args: currentToolCall?.args,
              result: chunk.result,
              success: chunk.result?.success !== false,
            };
            toolCalls.push(toolCall);
            currentToolCall = null;

            yield {
              type: 'tool_result',
              tool: chunk.toolName,
              result: chunk.result,
            };

            // 检查是否需要用户输入
            if (chunk.result?.needsUserInput) {
              needsUserInput = true;
              waitingQuestion = chunk.result.question;
              waitingOptions = chunk.result.options;
            }
            break;

          case 'step-finish':
            // 一步完成
            if (needsUserInput) {
              // 需要用户输入，暂停循环
              // 保存当前进度到 session
              await this.saveAssistantMessage(fullText, thinkingText, toolCalls);

              yield {
                type: 'waiting_input',
                question: waitingQuestion,
                options: waitingOptions,
              };
              return;
            }
            break;

          case 'finish':
            // 整体完成
            if (fullText) {
              this.messages.push({ role: 'assistant', content: fullText });
            }
            // 保存助手消息到 session
            await this.saveAssistantMessage(fullText, thinkingText, toolCalls);

            yield { type: 'complete', message: fullText };
            return;

          case 'error':
            yield { type: 'error', error: String(chunk.error) };
            return;
        }
      }

      // 如果循环结束但没有收到 finish 事件
      if (fullText) {
        this.messages.push({ role: 'assistant', content: fullText });
      }
      // 保存助手消息到 session
      await this.saveAssistantMessage(fullText, thinkingText, toolCalls);

      yield { type: 'complete', message: fullText };

    } catch (error) {
      yield { type: 'error', error: String(error) };
    }
  }

  /**
   * 简化版 run 方法
   * 返回完整响应（非流式）
   */
  async chat(userInput: string): Promise<string> {
    let response = '';

    for await (const output of this.run(userInput)) {
      if (output.type === 'thinking') {
        response += output.content;
      } else if (output.type === 'complete') {
        response = output.message || response;
      } else if (output.type === 'error') {
        throw new Error(output.error);
      }
    }

    return response;
  }

  /**
   * 获取对话历史
   */
  getHistory(): CoreMessage[] {
    return [...this.messages];
  }

  /**
   * 清空对话
   */
  clear(): void {
    this.messages = [];
  }

  /**
   * 设置模型配置
   */
  setModelConfig(config: ModelConfig): void {
    this.modelConfig = config;
  }

  /**
   * 获取当前模型配置
   */
  getModelConfig(): ModelConfig {
    return this.modelConfig;
  }
}
