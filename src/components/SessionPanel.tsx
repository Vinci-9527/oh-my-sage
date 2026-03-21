'use client';

import React from 'react';
import { 
  Typography, 
  Button, 
  Empty, 
  Spin, 
  Space,
  Popconfirm,
} from 'antd';
import { 
  SyncOutlined, 
  MessageOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

interface SessionMeta {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  isActive: boolean;
}

interface SessionPanelProps {
  sessions: SessionMeta[];
  activeSessionId?: string;
  loading?: boolean;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onRefresh: () => void;
}

/**
 * 格式化时间
 */
function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  // 今天内
  if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  }

  // 昨天
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.getDate() === yesterday.getDate() && 
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()) {
    return '昨天';
  }

  // 更早
  return date.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' });
}

export default function SessionPanel({
  sessions,
  activeSessionId,
  loading = false,
  onSelectSession,
  onDeleteSession,
  onRefresh,
}: SessionPanelProps) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 头部 */}
      <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong>对话历史</Text>
          <Button 
            icon={<SyncOutlined />} 
            size="small" 
            onClick={onRefresh}
            loading={loading}
          >
            刷新
          </Button>
        </div>
      </div>

      {/* Session 列表 */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Spin />
          </div>
        ) : sessions.length === 0 ? (
          <Empty 
            description="暂无对话历史" 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ marginTop: 40 }}
          />
        ) : (
          sessions.map(session => (
            <div
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #f5f5f5',
                cursor: 'pointer',
                background: session.id === activeSessionId ? '#e6f7ff' : 'transparent',
                borderLeft: session.id === activeSessionId ? '3px solid #1890ff' : '3px solid transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (session.id !== activeSessionId) {
                  e.currentTarget.style.background = '#fafafa';
                }
              }}
              onMouseLeave={(e) => {
                if (session.id !== activeSessionId) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: 4,
                    gap: 8,
                  }}>
                    <MessageOutlined style={{ 
                      color: session.id === activeSessionId ? '#1890ff' : '#8c8c8c',
                      fontSize: 14,
                    }} />
                    <Text 
                      strong 
                      style={{ 
                        fontSize: 14,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {session.title || '新对话'}
                    </Text>
                  </div>
                  
                  {session.summary && (
                    <Text 
                      type="secondary" 
                      style={{ 
                        fontSize: 12,
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginBottom: 4,
                        paddingLeft: 22,
                      }}
                    >
                      {session.summary}
                    </Text>
                  )}
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 12,
                    paddingLeft: 22,
                  }}>
                    <Space size={4}>
                      <ClockCircleOutlined style={{ fontSize: 11, color: '#8c8c8c' }} />
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        {formatTime(session.updatedAt)}
                      </Text>
                    </Space>
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {session.messageCount} 条消息
                    </Text>
                  </div>
                </div>
                
                <Popconfirm
                  title="确定删除此对话？"
                  onConfirm={(e) => {
                    e?.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  onCancel={(e) => e?.stopPropagation()}
                  okText="删除"
                  cancelText="取消"
                >
                  <Button
                    type="text"
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: '#8c8c8c' }}
                  />
                </Popconfirm>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
