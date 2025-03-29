import { inject, injectable } from 'inversify';
import { default as OpenAISdk } from 'openai';
import { HonoCtx } from '../lib/hono-ctx';
import { LLM } from './llm';
import { type ChatCompletionChunk } from 'openai/resources/chat/completions';

@injectable()
export class OpenAI implements LLM {
  model = 'aihubmix';
  constructor(@inject(HonoCtx) private readonly ctx: HonoCtx) {
    //
  }

  async *chat(
    model: string,
    prompt: string,
  ): AsyncGenerator<ChatCompletionChunk, void, unknown> {
    const client = new OpenAISdk({
      apiKey: this.ctx.env.OPENAI_KEY,
      baseURL: this.ctx.env.OPENAI_BASE_URL,
    });
    const chunks = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });
    for await (const chunk of chunks) {
      yield chunk;
    }
  }
}
