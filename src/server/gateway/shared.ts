/**
 * Web Gateway - 共享实例管理器
 * 使用 Core 的 GatewayManager
 */

import { GatewayClient } from '@/core/gateway/client';
import { createGatewayManager, type GatewayManager } from '@/core/gateway/manager';

const globalKey = '__oh_my_sage_gateway_manager__';

function getGlobalManager(): GatewayManager | null {
    return (globalThis as Record<string, unknown>)[globalKey] as GatewayManager | null;
}

function setGlobalManager(manager: GatewayManager): void {
    (globalThis as Record<string, unknown>)[globalKey] = manager;
}

export async function connectGateway(passcode: string, gatewayUrl?: string): Promise<GatewayClient> {
    let manager = getGlobalManager();
    if (!manager) {
        manager = createGatewayManager();
        setGlobalManager(manager);
    }

    await manager.connect(passcode, gatewayUrl);
    return manager.gateway!;
}

export function getGateway(): GatewayClient | null {
    const manager = getGlobalManager();
    return manager?.gateway ?? null;
}

export function isGatewayConnected(): boolean {
    const manager = getGlobalManager();
    return manager?.isConnected() ?? false;
}
