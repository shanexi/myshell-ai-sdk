import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { trpcServer } from '@hono/trpc-server';
import { zValidator } from '@hono/zod-validator';
import { TrpcRouter } from '@myshell-run/biz-service';
import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';
import { Container } from 'inversify';

import { Database } from '@myshell-run/simple-prisma';
import { Kysely } from 'kysely';
// FIXME: langchain 会导致 vite hang
// import { ChatOpenAI } from '@langchain/openai';
import OpenAI from 'openai';

import { z } from 'zod';
import { D1Dialect } from './kysely-d1';

import { streamSSE } from 'hono/streaming';

const serverContainer = new Container();
serverContainer.bind(TrpcRouter).toSelf().inSingletonScope();

type HonoEnv = {
  Bindings: Env;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Variables: {};
};

const happ = new Hono<HonoEnv>();

happ.use('*', clerkMiddleware());

happ.use(async (c, next) => {
  // 只是代码去重，创建 db 实例应该已经被 cloudflare 封装了
  const db = new Kysely<Database>({
    dialect: new D1Dialect({ database: c.env.DB_MYSHELL_RUN_TEST }),
  });
  c.set('db', db);
  const auth = getAuth(c);
  c.set('auth', auth);
  await next();
});

const trpcRouter = serverContainer.get(TrpcRouter);
happ.use(
  '/trpc/*',
  trpcServer({
    router: trpcRouter.appRouter,
  }),
);

happ.get('/hi', (c) => {
  return c.json({
    message: 'hi',
  });
});

happ.post(
  '/api/chat',
  zValidator(
    'json',
    z.object({
      msgId: z.string(),
      replyMsgId: z.string(),
      prompt: z.string(),
      botId: z.number(),
    }),
  ),
  async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json(
        {
          error: 'Unauthorized',
        },
        401,
      );
    }

    const { msgId, replyMsgId, prompt, botId } = c.req.valid('json');
    const db = c.get('db');

    db.insertInto('message')
      .values({
        id: msgId,
        text: prompt,
        sessionId: `bot-${botId}`,
        senderId: `user-${auth.userId}`,
      })
      .executeTakeFirst();

    console.log('me message insert db', msgId);

    const client = new OpenAI({
      apiKey: c.env.OPENAI_KEY,
      baseURL: c.env.OPENAI_BASE_URL,
    });

    const chunks = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    const messages: string[] = [];

    const res = await streamSSE(c, async (stream) => {
      for await (const event of chunks) {
        const content = event.choices[0]?.delta?.content;
        if (content) {
          messages.push(content);
          await stream.writeSSE({
            data: content,
          });
        }
      }
      console.log('reply message done, insert db', replyMsgId);
      await db
        .insertInto('message')
        .values({
          id: replyMsgId,
          text: messages.join(''),
          sessionId: `bot-${botId}`,
          senderId: `bot-${botId}`,
        })
        .executeTakeFirst();
      console.log('reply message db inserted', replyMsgId);
      await stream.writeSSE({
        data: '',
        event: 'inserted',
      });
    });

    return res;
  },
);

const app = createApp<HonoEnv>({
  app: happ,
});

showRoutes(app);

export default app;
