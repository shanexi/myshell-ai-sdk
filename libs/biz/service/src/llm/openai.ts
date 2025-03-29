import { inject, injectable } from 'inversify';
import { default as OpenAISdk } from 'openai';
import { HonoCtx } from '../lib/hono-ctx';

@injectable()
export class OpenAI {
  constructor(@inject(HonoCtx) private readonly ctx: HonoCtx) {
    //
  }

  async *chat(
    model: string,
    prompt: string,
  ): AsyncGenerator<string, void, unknown> {
    const client = new OpenAISdk({
      apiKey: this.ctx.env.OPENAI_KEY,
      baseURL: this.ctx.env.OPENAI_BASE_URL,
    });
    const chunks = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });
    for await (const event of chunks) {
      const content = event.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  }
}
