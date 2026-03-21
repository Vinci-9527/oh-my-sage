'use client';

import React from 'react';
import { ConfigProvider, App } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { StyleProvider } from '@ant-design/cssinjs';
import './globals.css';

/**
 * 根布局组件
 * 提供 Ant Design 主题配置和中文本地化
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <StyleProvider hashPriority="high">
          <ConfigProvider
            locale={zhCN}
            theme={{
              token: {
                colorPrimary: '#1890ff',
                borderRadius: 6,
              },
              components: {
                Button: {
                  controlHeight: 40,
                },
                Input: {
                  controlHeight: 40,
                },
              },
            }}
          >
            <App>{children}</App>
          </ConfigProvider>
        </StyleProvider>
      </body>
    </html>
  );
}