/**
 * MCP Server - 变量管理工具
 */

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GatewayManager } from "../../core/gateway/manager.js";
import { getVariables, setVariable } from "../../core/index.js";
import {
  ResponseFormatSchema,
  formatJson,
  handleError,
  formatVariableListMarkdown,
} from "../utils.js";

export function registerVariableTools(
  server: McpServer,
  gatewayManager: GatewayManager
): void {
  // ==================== mijia_get_variables ====================
  server.registerTool(
    "mijia_get_variables",
    {
      title: "获取变量列表",
      description: `获取自动化变量列表。

变量可用于规则间的数据传递和状态存储。

Args:
  - scope (string, optional): 变量作用域，默认 "global"`,
      inputSchema: z.object({
        scope: z.string().default("global").describe("变量作用域，默认 global"),
        response_format: ResponseFormatSchema.optional().default("markdown").describe("输出格式"),
      }),
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async ({ scope = "global", response_format = "markdown" }) => {
      try {
        gatewayManager.ensureConnected();
        const result = await getVariables(gatewayManager.gateway!, scope);

        if (!result.success) {
          return {
            content: [{ type: "text", text: handleError(new Error(result.error), "get_variables") }],
            isError: true,
          };
        }

        const variables = result.data ?? [];
        const output = { variables, count: variables.length, scope };

        if (response_format === "json") {
          return {
            content: [{ type: "text", text: formatJson(output) }],
            structuredContent: output,
          };
        }

        return {
          content: [{ type: "text", text: formatVariableListMarkdown(variables, scope) }],
          structuredContent: output,
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: handleError(error, "get_variables") }],
          isError: true,
        };
      }
    }
  );

  // ==================== mijia_set_variable ====================
  server.registerTool(
    "mijia_set_variable",
    {
      title: "设置变量值",
      description: `设置自动化变量的值。

Args:
  - id (string): 变量ID
  - value (string | number): 变量值
  - scope (string, optional): 变量作用域，默认 "global"`,
      inputSchema: z.object({
        id: z.string().describe("变量ID"),
        value: z.union([z.string(), z.number()]).describe("变量值"),
        scope: z.string().default("global").describe("变量作用域，默认 global"),
      }),
      annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async ({ id, value, scope = "global" }) => {
      try {
        gatewayManager.ensureConnected();
        const result = await setVariable(gatewayManager.gateway!, id, value, scope);

        if (!result.success) {
          return {
            content: [{ type: "text", text: handleError(new Error(result.error), "set_variable") }],
            isError: true,
          };
        }

        return {
          content: [{ type: "text", text: result.message || `变量 ${id} 已更新为 ${value}` }],
          structuredContent: { success: true, id, value, scope },
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: handleError(error, "set_variable") }],
          isError: true,
        };
      }
    }
  );
}
