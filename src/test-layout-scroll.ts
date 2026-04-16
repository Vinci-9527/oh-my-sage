import {readFileSync} from 'node:fs';
import path from 'node:path';

function read(relativePath: string): string {
    return readFileSync(path.join(process.cwd(), relativePath), 'utf8');
}

function assertIncludes(source: string, expected: string, message: string): void {
    if (!source.includes(expected)) {
        throw new Error(message);
    }
}

const pageSource = read('src/app/page.tsx');
const cssSource = read('src/app/globals.css');
const devicePanelSource = read('src/components/DevicePanel.tsx');

assertIncludes(pageSource, 'className="app-shell"', '缺少 app-shell，页面未锁定为独立视口布局');
assertIncludes(pageSource, 'className="app-body"', '缺少 app-body，主区域没有可收缩高度容器');
assertIncludes(pageSource, 'className="app-sider"', '缺少 app-sider，左侧边栏没有独立高度约束');
assertIncludes(pageSource, 'className="sidebar-tabs"', '缺少 sidebar-tabs，Tabs 容器无法建立 100% 高度链');
assertIncludes(pageSource, 'className="app-content"', '缺少 app-content，内容区没有独立 overflow 约束');
assertIncludes(pageSource, 'className="app-main-grid"', '缺少 app-main-grid，主内容行缺少统一高度约束');
assertIncludes(pageSource, 'className="glass-panel app-chat-panel"', '缺少 app-chat-panel，聊天面板无法继承可收缩高度');
assertIncludes(pageSource, 'className="glass-panel app-session-panel"', '缺少 app-session-panel，会话面板无法继承可收缩高度');

assertIncludes(cssSource, '.app-shell {', 'globals.css 缺少 app-shell 规则');
assertIncludes(cssSource, '.app-body {', 'globals.css 缺少 app-body 规则');
assertIncludes(cssSource, '.app-sider {', 'globals.css 缺少 app-sider 规则');
assertIncludes(cssSource, '.sidebar-tabs.ant-tabs {', 'globals.css 缺少 sidebar-tabs 规则');
assertIncludes(cssSource, '.sidebar-tabs .ant-tabs-content-holder {', 'globals.css 缺少 Tabs content-holder 高度约束');
assertIncludes(cssSource, '.sidebar-tabs .ant-tabs-tabpane-active {', 'globals.css 缺少激活 tab 的 flex 约束');
assertIncludes(cssSource, '.sidebar-tabs .ant-tabs-tabpane-active > * {', 'globals.css 缺少激活 tab 子节点高度承接规则');
assertIncludes(cssSource, '.app-content {', 'globals.css 缺少 app-content 规则');
assertIncludes(cssSource, '.app-main-grid {', 'globals.css 缺少 app-main-grid 规则');
assertIncludes(cssSource, '.app-chat-panel {', 'globals.css 缺少 app-chat-panel 规则');
assertIncludes(cssSource, '.app-session-panel {', 'globals.css 缺少 app-session-panel 规则');

assertIncludes(devicePanelSource, 'minHeight: 0', 'DevicePanel 缺少 minHeight: 0，滚动容器会被内容撑开');

console.log('layout scroll contract OK');
