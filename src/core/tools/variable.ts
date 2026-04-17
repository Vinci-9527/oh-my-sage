/**
 * Core - 变量工具
 */

import { GatewayClient } from '../gateway/client';
import type { Variable } from '../types';
import type { ToolResponse } from '../types';

export async function getVariables(gateway: GatewayClient, scope: string = 'global'): Promise<ToolResponse<Variable[]>> {
    try {
        const variables = await gateway.callApi<Variable[]>('getVarList', { scope }, 10000);
        return { success: true, data: Array.isArray(variables) ? variables : [] };
    } catch (error) {
        return { success: false, error: `获取变量列表失败: ${error}` };
    }
}

export async function setVariable(gateway: GatewayClient, id: string, value: string | number, scope: string = 'global'): Promise<ToolResponse> {
    try {
        await gateway.callApi('setVarValue', { scope, id, value }, 10000);
        return { success: true, message: `变量 ${id} 已更新为 ${value}` };
    } catch (error) {
        return { success: false, error: `设置变量值失败: ${error}` };
    }
}
