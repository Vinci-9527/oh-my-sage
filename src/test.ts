import assert from 'node:assert/strict';

import {streamText} from 'ai';
import {createOpenAI} from '@ai-sdk/openai';

import {createTools} from './server/ai/tools';

async function captureToolSchemas() {
    let requestBody: any = null;

    const fakeFetch = async (_url: RequestInfo | URL, init?: RequestInit) => {
        requestBody = JSON.parse(String(init?.body ?? '{}'));

        return new Response(JSON.stringify({
            id: 'test-response',
            object: 'chat.completion',
            created: Date.now(),
            model: 'gpt-5.4',
            choices: [{
                index: 0,
                message: {role: 'assistant', content: 'ok'},
                finish_reason: 'stop',
            }],
            usage: {prompt_tokens: 1, completion_tokens: 1, total_tokens: 2},
        }), {
            status: 200,
            headers: {'content-type': 'application/json'},
        });
    };

    const model = createOpenAI({
        apiKey: 'test-key',
        baseURL: 'http://test.local/v1',
        fetch: fakeFetch,
    })('gpt-5.4');

    const gateway = {callApi: async () => ({})} as any;

    const result = await streamText({
        model,
        system: 'schema test',
        messages: [{role: 'user', content: 'hi'}],
        tools: createTools(gateway),
        maxSteps: 1,
    });

    await result.text;

    return requestBody.tools;
}

async function main() {
    const tools = await captureToolSchemas();

    const scanArrays = (schema: any, path: string): void => {
        if (Array.isArray(schema)) {
            schema.forEach((item, index) => scanArrays(item, `${path}[${index}]`));
            return;
        }

        if (!schema || typeof schema !== 'object') {
            return;
        }

        if (schema.type === 'array') {
            assert.ok(schema.items, `${path} array schema must include items`);
        }

        for (const [key, value] of Object.entries(schema)) {
            scanArrays(value, `${path}.${key}`);
        }
    };

    for (const tool of tools) {
        const toolName = tool.function?.name;
        const schema = tool.function?.parameters;
        assert.ok(toolName, 'tool name should be present');
        assert.ok(schema, `${toolName} should include parameters schema`);
        scanArrays(schema, toolName);
    }

    console.log('Tool schema test passed');
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
