import { inject, injectable } from 'inversify';
import { HonoCtx } from './hono-ctx';
import OpenAI from 'openai';

@injectable()
export class ChatService {
  constructor(@inject(HonoCtx) private readonly ctx: HonoCtx) {}

  async *chat(
    botId: number,
    prompt: string,
    msgId: string,
    replyMsgId: string,
  ): AsyncGenerator<string, void, unknown> {
    const db = this.ctx.db;
    const auth = this.ctx.auth;

    console.time('insert me message');
    db.insertInto('message')
      .values({
        id: msgId,
        text: prompt,
        sessionId: `bot-${botId}`,
        senderId: `user-${auth.userId}`,
      })
      .executeTakeFirst();
    console.timeEnd('insert me message');

    console.time('dbBot');
    const dbBot = await db
      .selectFrom('bot')
      .select(['id', 'llmModelId'])
      .where('id', '=', botId)
      .executeTakeFirst();
    console.timeEnd('dbBot');

    if (!dbBot?.llmModelId) {
      throw new Error('Only LLM bot can be used');
    }

    const client = new OpenAI({
      apiKey: this.ctx.env.OPENAI_KEY,
      baseURL: this.ctx.env.OPENAI_BASE_URL,
    });

    const chunks = await client.chat.completions.create({
      model: dbBot.llmModelId,
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    const messages: string[] = [];

    for await (const event of chunks) {
      const content = event.choices[0]?.delta?.content;
      if (content) {
        messages.push(content);
        yield content;
      }
    }

    console.time('insert reply message');
    await db
      .insertInto('message')
      .values({
        id: replyMsgId,
        text: messages.join(''),
        sessionId: `bot-${botId}`,
        senderId: `bot-${botId}`,
      })
      .executeTakeFirst();
    console.timeEnd('insert reply message');
  }
}
