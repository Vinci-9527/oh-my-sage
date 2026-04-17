/**
 * Core - Gateway 连接管理器
 * 统一管理 Gateway 连接状态
 */

import { GatewayClient } from './client';

export interface GatewayManager {
    gateway: GatewayClient | null;
    isConnected(): boolean;
    connect(passcode: string, gatewayUrl?: string): Promise<void>;
    disconnect(): Promise<void>;
    ensureConnected(): void;
}

export function createGatewayManager(): GatewayManager {
    let gateway: GatewayClient | null = null;

    return {
        get gateway() {
            return gateway;
        },

        isConnected(): boolean {
            return gateway !== null && gateway.isConnected();
        },

        async connect(passcode: string, gatewayUrl?: string): Promise<void> {
            const url = gatewayUrl || process.env.GATEWAY_URL || 'http://192.168.0.5';

            if (gateway) {
                try {
                    await gateway.close();
                } catch {
                }
            }

            gateway = new GatewayClient();
            await gateway.connect(url);
            await gateway.authenticate(passcode);
        },

        async disconnect(): Promise<void> {
            if (gateway) {
                try {
                    await gateway.close();
                } catch {
                }
                gateway = null;
            }
        },

        ensureConnected(): void {
            if (!this.isConnected()) {
                throw new Error('网关未连接，请先调用 mijia_auth');
            }
        },
    };
}
