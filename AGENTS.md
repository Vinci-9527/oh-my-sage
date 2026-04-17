# AGENTS.md - oh-my-sage

## Project Overview

Xiaomi Mijia smart home AI Agent with dual-mode architecture:
- **Web Mode**: Next.js 14 + TypeScript + Ant Design + Vercel AI SDK
- **MCP Mode**: Model Context Protocol server for AI coding assistants

Communicates with Xiaomi gateway via WebSocket+ECJPAKE. Uses LLM tool-calling for smart home automation.

## Key Commands

```bash
# Web development
npm run dev              # Start Next.js dev server
npm run build            # Production build

# MCP development  
npm run build:mcp        # Build MCP server only
npm link                 # Link oh-my-sage-mcp command globally

# Quality checks
npm run lint             # ESLint (next/core-web-vitals)
npx tsc --noEmit         # TypeScript strict mode check

# Testing (manual only, no automated framework)
npm run test             # Runs npx tsx src/test.ts
npx tsx <script.ts>      # Run single TypeScript file
```

**Note**: No Jest/Vitest. All tests are manual integration tests via `tsx`.

## Dual Architecture

### Web Mode (`src/`)
- `src/app/` - Next.js App Router, API routes, pages
- `src/components/` - React UI (Chat, DevicePanel, etc.)
- `src/server/` - Backend: AI/LLM integration, Agent core, Gateway client, Session store
- `src/shared/` - Types and constants

### MCP Mode (`src/core/` + `src/mcp/`)
- `src/core/` - Shared Core library (tools, gateway, types)
- `src/mcp/` - MCP Server implementation
- `dist/mcp/` - Build output for MCP

## MCP Development

**Building**: `npm run build:mcp` outputs to `dist/mcp/mcp/index.js`

**Global command**: `npm link` creates `oh-my-sage-mcp` in PATH

**Local testing**: `oh-my-sage-mcp` (stdio mode)

**Configuration** (for OpenCode/Claude/Cursor):
```json
{
  "mcpServers": {
    "oh-my-sage": {
      "command": "npx",
      "args": ["-y", "oh-my-sage-mcp"]
    }
  }
}
```

## Skill System

Progressive disclosure in `.agents/skills/`:
- Layer 1: Catalog (name + description, ~50 tokens)
- Layer 2: Instructions (full SKILL.md via `activate_skill` tool)  
- Layer 3: Resources (files in `references/` via `read_skill_file` tool)

**Critical skill**: `mijia-automation` - Required for creating automation rules via MCP. Located at `.agents/skills/mijia-automation/SKILL.md`.

## Code Conventions

### Imports
```typescript
// External libs first, then internal
import { streamText } from 'ai';
import { z } from 'zod';
import { GatewayClient } from '../gateway/client';
import { Device } from '@/shared/types';  // Use @/ alias for cross-module
```

### TypeScript
- Strict mode enabled - handle nulls explicitly
- Prefer `interface` over `type` for objects
- Explicit return types on exported functions
- `any` acceptable for gateway API responses (pragmatic)

### Tool Definitions (`server/ai/tools.ts` or `mcp/tools/`)
- Use `zod` schemas with `.describe()` for LLM
- Tools return `{ success: boolean, ... }` - **never throw**
- Wrap gateway calls in try/catch, return `{ success: false, error: string }`

### API Routes
- Use `export const runtime = 'nodejs'`
- SSE format: `data: ...

`, end with `data: [DONE]

`

### Naming
- Files: camelCase for utils, kebab-case for components
- Interfaces: PascalCase
- Constants: UPPER_SNAKE_CASE  
- Tool names: snake_case strings

## State Management

- **No Redux/Zustand on server**
- Gateway: shared singleton via `server/gateway/shared.ts`
- Session: JSON file-based store (`server/session/store.ts`)
- Client: React hooks with prop drilling

## Environment

Copy `.env.example` to `.env`:
```env
LLM_BASE_URL=https://api.openai.com/v1
LLM_API_KEY=your_key
LLM_MODEL=gpt-4o
GATEWAY_URL=http://192.168.0.5  # Xiaomi gateway default
```

## Comments

Chinese comments are used throughout - match existing style.
Use section dividers: `// ==================== Section Name ====================`
