/** @type {import('next').NextConfig} */
const nextConfig = {
  // 服务器端外部包
  serverExternalPackages: ['ws', 'elliptic', 'bn.js'],
  
  // 实验性功能
  experimental: {
    // 启用服务器操作
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Webpack 配置
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 客户端不包含这些模块
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        ws: false,
      };
    }
    return config;
  },
  
  // 环境变量
  env: {
    GATEWAY_URL: process.env.GATEWAY_URL || 'http://192.168.0.5',
  },
};

module.exports = nextConfig;
