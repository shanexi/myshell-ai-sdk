import { inject, injectable, multiInject } from 'inversify';
import { LLM } from '../llm/llm';
import { HonoCtx } from './hono-ctx';

@injectable()
export class ChatService {
  constructor(
    @inject(HonoCtx) private readonly ctx: HonoCtx,
    @multiInject(LLM) private readonly llms: LLM[],
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

    const llm = this.getLLM(dbBot.llmModelId);
    const chunks = llm.chat(dbBot.llmModelId, prompt);

    const messages: string[] = [];

    for await (const chunk of chunks) {
      // TODO 这块逻辑很难 generic? 因为没有 type
      // 比较好的做法是一个类型，但是多个字段，相当于一个协议
      const content = chunk.choices[0]?.delta?.content;
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

  getLLM(llmModelId: string): LLM {
    let llm: LLM | undefined;
    llm = this.llms.find((llm) => llm.model === llmModelId);
    if (llm) return llm;
    else {
      llm = this.llms.find((llm) => llm.model === 'aihubmix');
      if (!llm) {
        throw new Error(`aihubmix not found`);
      }
      return llm;
    }
  }
}
