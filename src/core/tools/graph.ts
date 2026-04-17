/**
 * Core - 规则工具
 */

import { GatewayClient } from '../gateway/client';
import type { Graph, GraphSummary, CreateGraphInput, ValidationError } from '../types/graph';
import type { ToolResponse } from '../types';
import { validateGraph, layoutNodes } from './base';

export async function getGraphs(gateway: GatewayClient): Promise<ToolResponse<GraphSummary[]>> {
    try {
        const graphs = await gateway.callApi<Array<{ id: string; enable?: boolean; userData?: { name?: string; lastUpdateTime?: number }; createTime?: number }>>('getGraphList', {}, 10000);
        const graphList = Array.isArray(graphs) ? graphs : [];
        return {
            success: true,
            data: graphList.map((graph) => ({
                id: graph.id,
                name: graph.userData?.name || graph.id,
                enable: graph.enable ?? false,
                createTime: graph.createTime,
                updateTime: graph.userData?.lastUpdateTime,
            })),
        };
    } catch (error) {
        return { success: false, error: `获取规则列表失败: ${error}` };
    }
}

export async function getGraph(gateway: GatewayClient, id: string): Promise<ToolResponse<Graph>> {
    try {
        const graph = await gateway.callApi<Graph>('getGraph', { id }, 10000);
        return { success: true, data: graph };
    } catch (error) {
        return { success: false, error: `获取规则详情失败: ${error}` };
    }
}

export async function createGraph(gateway: GatewayClient, input: CreateGraphInput): Promise<ToolResponse<{ graphId: string }>> {
    try {
        const graphId = `graph_${Date.now()}`;

        const processedNodes = input.nodes.map((node) => ({
            ...node,
            cfg: {
                ...node.cfg,
                name: (node.cfg as Record<string, unknown>)?.name || node.type,
                version: (node.cfg as Record<string, unknown>)?.version ?? 1,
            },
            props: node.props || {},
        }));

        layoutNodes(processedNodes);

        const graph = {
            id: graphId,
            nodes: processedNodes,
            cfg: {
                id: graphId,
                enable: input.enable ?? true,
                uiType: 'graph',
                userData: {
                    name: input.name,
                    lastUpdateTime: Date.now(),
                    transform: { x: 0, y: 0, scale: 1, rotate: 0 },
                },
            },
        };

        const errors = validateGraph(graph);
        const errorList = errors.filter((e: { level: string }) => e.level === 'error');
        if (errorList.length > 0) {
            return {
                success: false,
                error: `规则校验失败（${errorList.length} 个错误），请修复后重试`,
            };
        }

        await gateway.callApi('setGraph', graph, 10000);

        return { success: true, data: { graphId }, message: `规则 "${input.name}" 创建成功` };
    } catch (error) {
        return { success: false, error: `创建规则失败: ${error}` };
    }
}

export async function updateGraph(gateway: GatewayClient, id: string, input: Partial<CreateGraphInput>): Promise<ToolResponse> {
    try {
        const existing = await gateway.callApi<Graph>('getGraph', { id }, 10000);
        const graphList = await gateway.callApi('getGraphList', {}, 10000);
        const graphInfo = Array.isArray(graphList)
            ? graphList.find((g: Graph) => g.id === id)
            : null;

        const inputNodes = input.nodes || existing.nodes;
        const processedNodes = inputNodes.map((node) => ({
            ...node,
            cfg: {
                ...node.cfg,
                name: (node.cfg as Record<string, unknown>)?.name || node.type,
                version: (node.cfg as Record<string, unknown>)?.version ?? 1,
            },
            props: node.props || {},
        }));

        if (input.nodes) {
            layoutNodes(processedNodes);
        }

        const graph = {
            id,
            nodes: processedNodes,
            cfg: {
                id,
                enable: input.enable ?? true,
                uiType: 'graph',
                userData: {
                    name: input.name || (graphInfo as unknown as { userData?: { name?: string } })?.userData?.name || '规则',
                    lastUpdateTime: Date.now(),
                    transform: (graphInfo as unknown as { userData?: { transform?: { x: number; y: number; scale: number; rotate: number } } })?.userData?.transform || { x: 0, y: 0, scale: 1, rotate: 0 },
                },
            },
        };

        if (input.nodes) {
            const errors = validateGraph(graph);
            const errorList = errors.filter((e: { level: string }) => e.level === 'error');
            if (errorList.length > 0) {
                return { success: false, error: `规则校验失败（${errorList.length} 个错误），请修复后重试` };
            }
        }

        await gateway.callApi('setGraph', graph, 10000);

        return { success: true, message: `规则 ${id} 更新成功` };
    } catch (error) {
        return { success: false, error: `更新规则失败: ${error}` };
    }
}

export async function deleteGraph(gateway: GatewayClient, id: string): Promise<ToolResponse> {
    try {
        await gateway.callApi('deleteGraph', { id }, 10000);
        return { success: true, message: `规则 ${id} 删除成功` };
    } catch (error) {
        return { success: false, error: `删除规则失败: ${error}` };
    }
}

export async function toggleGraph(gateway: GatewayClient, id: string, enable: boolean): Promise<ToolResponse> {
    try {
        const graphList = await gateway.callApi('getGraphList', {}, 10000);
        const graphInfo = Array.isArray(graphList)
            ? graphList.find((g: Graph) => g.id === id)
            : null;

        if (!graphInfo) {
            return { success: false, error: `规则 ${id} 不存在` };
        }

        await gateway.callApi('changeGraphConfig', {
            id,
            enable,
            userData: {
                name: (graphInfo as unknown as { userData?: { name?: string } })?.userData?.name || '未命名规则',
                lastUpdateTime: Date.now(),
                transform: (graphInfo as unknown as { userData?: { transform?: { x: number; y: number; scale: number; rotate: number } } })?.userData?.transform || { x: 0, y: 0, scale: 1, rotate: 0 },
            },
        }, 10000);

        return { success: true, message: `规则 ${id} 已${enable ? '启用' : '禁用'}` };
    } catch (error) {
        return { success: false, error: `切换规则状态失败: ${error}` };
    }
}
