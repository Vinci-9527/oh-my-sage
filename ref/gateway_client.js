#!/usr/bin/env node
/**
 * 米家网关客户端 - 纯 Node.js 实现
 * 基于 gateway.6cbc85.js 分析实现
 * 
 * 用法: node gateway_client.js [passcode]
 */

const WebSocket = require('ws');
const crypto = require('crypto');
const { deflateRawSync, inflateRawSync } = require('zlib');
const elliptic = require('elliptic');
const BN = require('bn.js');
const fs = require('fs');
const path = require('path');

const EC = new (elliptic.ec)('secp256k1');

// ==================== AES-GCM ====================
class AESGCMCipher {
    constructor(key, nonce) {
        if (key.length !== 16) throw new Error('key must be 16 bytes');
        if (nonce.length !== 8) throw new Error('nonce must be 8 bytes');
        this.key = key;
        this.nonce = nonce;
        this.encryptCounter = 1;
        this.decryptCounter = 0;
    }

    _makeIV(counter) {
        const iv = Buffer.alloc(12);
        this.nonce.copy(iv, 0);
        iv.writeUInt32LE(counter, 8);
        return iv;
    }

    encrypt(data) {
        const counter = this.encryptCounter++;
        const iv = this._makeIV(counter);
        const cipher = crypto.createCipheriv('aes-128-gcm', this.key, iv);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
        const tag = cipher.getAuthTag();
        
        const result = Buffer.alloc(4 + encrypted.length + tag.length);
        result.writeUInt32LE(counter, 0);
        encrypted.copy(result, 4);
        tag.copy(result, 4 + encrypted.length);
        return result;
    }

    decrypt(data) {
        if (data.length < 20) throw new Error('Data too short');
        const counter = data.readUInt32LE(0);
        if (counter <= this.decryptCounter) throw new Error('Replay attack');
        this.decryptCounter = counter;
        
        const ciphertext = data.slice(4, data.length - 16);
        const tag = data.slice(data.length - 16);
        const iv = this._makeIV(counter);
        
        const decipher = crypto.createDecipheriv('aes-128-gcm', this.key, iv);
        decipher.setAuthTag(tag);
        return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    }
}

// ==================== 压缩/解压 ====================
function compress(data) {
    const compressed = deflateRawSync(data);
    const result = Buffer.alloc(4 + compressed.length);
    result.writeUInt32LE(data.length, 0);
    compressed.copy(result, 4);
    return result;
}

function decompress(data) {
    if (data.length < 4) throw new Error('Data too short');
    return inflateRawSync(data.slice(4));
}

// ==================== ECJPAKE ====================
class ECJPAKE {
    constructor(secret, role = 'client') {
        if (role !== 'client' && role !== 'server') throw new Error('Invalid role');
        this.role = role;
        this.peerRole = role === 'client' ? 'server' : 'client';
        this.secretBytes = Buffer.from(secret, 'utf8');
        
        this.x1 = null;
        this.x2 = null;
        this.g_x1 = null;
        this.g_x2 = null;
        this.g_x3 = null;
        this.g_x4 = null;
        
        this.roundOneSent = false;
        this.roundOneReceived = false;
        this.roundTwoSent = false;
        this.roundTwoReceived = false;
    }

    encodePoint(point) {
        const result = Buffer.alloc(66);
        result[0] = 65;
        result[1] = 4;
        Buffer.from(point.getX().toArray('be', 32)).copy(result, 2);
        Buffer.from(point.getY().toArray('be', 32)).copy(result, 34);
        return result;
    }

    encodePointForHash(point) {
        const result = Buffer.alloc(69);
        result.writeUInt32BE(65, 0);
        result[4] = 4;
        Buffer.from(point.getX().toArray('be', 32)).copy(result, 5);
        Buffer.from(point.getY().toArray('be', 32)).copy(result, 37);
        return result;
    }

    decodePoint(data) {
        if (data[0] !== 65 || data[1] !== 4) throw new Error('Invalid point format');
        return EC.keyFromPublic({
            x: data.slice(2, 34).toString('hex'),
            y: data.slice(34, 66).toString('hex')
        }).getPublic();
    }

    zkpHash(g, v, publicPoint, name) {
        const nameBytes = Buffer.from(name, 'utf8');
        const data = Buffer.concat([
            this.encodePointForHash(g),
            this.encodePointForHash(v),
            this.encodePointForHash(publicPoint),
            Buffer.alloc(4),
            nameBytes
        ]);
        data.writeUInt32BE(nameBytes.length, 207);
        return new BN(crypto.createHash('sha256').update(data).digest()).umod(EC.n);
    }

    generateZKP(g, publicPoint, privateKey, name) {
        const k = new BN(crypto.randomBytes(32)).umod(EC.n);
        if (k.isZero()) k.iaddn(1);
        const v = g.mul(k);
        const challenge = this.zkpHash(g, v, publicPoint, name);
        const r = k.sub(challenge.mul(privateKey)).umod(EC.n);
        return { v, r };
    }

    verifyZKP(g, publicPoint, v, r, name) {
        const challenge = this.zkpHash(g, v, publicPoint, name);
        return publicPoint.mul(challenge).add(g.mul(r)).eq(v);
    }

    encodeZKP(v, r) {
        const result = Buffer.alloc(99);
        this.encodePoint(v).copy(result, 0);
        result[66] = 32;
        Buffer.from(r.toArray('be', 32)).copy(result, 67);
        return result;
    }

    decodeZKP(data) {
        return {
            v: this.decodePoint(data.slice(0, 66)),
            r: new BN(data.slice(67, 99))
        };
    }

    writeRoundOne() {
        if (this.roundOneSent) throw new Error('Round one already sent');
        this.roundOneSent = true;
        
        const g = EC.g;
        this.x1 = new BN(crypto.randomBytes(32)).umod(EC.n);
        this.x2 = new BN(crypto.randomBytes(32)).umod(EC.n);
        this.g_x1 = g.mul(this.x1);
        this.g_x2 = g.mul(this.x2);
        
        const zkp1 = this.generateZKP(g, this.g_x1, this.x1, this.role);
        const zkp2 = this.generateZKP(g, this.g_x2, this.x2, this.role);
        
        const result = Buffer.alloc(330);
        this.encodePoint(this.g_x1).copy(result, 0);
        this.encodeZKP(zkp1.v, zkp1.r).copy(result, 66);
        this.encodePoint(this.g_x2).copy(result, 165);
        this.encodeZKP(zkp2.v, zkp2.r).copy(result, 231);
        return result;
    }

    readRoundOne(data) {
        if (this.roundOneReceived) throw new Error('Round one already received');
        this.roundOneReceived = true;
        
        const g = EC.g;
        console.log('[readRoundOne] Decoding g_x3...');
        this.g_x3 = this.decodePoint(data.slice(0, 66));
        console.log('[readRoundOne] Decoding ZKP1...');
        const zkp1 = this.decodeZKP(data.slice(66, 165));
        console.log('[readRoundOne] Decoding g_x4...');
        this.g_x4 = this.decodePoint(data.slice(165, 231));
        console.log('[readRoundOne] Decoding ZKP2...');
        const zkp2 = this.decodeZKP(data.slice(231, 330));
        
        console.log('[readRoundOne] Verifying ZKP1...');
        if (!this.verifyZKP(g, this.g_x3, zkp1.v, zkp1.r, this.peerRole))
            throw new Error('ZKP verification failed for g_x3');
        console.log('[readRoundOne] ZKP1 verified');
        console.log('[readRoundOne] Verifying ZKP2...');
        if (!this.verifyZKP(g, this.g_x4, zkp2.v, zkp2.r, this.peerRole))
            throw new Error('ZKP verification failed for g_x4');
        console.log('[readRoundOne] ZKP2 verified');
    }

    writeRoundTwo() {
        if (this.roundTwoSent) throw new Error('Round two already sent');
        if (!this.roundOneSent || !this.roundOneReceived) throw new Error('Round one not completed');
        this.roundTwoSent = true;
        
        const g_xa = this.g_x1.add(this.g_x3).add(this.g_x4);
        const random = new BN(crypto.randomBytes(16));
        const y = random.mul(EC.n).add(new BN(this.secretBytes));
        const x2_s = this.x2.mul(y).umod(EC.n);
        const g_s = g_xa.mul(x2_s);
        
        const zkp = this.generateZKP(g_xa, g_s, x2_s, this.role);
        
        const result = Buffer.alloc(165);
        this.encodePoint(g_s).copy(result, 0);
        this.encodeZKP(zkp.v, zkp.r).copy(result, 66);
        return result;
    }

    readRoundTwo(data) {
        if (this.roundTwoReceived) throw new Error('Round two already received');
        if (!this.roundOneSent || !this.roundOneReceived) throw new Error('Round one not completed');
        this.roundTwoReceived = true;
        
        // 客户端跳过3字节前缀
        const offset = this.role === 'client' ? 3 : 0;
        
        console.log('[readRoundTwo] Computing g_xb...');
        const g_xb = this.g_x1.add(this.g_x2).add(this.g_x3);
        console.log('[readRoundTwo] Decoding g_s_peer...');
        const g_s_peer = this.decodePoint(data.slice(offset, offset + 66));
        console.log('[readRoundTwo] Decoding ZKP...');
        const zkp = this.decodeZKP(data.slice(offset + 66, offset + 165));
        
        console.log('[readRoundTwo] Verifying ZKP...');
        if (!this.verifyZKP(g_xb, g_s_peer, zkp.v, zkp.r, this.peerRole))
            throw new Error('ZKP verification failed for round two');
        console.log('[readRoundTwo] ZKP verified');
        
        // 计算共享密钥
        console.log('[readRoundTwo] Computing shared key...');
        const random = new BN(crypto.randomBytes(16));
        const y = random.mul(EC.n).add(new BN(this.secretBytes));
        const m = this.x2.mul(y).umod(EC.n);
        const v = g_s_peer.add(this.g_x4.mul(m).neg()).mul(this.x2);
        
        return crypto.createHash('sha256').update(Buffer.from(v.getX().toArray('be', 32))).digest();
    }
}

// ==================== 网关客户端 ====================
class GatewayClient {
    static DATA_TYPE = {
        PROTOCOL_LIST: 1,
        SELECTED_PROTOCOL: 2,
        SESSION_KEY_EXCHANGE: 3,
        ERROR: 4,
        DATA: 5,
        SERVER_PUB_KEY: 16,
        ECJPAKE_ROUND_ONE: 32,
        ECJPAKE_ROUND_TWO: 33
    };

    constructor() {
        this.ws = null;
        this.sessionIdCounter = 0;
        this.pendingRequests = new Map();
        this.cipherOut = null;
        this.cipherIn = null;
        this.secureEstablished = false;
    }

    static parseUrl(url) {
        const match = url.match(/^(https?):\/\/([^/:]+)(?::(\d+))?((?:\/.*)?)/);
        if (!match) throw new Error('Invalid URL');
        const [, protocol, host, port, path] = match;
        const wsProtocol = protocol === 'https' ? 'wss' : 'ws';
        const wsPort = port || (protocol === 'https' ? '443' : '80');
        const wsPath = (path || '').replace(/\/$/, '');
        return `${wsProtocol}://${host}:${wsPort}${wsPath}/centrallinkws/`;
    }

    async connect(gatewayUrl) {
        const url = GatewayClient.parseUrl(gatewayUrl);
        console.log(`[*] Connecting to ${url}`);
        
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(url);
            this.ws.on('open', () => {
                // 发送协议列表
                const protocols = ['passcode'];
                const data = Buffer.from(JSON.stringify(protocols), 'utf8');
                const message = Buffer.alloc(1 + data.length);
                message[0] = GatewayClient.DATA_TYPE.PROTOCOL_LIST;
                data.copy(message, 1);
                this.ws.send(message);
                resolve();
            });
            this.ws.on('error', reject);
        });
    }

    async authenticate(passcode) {
        const jpake = new ECJPAKE(passcode, 'client');
        
        // 等待服务器选择协议
        let response = await this.recv();
        if (response[0] === GatewayClient.DATA_TYPE.SELECTED_PROTOCOL) {
            const data = JSON.parse(response.slice(1).toString('utf8'));
            console.log(`[*] Selected protocol: ${data.protocol}`);
            if (data.protocol !== 'passcode') {
                throw new Error(`Unsupported protocol: ${data.protocol}`);
            }
        } else {
            throw new Error('Protocol selection failed');
        }
        
        // 发送 Round One
        const roundOne = jpake.writeRoundOne();
        const msgR1 = Buffer.alloc(1 + roundOne.length);
        msgR1[0] = GatewayClient.DATA_TYPE.ECJPAKE_ROUND_ONE;
        roundOne.copy(msgR1, 1);
        this.ws.send(msgR1);
        console.log(`[*] Sent Round One (${roundOne.length} bytes)`);
        
        // 接收服务器 Round One
        response = await this.recv();
        if (response[0] !== GatewayClient.DATA_TYPE.ECJPAKE_ROUND_ONE) {
            throw new Error(`Unexpected response type: ${response[0]}`);
        }
        const serverRoundOne = response.slice(1);
        console.log(`[*] Received server Round One (${serverRoundOne.length} bytes)`);
        jpake.readRoundOne(serverRoundOne);
        
        // 发送客户端 Round Two（在收到服务器Round One后立即发送）
        const roundTwo = jpake.writeRoundTwo();
        const msgR2 = Buffer.alloc(1 + roundTwo.length);
        msgR2[0] = GatewayClient.DATA_TYPE.ECJPAKE_ROUND_TWO;
        roundTwo.copy(msgR2, 1);
        this.ws.send(msgR2);
        console.log(`[*] Sent Round Two (${roundTwo.length} bytes)`);
        
        // 接收服务器 Round Two
        response = await this.recv();
        if (response[0] !== GatewayClient.DATA_TYPE.ECJPAKE_ROUND_TWO) {
            throw new Error(`Unexpected response type: ${response[0]}`);
        }
        const serverRoundTwo = response.slice(1);
        console.log(`[*] Received server Round Two (${serverRoundTwo.length} bytes)`);
        
        // 读取服务器 Round Two，计算共享密钥
        console.log('[*] Processing server Round Two...');
        const sharedKey = jpake.readRoundTwo(serverRoundTwo);
        console.log(`[*] Shared key: ${sharedKey.toString('hex')}`);
        
        // SESSION_KEY_EXCHANGE
        const sharedCipher = new AESGCMCipher(sharedKey.slice(0, 16), sharedKey.slice(16, 24));
        const myKeyNonce = crypto.randomBytes(24);
        
        // 尝试接收服务器的SESSION_KEY_EXCHANGE
        try {
            response = await this.recvTimeout(3000);
            if (response[0] === GatewayClient.DATA_TYPE.SESSION_KEY_EXCHANGE) {
                console.log('[*] Received server SESSION_KEY_EXCHANGE');
                const serverKeyNonce = sharedCipher.decrypt(response.slice(1));
                
                // 发送客户端的SESSION_KEY_EXCHANGE
                const encrypted = sharedCipher.encrypt(myKeyNonce);
                const msgKey = Buffer.alloc(1 + encrypted.length);
                msgKey[0] = GatewayClient.DATA_TYPE.SESSION_KEY_EXCHANGE;
                encrypted.copy(msgKey, 1);
                this.ws.send(msgKey);
                console.log('[*] Sent client SESSION_KEY_EXCHANGE');
                
                // 使用客户端key用于发送，服务器key用于接收
                this.cipherOut = new AESGCMCipher(myKeyNonce.slice(0, 16), myKeyNonce.slice(16, 24));
                this.cipherIn = new AESGCMCipher(serverKeyNonce.slice(0, 16), serverKeyNonce.slice(16, 24));
                this.secureEstablished = true;
                console.log('[*] Secure session established!');
            } else if (response[0] === GatewayClient.DATA_TYPE.ERROR) {
                throw new Error('Server error during key exchange');
            }
        } catch (e) {
            if (e.message.includes('timeout')) {
                console.log('[*] Server did not send first, trying client first...');
                
                // 客户端先发送
                const encrypted = sharedCipher.encrypt(myKeyNonce);
                const msgKey = Buffer.alloc(1 + encrypted.length);
                msgKey[0] = GatewayClient.DATA_TYPE.SESSION_KEY_EXCHANGE;
                encrypted.copy(msgKey, 1);
                this.ws.send(msgKey);
                console.log('[*] Sent client SESSION_KEY_EXCHANGE');
                
                // 等待服务器响应
                response = await this.recv();
                if (response[0] === GatewayClient.DATA_TYPE.SESSION_KEY_EXCHANGE) {
                    console.log('[*] Received server SESSION_KEY_EXCHANGE');
                    const serverKeyNonce = sharedCipher.decrypt(response.slice(1));
                    this.cipherOut = new AESGCMCipher(myKeyNonce.slice(0, 16), myKeyNonce.slice(16, 24));
                    this.cipherIn = new AESGCMCipher(serverKeyNonce.slice(0, 16), serverKeyNonce.slice(16, 24));
                    this.secureEstablished = true;
                    console.log('[*] Secure session established!');
                } else {
                    throw new Error('Session key exchange failed');
                }
            } else {
                throw e;
            }
        }
        
        // 启动接收循环
        this.startReceiveLoop();
    }

    recv() {
        return new Promise((resolve, reject) => {
            this.ws.once('message', resolve);
            this.ws.once('error', reject);
        });
    }

    recvTimeout(ms) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                this.ws.removeListener('message', onMessage);
                reject(new Error('timeout'));
            }, ms);
            
            const onMessage = (data) => {
                clearTimeout(timer);
                resolve(data);
            };
            
            this.ws.once('message', onMessage);
            this.ws.once('error', (err) => {
                clearTimeout(timer);
                reject(err);
            });
        });
    }

    startReceiveLoop() {
        this.ws.on('message', (data) => {
            this.handleMessage(data);
        });
    }

    handleMessage(data) {
        if (!data || data.length === 0) return;
        
        const msgType = data[0];
        if (msgType === GatewayClient.DATA_TYPE.DATA && this.secureEstablished) {
            try {
                const decrypted = this.cipherIn.decrypt(data.slice(1));
                const decompressed = decompress(decrypted);
                const response = JSON.parse(decompressed.toString('utf8'));
                
                if ('id' in response) {
                    const future = this.pendingRequests.get(response.id);
                    if (future) {
                        this.pendingRequests.delete(response.id);
                        if ('result' in response) {
                            future.resolve(response.result);
                        } else if ('error' in response) {
                            future.reject(new Error(response.error?.message || 'Unknown error'));
                        }
                    }
                }
            } catch (e) {
                console.error('[!] Error handling message:', e.message);
            }
        } else if (msgType === GatewayClient.DATA_TYPE.ERROR) {
            console.error('[!] Server error');
        }
    }

    async callApi(method, params = {}, timeout = 5000) {
        if (!this.secureEstablished) {
            throw new Error('Secure session not established');
        }
        
        const requestId = this.sessionIdCounter++;
        const request = {
            jsonrpc: '2.0',
            id: requestId,
            method: `/api/${method}`,
            params: params
        };
        
        return new Promise((resolve, reject) => {
            this.pendingRequests.set(requestId, { resolve, reject });
            
            const jsonData = Buffer.from(JSON.stringify(request), 'utf8');
            const compressed = compress(jsonData);
            const encrypted = this.cipherOut.encrypt(compressed);
            
            const message = Buffer.alloc(1 + encrypted.length);
            message[0] = GatewayClient.DATA_TYPE.DATA;
            encrypted.copy(message, 1);
            this.ws.send(message);
            
            setTimeout(() => {
                if (this.pendingRequests.has(requestId)) {
                    this.pendingRequests.delete(requestId);
                    reject(new Error(`API call timeout: ${method}`));
                }
            }, timeout);
        });
    }

    async close() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}

// ==================== 主函数 ====================
async function main() {
    const passcode = process.argv[2];
    const gatewayUrl = process.argv[3] || 'http://192.168.0.5';
    
    // 缓存文件路径
    const cacheDir = path.join(__dirname, 'cache');
    const cacheFile = path.join(cacheDir, 'gateway_data.json');
    
    // 如果没有提供登录码，尝试使用缓存
    if (!passcode || passcode === '--cached') {
        if (fs.existsSync(cacheFile)) {
            console.log('[*] 使用缓存数据...');
            const cached = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
            console.log(`[*] 缓存时间: ${cached.timestamp}`);
            console.log(`[*] 设备数量: ${Object.keys(cached.devices || {}).length}`);
            console.log('\n设备列表:');
            console.log(JSON.stringify(cached.devices, null, 2));
            if (cached.graphs) {
                console.log('\n自动化规则:');
                console.log(JSON.stringify(cached.graphs, null, 2));
            }
            return;
        } else {
            console.error('用法: node gateway_client.js <6位登录码> [网关URL]');
            console.error('      node gateway_client.js --cached  (使用缓存数据)');
            process.exit(1);
        }
    }
    
    if (passcode.length !== 6 || !/^\d{6}$/.test(passcode)) {
        console.error('用法: node gateway_client.js <6位登录码> [网关URL]');
        process.exit(1);
    }
    
    const client = new GatewayClient();
    
    try {
        await client.connect(gatewayUrl);
        await client.authenticate(passcode);
        
        console.log('\n=== 认证成功! ===\n');
        
        // 获取设备列表
        console.log('正在获取设备列表...');
        const devices = await client.callApi('getDevList', {}, 10000);
        
        // 获取自动化规则列表
        console.log('正在获取自动化规则列表...');
        let graphs = null;
        try {
            graphs = await client.callApi('getGraphList', {}, 10000);
        } catch (e) {
            console.log('获取规则列表失败:', e.message);
        }
        
        // 保存到缓存
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }
        const cacheData = {
            timestamp: new Date().toISOString(),
            devices: devices.devList,
            graphs: graphs
        };
        fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
        console.log(`\n[*] 数据已缓存到 ${cacheFile}`);
        
        // 显示结果
        console.log('\n设备列表:');
        const devList = devices.devList;
        for (const [did, dev] of Object.entries(devList)) {
            const status = dev.online ? '在线' : '离线';
            console.log(`  - ${dev.name} (${dev.modelName}) [${status}]`);
        }
        
        if (graphs) {
            console.log('\n自动化规则:');
            const ruleList = Array.isArray(graphs) ? graphs : (graphs.rules || []);
            for (const rule of ruleList) {
                console.log(`  - ${rule.name || rule.id}`);
            }
        }
        
    } catch (e) {
        console.error('错误:', e.message);
        console.error(e.stack);
    } finally {
        await client.close();
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { GatewayClient, ECJPAKE, AESGCMCipher };
