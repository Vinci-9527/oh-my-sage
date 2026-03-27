# AGENTS.md - oh-my-sage

## Project Overview

oh-my-sage (智者) is a Xiaomi Mijia smart home AI Agent built with Next.js 14 + TypeScript + Ant Design + Vercel AI SDK. It communicates with a Xiaomi gateway via WebSocket+ECJPAKE and uses LLM tool-calling to drive an agent loop for smart home automation.

## Build, Lint, and Test Commands

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build (next build)
npm run start        # Start production server
npm run lint         # ESLint (next lint, uses next/core-web-vitals)
npm run test         # Run test script (npx tsx src/test.ts) - manual test, not automated test suite
```

There is **no automated test framework** (no Jest, Vitest, etc.). `npm run test` runs a manual integration test via `tsx`. There are no unit tests. If you add tests, use `tsx` to run them.

Single test / single script: `npx tsx <path-to-script.ts>`

TypeScript checking: `npx tsc --noEmit` (strict mode is enabled in tsconfig.json).

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── auth/route.ts   # POST /api/auth - gateway login
│   │   ├── chat/route.ts   # POST /api/chat - streaming agent endpoint
│   │   ├── devices/route.ts
│   │   ├── graphs/route.ts
│   │   └── sessions/       # Session CRUD + message history
│   ├── page.tsx            # Main page
│   └── layout.tsx          # Root layout with Ant Design config
├── components/             # React UI components (Chat, DevicePanel, etc.)
├── server/
│   ├── ai/                 # AI/LLM integration
│   │   ├── model.ts        # Model config, provider selection (Vercel AI SDK)
│   │   ├── tools.ts        # Agent tool definitions (zod schemas)
│   │   └── prompts.ts      # System prompt
│   ├── agent/              # Agent core
│   │   ├── agent.ts        # Agent class with async generator run loop
│   │   └── suggestions.ts  # Suggestion generation
│   ├── gateway/            # Xiaomi gateway WebSocket client
│   │   ├── client.ts       # GatewayClient class (ECJPAKE handshake, AES-GCM)
│   │   └── shared.ts       # Shared gateway singleton
│   ├── session/
│   │   └── store.ts        # JSON file-based session/message persistence
│   ├── skills/
│   │   └── loader.ts       # Dynamic skill loader (progressive disclosure)
│   └── validator/
│       └── graph-validator.ts  # Graph node/connection validation
├── shared/
│   ├── types.ts            # Shared TypeScript interfaces
│   └── constants.ts        # Constants (data types, URNs)
```

Path alias: `@/*` maps to `./src/*` (configured in tsconfig.json).

## Skills System

The project uses a progressive disclosure skill system. Skills live in `.agents/skills/` as directories containing `SKILL.md` files.

- **Layer 1 (Catalog)**: Skill name + description injected into system prompt (~50 tokens each)
- **Layer 2 (Instructions)**: Full SKILL.md body loaded via `activate_skill` tool
- **Layer 3 (Resources)**: Files in `references/`, `scripts/`, `assets/` loaded via `read_skill_file` tool

When creating a new skill, follow the structure in existing `.agents/skills/` directories.

## Code Style Guidelines

### Imports
- Use ES module `import`/`export` for all files
- External libs first, then internal modules, separated by blank line
- Use `@/` path alias for cross-module imports (e.g., `import { Agent } from '@/server/agent/agent'`)
- Within the same directory, use relative paths

```typescript
// Good
import { streamText, CoreMessage } from 'ai';
import { z } from 'zod';
import { GatewayClient } from '../gateway/client';
import { Device } from '../../shared/types';
```

### TypeScript
- **Strict mode** is enabled - handle nulls and undefined explicitly
- Use explicit return types on exported functions
- Prefer `interface` over `type` for object shapes (project convention in `shared/types.ts`)
- Use `as const` for constant objects (see `shared/constants.ts`)
- Use union types for discriminated outputs (e.g., `AgentOutput`)
- `any` is used pragmatically for gateway API responses and dynamic tool args - this is acceptable in this codebase

### Naming Conventions
- **Files**: camelCase for utilities (`model.ts`, `tools.ts`), kebab-case for components (`Chat.tsx`)
- **Interfaces**: PascalCase (`Device`, `ModelConfig`, `AgentOutput`)
- **Constants**: UPPER_SNAKE_CASE (`NODE_TYPES`, `DEFAULT_CONFIG`, `BOOLEAN_PROPERTY_URNS`)
- **Functions/variables**: camelCase (`createModel`, `gatewayClient`, `getModelConfigFromEnv`)
- **Tool names**: snake_case strings (`'get_devices'`, `'create_graph'`, `'ask_user'`)
- **Class methods**: camelCase (`run`, `chat`, `getHistory`, `clear`)

### Components
- All page/component files use `'use client'` directive (Next.js App Router client components)
- Use inline styles directly in JSX (project convention, no CSS modules or styled-components)
- Use Ant Design components (`Input`, `Button`, `Space`, `Typography`, `Layout`, etc.)
- Use `@ant-design/icons` for icons

### Error Handling
- Wrap gateway API calls in try/catch, return `{ success: false, error: string }` objects
- Tool execute functions always return `{ success: boolean, ... }` - never throw
- API routes return proper HTTP status codes with JSON error bodies
- Use `String(error)` to convert caught errors to strings

### Async Patterns
- Use `async`/`await` consistently
- Agent uses async generators (`async *run()`) for streaming output
- Use `for await (const chunk of stream)` for iteration

### API Routes
- All API routes use Node.js runtime: `export const runtime = 'nodejs'`
- Streaming responses use `ReadableStream` with SSE format (`data: ...\n\n`)
- End with `data: [DONE]\n\n` for stream completion

### Comments
- Chinese comments are used throughout the codebase - this is fine, match existing style
- JSDoc blocks on exported classes, interfaces, and key functions
- Section dividers with `// ==================== Section Name ====================`

### Tool Definitions (server/ai/tools.ts)
- Use `zod` for parameter schemas with `.describe()` for LLM understanding
- Use `tool()` from `ai` (Vercel AI SDK) to wrap each tool
- Each tool has a description string, zod parameters schema, and async execute function
- Tools return `{ success: boolean, ...data }` or `{ success: false, error: string }`

### Environment & Config
- Copy `.env.example` to `.env` for local development
- Config is loaded from env vars via `getModelConfigFromEnv()` in `model.ts`
- Gateway URL defaults to `http://192.168.0.5`
- Supports any OpenAI-compatible API (configure via `LLM_BASE_URL`, `LLM_API_KEY`, `LLM_MODEL`)

### State Management
- No global state library (no Redux, no Zustand on the server)
- Gateway is a shared singleton via `server/gateway/shared.ts` (`getGateway()`, `isGatewayConnected()`)
- Session persistence uses JSON file-based store (`server/session/store.ts`)
- Client state uses React `useState`/`useRef` hooks with prop drilling (no context providers)
- Zustand is available as a dependency but used sparingly - check before adding new stores
