import { getAuth } from '@hono/clerk-auth';
import { HonoEnv, MyAppALS } from '@myshell-run/biz-def';
import { AsyncLocalStorage } from 'async_hooks';
import { Context } from 'hono';
import { inject, injectable, multiInject } from 'inversify';
import { LLM } from '../llm/llm';
import { Tracing } from '../simple-tracer';

@injectable()
export class ChatService {
  constructor(
    @inject(MyAppALS)
    private readonly als: AsyncLocalStorage<Context<HonoEnv>>,
    @multiInject(LLM) private readonly llms: LLM[],
  ) {}

  async *chat(
    botId: number,
    prompt: string,
    msgId: string,
    replyMsgId: string,
  ): AsyncGenerator<string, void, unknown> {
    /*  const NodeSdkLive = NodeSdk.layer(() => ({
      resource: {
        serviceName: 'chat.service',
      },
      spanProcessor: new BatchSpanProcessor(
        new OTLPTraceExporter({
          url: this.als.getStore()?.env.METRICS_DSN,
        }),
      ),
    }));

    const task = (
      name: string,
      delay: number,
      children: ReadonlyArray<Effect.Effect<void>> = [],
    ) =>
      Effect.gen(function* () {
        yield* Effect.log(name);
        yield* Effect.sleep(`${delay} millis`);
        for (const child of children) {
          yield* child;
        }
        yield* Effect.sleep(`${delay} millis`);
      }).pipe(Effect.withSpan(name));

    const poll = task('/poll', 1);

    // Create a program with tasks and subtasks
    const program = task('client', 2, [
      task('/api', 3, [
        task('/authN', 4, [task('/authZ', 5)]),
        task('/payment Gateway', 6, [task('DB', 7), task('Ext. Merchant', 8)]),
        task('/dispatch', 9, [
          task('/dispatch/search', 10),
          Effect.all([poll, poll, poll], { concurrency: 'inherit' }),
          task('/pollDriver/{id}', 11),
        ]),
      ]),
    ]);

    Effect.runPromise(
      program.pipe(
        Effect.provide(NodeSdkLive),
        Effect.catchAllCause(Effect.logError),
      ),
    ); */

    const ctx = this.als.getStore();
    if (!ctx) {
      throw new Error('No ctx');
    }
    const db = ctx.get('db');
    const auth = getAuth(ctx);
    if (!auth?.userId) {
      throw new Error('Unauthorized');
    }

    Tracing.startSpan('insert_me_msg', () =>
      db
        .insertInto('message')
        .values({
          id: msgId,
          text: prompt,
          sessionId: `bot-${botId}`,
          senderId: `user-${auth.userId}`,
        })
        .executeTakeFirst(),
    );

    const dbBot = await Tracing.startSpan('db_select_bot', () =>
      db
        .selectFrom('bot')
        .select(['id', 'llmModelId'])
        .where('id', '=', botId)
        .executeTakeFirst(),
    );

    if (!dbBot?.llmModelId) {
      throw new Error('Only LLM bot can be used');
    }

    const llm = this.getLLM(dbBot.llmModelId);
    const chunks = llm.chat(dbBot.llmModelId, prompt);

    const messages: string[] = [];

    for await (const chunk of chunks) {
      messages.push(chunk.content);
      yield chunk.content;
    }

    await Tracing.startSpan('insert_reply_msg', () =>
      db
        .insertInto('message')
        .values({
          id: replyMsgId,
          text: messages.join(''),
          sessionId: `bot-${botId}`,
          senderId: `bot-${botId}`,
        })
        .executeTakeFirst(),
    );
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
