import { inject, injectable } from 'inversify';
import { HonoCtx } from './hono-ctx';
import { OpenAI } from '../llm/openai';

@injectable()
export class ChatService {
  constructor(
    @inject(HonoCtx) private readonly ctx: HonoCtx,
    @inject(OpenAI) private readonly openai: OpenAI,
  ) {}

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

    const chunks = this.openai.chat(dbBot.llmModelId, prompt);

    const messages: string[] = [];

    for await (const content of chunks) {
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
