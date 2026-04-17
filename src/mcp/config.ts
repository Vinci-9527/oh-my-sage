/**
 * MCP Server - 配置管理
 */

import { z } from "zod";

// 默认配置
export const DEFAULT_CONFIG = {
  GATEWAY_URL: "http://192.168.0.5",
  CONNECT_TIMEOUT: 10000,
  API_TIMEOUT: 5000,
} as const;

// 配置 Schema
export const ConfigSchema = z.object({
  gatewayUrl: z.string().url().optional(),
  connectTimeout: z.number().positive().optional(),
  apiTimeout: z.number().positive().optional(),
});

export type Config = z.infer<typeof ConfigSchema>;

/**
 * 获取配置值
 * 优先级：传入参数 > 环境变量 > 默认值
 */
export function getConfig(userConfig?: Config): Required<Config> {
  const config = ConfigSchema.parse(userConfig || {});

  return {
    gatewayUrl: config.gatewayUrl || process.env.GATEWAY_URL || DEFAULT_CONFIG.GATEWAY_URL,
    connectTimeout: config.connectTimeout || DEFAULT_CONFIG.CONNECT_TIMEOUT,
    apiTimeout: config.apiTimeout || DEFAULT_CONFIG.API_TIMEOUT,
  };
}
