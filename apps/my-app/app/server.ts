import { clerkMiddleware } from '@hono/clerk-auth';
import { trpcServer } from '@hono/trpc-server';
import { zValidator } from '@hono/zod-validator';
import { TrpcRouter } from '@myshell-run/simple-services';
import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';
import { Container } from 'inversify';
import { isNotSSG } from './constants';

import { Database } from '@myshell-run/simple-prisma';
import { Kysely } from 'kysely';
// import ResizeObserver from 'resize-observer-polyfill';
// global.ResizeObserver = ResizeObserver;
import { ChatOpenAI } from '@langchain/openai';

import { z } from 'zod';
import { D1Dialect } from './kysely-d1';

import { streamSSE } from 'hono/streaming';

const serverContainer = new Container();
isNotSSG && serverContainer.bind(TrpcRouter).toSelf().inSingletonScope();

type HonoEnv = {
  Bindings: Env;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Variables: {};
};

const happ = new Hono<HonoEnv>();
happ.use(async (c, next) => {
  if (import.meta.env.VITE_SSG !== '1') {
    // 只是代码去重，创建 db 实例应该已经被 cloudflare 封装了
    const db = new Kysely<Database>({
      dialect: new D1Dialect({ database: c.env.DB_MYSHELL_RUN_TEST }),
    });
    c.set('db', db);
  }

  await next();
});

happ.use('*', clerkMiddleware());

if (isNotSSG) {
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
        prompt: z.string(),
      }),
    ),
    async (c) => {
      const { prompt } = c.req.valid('json');
      const model = new ChatOpenAI({
        model: 'gpt-4o-mini',
        apiKey: c.env.OPENAI_KEY,
        configuration: {
          baseURL: c.env.OPENAI_BASE_URL,
        },
      });

      const chunks = await model.stream(prompt);

      return streamSSE(c, async (stream) => {
        for await (const chunk of chunks) {
          await stream.writeSSE({
            data: chunk.text,
            id: chunk.id,
          });
        }
      });
    },
  );
}

const app = createApp<HonoEnv>({
  app: happ,
});

showRoutes(app);

export default app;
