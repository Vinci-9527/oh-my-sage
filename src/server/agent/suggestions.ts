/**
 * oh-my-sage - 建议生成器
 * 根据用户意图生成多个建议方案
 */

import { generateObject } from 'ai';
import { z } from 'zod';
import { createModel, ModelConfig, getModelConfigFromEnv } from '../ai/model';
import { SUGGESTION_GENERATION_PROMPT } from '../ai/prompts';
import { Intent, Suggestion, Device } from '../../shared/types';

/**
 * 建议方案 Schema
 */
const SuggestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  preview: z.string(),
  advantages: z.array(z.string()),
  disadvantages: z.array(z.string()),
  complexity: z.enum(['low', 'medium', 'high']),
});

/**
 * 建议生成器类
 */
export class SuggestionGenerator {
  private model: any;
  private modelConfig: ModelConfig;

  constructor(modelConfig?: ModelConfig) {
    this.modelConfig = modelConfig || getModelConfigFromEnv();
    this.model = createModel(this.modelConfig);
  }

  /**
   * 生成建议方案
   * 
   * @param intent 用户意图
   * @param devices 设备列表
   * @returns 建议方案列表
   */
  async generate(intent: Intent, devices: Device[]): Promise<Suggestion[]> {
    try {
      // 使用 AI 生成建议
      const aiSuggestions = await this.generateWithAI(intent, devices);
      
      // 合并预定义的建议模板
      const templateSuggestions = this.generateFromTemplates(intent, devices);
      
      // 去重并排序
      const allSuggestions = this.deduplicateSuggestions([
        ...aiSuggestions,
        ...templateSuggestions,
      ]);

      return this.rankSuggestions(allSuggestions, intent);
    } catch (error) {
      console.error('生成建议失败:', error);
      // 降级到模板建议
      return this.generateFromTemplates(intent, devices);
    }
  }

  /**
   * 使用 AI 生成建议
   */
  private async generateWithAI(intent: Intent, devices: Device[]): Promise<Suggestion[]> {
    const deviceInfo = devices.map(d => ({
      name: d.name,
      model: d.modelName,
      room: d.roomName,
      online: d.online,
    }));

    const prompt = `${SUGGESTION_GENERATION_PROMPT}

## 用户意图

类型: ${intent.type}
规则名称: ${intent.ruleName || '未指定'}
触发器: ${JSON.stringify(intent.trigger, null, 2)}
条件: ${JSON.stringify(intent.conditions, null, 2)}
动作: ${JSON.stringify(intent.actions, null, 2)}

## 可用设备

${JSON.stringify(deviceInfo, null, 2)}

## 重要要求

请根据用户意图和可用设备，生成 2-4 个不同的实现方案。
**必须按推荐度从高到低排序**：
1. 第一个方案必须是最简单直接、最符合用户需求的方案（推荐度最高）
2. 后续方案可以是更复杂但可能更有特色的方案
3. 确保第一个方案是用户最可能想要的方案`;

    const result = await generateObject({
      model: this.model,
      schema: z.object({
        suggestions: z.array(SuggestionSchema),
      }),
      prompt,
    });

    return result.object.suggestions;
  }

  /**
   * 从模板生成建议
   */
  private generateFromTemplates(intent: Intent, devices: Device[]): Suggestion[] {
    const suggestions: Suggestion[] = [];

    switch (intent.type) {
      case 'create_graph':
        suggestions.push(...this.generateCreateGraphSuggestions(intent, devices));
        break;
      case 'modify_graph':
        suggestions.push(...this.generateModifyGraphSuggestions(intent, devices));
        break;
      case 'query_device':
        suggestions.push(...this.generateDeviceQuerySuggestions(devices));
        break;
    }

    return suggestions;
  }

  /**
   * 生成创建规则的建议
   */
  private generateCreateGraphSuggestions(intent: Intent, devices: Device[]): Suggestion[] {
    const suggestions: Suggestion[] = [];

    // 方案1: 简单触发-动作
    suggestions.push({
      id: 'simple_trigger_action',
      title: '简单触发-动作',
      description: '当触发条件满足时，直接执行动作',
      preview: this.generateSimplePreview(intent),
      advantages: ['配置简单', '响应快速', '容易调试'],
      disadvantages: ['功能单一', '无法处理复杂逻辑'],
      complexity: 'low',
    });

    // 方案2: 带条件判断
    suggestions.push({
      id: 'with_condition',
      title: '带条件判断',
      description: '触发后检查条件，满足条件才执行动作',
      preview: this.generateConditionPreview(intent),
      advantages: ['更智能', '避免误触发', '支持复杂场景'],
      disadvantages: ['配置稍复杂', '可能有延迟'],
      complexity: 'medium',
    });

    // 方案3: 多动作组合
    if (intent.actions && intent.actions.length > 0) {
      suggestions.push({
        id: 'multi_action',
        title: '多动作组合',
        description: '一次触发执行多个动作',
        preview: this.generateMultiActionPreview(intent),
        advantages: ['功能丰富', '减少规则数量', '联动效果好'],
        disadvantages: ['调试困难', '单点故障影响大'],
        complexity: 'medium',
      });
    }

    // 方案4: 带延时
    suggestions.push({
      id: 'with_delay',
      title: '带延时执行',
      description: '触发后等待一段时间再执行动作',
      preview: this.generateDelayPreview(intent),
      advantages: ['避免瞬时触发', '支持定时场景', '更人性化'],
      disadvantages: ['响应有延迟', '可能错过最佳时机'],
      complexity: 'low',
    });

    return suggestions;
  }

  /**
   * 生成修改规则的建议
   */
  private generateModifyGraphSuggestions(intent: Intent, devices: Device[]): Suggestion[] {
    return [
      {
        id: 'add_condition',
        title: '添加条件',
        description: '为现有规则添加执行条件',
        preview: '触发器 → 新条件 → 动作',
        advantages: ['更智能', '减少误触发'],
        disadvantages: ['可能影响原有逻辑'],
        complexity: 'medium',
      },
      {
        id: 'add_action',
        title: '添加动作',
        description: '在现有规则中添加更多动作',
        preview: '触发器 → 条件 → 原动作 + 新动作',
        advantages: ['功能增强', '联动更多设备'],
        disadvantages: ['执行时间变长'],
        complexity: 'low',
      },
      {
        id: 'modify_trigger',
        title: '修改触发条件',
        description: '更改规则的触发条件',
        preview: '新触发器 → 条件 → 动作',
        advantages: ['改变触发时机', '更灵活'],
        disadvantages: ['需要重新测试'],
        complexity: 'medium',
      },
    ];
  }

  /**
   * 生成设备查询的建议
   */
  private generateDeviceQuerySuggestions(devices: Device[]): Suggestion[] {
    const onlineDevices = devices.filter(d => d.online);
    const offlineDevices = devices.filter(d => !d.online);

    const suggestions: Suggestion[] = [];

    if (onlineDevices.length > 0) {
      suggestions.push({
        id: 'online_devices',
        title: '查看在线设备',
        description: `当前有 ${onlineDevices.length} 个设备在线`,
        preview: onlineDevices.map(d => `- ${d.name}`).join('\n'),
        advantages: ['了解当前可用设备'],
        disadvantages: ['不包含离线设备'],
        complexity: 'low',
      });
    }

    if (offlineDevices.length > 0) {
      suggestions.push({
        id: 'offline_devices',
        title: '查看离线设备',
        description: `当前有 ${offlineDevices.length} 个设备离线`,
        preview: offlineDevices.map(d => `- ${d.name}`).join('\n'),
        advantages: ['了解需要检查的设备'],
        disadvantages: ['设备可能无法控制'],
        complexity: 'low',
      });
    }

    return suggestions;
  }

  /**
   * 生成简单预览
   */
  private generateSimplePreview(intent: Intent): string {
    let preview = '';
    
    if (intent.trigger) {
      preview += `触发: ${this.describeTrigger(intent.trigger)}\n`;
    }
    
    if (intent.actions) {
      preview += `动作: ${intent.actions.map((a: any) => this.describeAction(a)).join(', ')}`;
    }
    
    return preview || '触发器 → 动作';
  }

  /**
   * 生成带条件的预览
   */
  private generateConditionPreview(intent: Intent): string {
    let preview = '';
    
    if (intent.trigger) {
      preview += `触发: ${this.describeTrigger(intent.trigger)}\n`;
    }
    
    if (intent.conditions && intent.conditions.length > 0) {
      preview += `条件: ${intent.conditions.map((c: any) => this.describeCondition(c)).join(' AND ')}\n`;
    } else {
      preview += '条件: 可添加额外条件\n';
    }
    
    if (intent.actions) {
      preview += `动作: ${intent.actions.map((a: any) => this.describeAction(a)).join(', ')}`;
    }
    
    return preview;
  }

  /**
   * 生成多动作预览
   */
  private generateMultiActionPreview(intent: Intent): string {
    let preview = '';
    
    if (intent.trigger) {
      preview += `触发: ${this.describeTrigger(intent.trigger)}\n`;
    }
    
    if (intent.actions && intent.actions.length > 0) {
      preview += '动作:\n';
      intent.actions.forEach((action: any, i: number) => {
        preview += `  ${i + 1}. ${this.describeAction(action)}\n`;
      });
      preview += '  + 可添加更多动作';
    }
    
    return preview;
  }

  /**
   * 生成延时预览
   */
  private generateDelayPreview(intent: Intent): string {
    let preview = '';
    
    if (intent.trigger) {
      preview += `触发: ${this.describeTrigger(intent.trigger)}\n`;
    }
    
    preview += '延时: 等待一段时间\n';
    
    if (intent.actions) {
      preview += `动作: ${intent.actions.map(a => this.describeAction(a)).join(', ')}`;
    }
    
    return preview;
  }

  /**
   * 描述触发器
   */
  private describeTrigger(trigger: any): string {
    switch (trigger.type) {
      case 'device':
        return `当 ${trigger.deviceName} 的 ${trigger.property || '状态'} 变化时`;
      case 'timer':
        return `定时 ${trigger.time?.hour || 0}:${String(trigger.time?.minute || 0).padStart(2, '0')}`;
      case 'manual':
        return '手动触发';
      default:
        return '触发器';
    }
  }

  /**
   * 描述条件
   */
  private describeCondition(condition: any): string {
    if (condition.type === 'device') {
      return `${condition.deviceName} 的 ${condition.property} ${condition.operator} ${condition.value}`;
    }
    return '条件';
  }

  /**
   * 描述动作
   */
  private describeAction(action: any): string {
    if (action.type === 'device') {
      return `设置 ${action.deviceName} ${action.action || '状态'} 为 ${action.value}`;
    }
    return '动作';
  }

  /**
   * 去重建议
   */
  private deduplicateSuggestions(suggestions: Suggestion[]): Suggestion[] {
    const seen = new Set<string>();
    return suggestions.filter(s => {
      if (seen.has(s.id)) {
        return false;
      }
      seen.add(s.id);
      return true;
    });
  }

  /**
   * 排序建议
   */
  private rankSuggestions(suggestions: Suggestion[], intent: Intent): Suggestion[] {
    return suggestions.sort((a, b) => {
      // 按复杂度排序：low > medium > high
      const complexityOrder: Record<string, number> = { low: 0, medium: 1, high: 2 };
      const aOrder = complexityOrder[a.complexity || 'medium'];
      const bOrder = complexityOrder[b.complexity || 'medium'];
      
      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
      
      // 按优点数量排序
      return (b.advantages?.length || 0) - (a.advantages?.length || 0);
    });
  }
}