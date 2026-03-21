#!/bin/bash

# Oh My Sage 安装脚本
# 米家自动化极客版 AI Agent

set -e

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 打印带颜色的消息
info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查 Node.js
check_node() {
    if ! command -v node &> /dev/null; then
        error "Node.js 未安装，请先安装 Node.js 18+"
        echo "下载地址: https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        error "Node.js 版本过低，需要 18+，当前版本: $(node -v)"
        exit 1
    fi
    
    success "Node.js $(node -v) 已安装"
}

# 检查 Git
check_git() {
    if ! command -v git &> /dev/null; then
        error "Git 未安装，请先安装 Git"
        exit 1
    fi
    success "Git 已安装"
}

# 克隆项目
clone_project() {
    local target_dir="${1:-oh-my-sage}"
    
    if [ -d "$target_dir" ]; then
        warn "目录 $target_dir 已存在"
        read -p "是否删除并重新克隆? (y/N): " confirm
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            rm -rf "$target_dir"
        else
            info "使用现有目录"
            cd "$target_dir"
            return 0
        fi
    fi
    
    info "正在克隆项目..."
    git clone https://github.com/Vinci-9527/oh-my-sage.git "$target_dir"
    cd "$target_dir"
    success "项目克隆完成"
}

# 安装依赖
install_deps() {
    info "正在安装依赖..."
    npm install
    success "依赖安装完成"
}

# 配置环境变量
configure_env() {
    if [ -f ".env" ]; then
        warn ".env 文件已存在"
        read -p "是否重新配置? (y/N): " confirm
        if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
            info "跳过环境变量配置"
            return 0
        fi
    fi
    
    cp .env.example .env
    success "已创建 .env 文件"
    
    echo ""
    info "请选择 LLM 模型："
    echo "1) qwen-max (通义千问，推荐)"
    echo "2) kimi-128k (Kimi，长上下文)"
    echo "3) deepseek-chat (DeepSeek，性价比高)"
    echo "4) glm-4 (智谱 GLM)"
    echo "5) gpt-4o (OpenAI)"
    echo "6) claude-3.5-sonnet (Claude)"
    echo "7) local-ollama (本地部署)"
    echo ""
    read -p "请输入选项 (1-7，默认1): " model_choice
    
    case $model_choice in
        2) MODEL="kimi-128k"; KEY_NAME="KIMI_API_KEY" ;;
        3) MODEL="deepseek-chat"; KEY_NAME="DEEPSEEK_API_KEY" ;;
        4) MODEL="glm-4"; KEY_NAME="GLM_API_KEY" ;;
        5) MODEL="gpt-4o"; KEY_NAME="OPENAI_API_KEY" ;;
        6) MODEL="claude-3.5-sonnet"; KEY_NAME="ANTHROPIC_API_KEY" ;;
        7) MODEL="local-ollama"; KEY_NAME="" ;;
        *) MODEL="qwen-max"; KEY_NAME="QWEN_API_KEY" ;;
    esac
    
    # 更新模型配置
    sed -i.bak "s/DEFAULT_MODEL=.*/DEFAULT_MODEL=$MODEL/" .env
    rm -f .env.bak
    
    if [ -n "$KEY_NAME" ]; then
        echo ""
        read -p "请输入 API Key: " api_key
        if [ -n "$api_key" ]; then
            # 替换对应的 API Key
            sed -i.bak "s/${KEY_NAME}=.*/${KEY_NAME}=$api_key/" .env
            rm -f .env.bak
        fi
    fi
    
    echo ""
    read -p "请输入米家网关地址 (默认 http://192.168.0.5): " gateway_url
    if [ -n "$gateway_url" ]; then
        sed -i.bak "s|GATEWAY_URL=.*|GATEWAY_URL=$gateway_url|" .env
        rm -f .env.bak
    fi
    
    success "环境变量配置完成"
}

# 启动服务
start_service() {
    echo ""
    read -p "是否立即启动服务? (Y/n): " confirm
    if [ "$confirm" = "n" ] || [ "$confirm" = "N" ]; then
        info "稍后可运行 'npm run dev' 启动服务"
        return 0
    fi
    
    info "正在启动服务..."
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  Oh My Sage 安装完成！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "访问地址: http://localhost:3000"
    echo "停止服务: Ctrl+C"
    echo ""
    
    npm run dev
}

# 主流程
main() {
    echo ""
    echo -e "${BLUE}╔═══════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║     Oh My Sage 安装向导                   ║${NC}"
    echo -e "${BLUE}║     米家自动化极客版 AI Agent             ║${NC}"
    echo -e "${BLUE}╚═══════════════════════════════════════════╝${NC}"
    echo ""
    
    check_node
    check_git
    
    echo ""
    clone_project
    install_deps
    configure_env
    start_service
}

# 运行
main
