import { inject, injectable } from 'inversify';
import { default as OpenAISdk } from 'openai';
import { LLM, LLMMessage } from './llm';
import { MyAppALS, type HonoEnv } from '@myshell-run/biz-def';
import { Context } from 'hono';
import { AsyncLocalStorage } from 'async_hooks';

@injectable()
export class OpenAI implements LLM {
  model = 'aihubmix';
  constructor(
    @inject(MyAppALS) private readonly als: AsyncLocalStorage<Context<HonoEnv>>,
  ) {
    //
  }

  async *chat(
    model: string,
    prompt: string,
  ): AsyncGenerator<LLMMessage, void, unknown> {
    const ctx = this.als.getStore();
    if (!ctx) {
      throw new Error('No ctx');
    }

    const client = new OpenAISdk({
      apiKey: ctx.env.OPENAI_KEY,
      baseURL: ctx.env.OPENAI_BASE_URL,
    });
    const chunks = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });
    for await (const chunk of chunks) {
      if (chunk.choices[0]?.delta?.content) {
        yield {
          content: chunk.choices[0]?.delta?.content,
        };
      }
    }
  }
}
