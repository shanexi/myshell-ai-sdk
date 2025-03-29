import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { trpcServer } from '@hono/trpc-server';
import { HonoCtx, TrpcRouter } from '@myshell-run/biz-service';
import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';
import { Container } from 'inversify';
import { requireAuth } from './middlewares/require-auth';
import { setDb } from './middlewares/set-db';
import { bizServiceModule } from '@myshell-run/biz-service';

const serverContainer = new Container();
serverContainer.load(bizServiceModule);

export type HonoEnv = {
  Bindings: Env;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Variables: {};
};

const happ = new Hono<HonoEnv>();
happ.use('*', clerkMiddleware());
happ.use(setDb);
happ.use(async (c, next) => {
  const honoCtx = serverContainer.get(HonoCtx);
  honoCtx.init(c.env, c.get('clerkAuth'), c.get('db'));
  c.set('container', serverContainer);
  await next();
});

const trpcRouter = serverContainer.get(TrpcRouter);
happ.use(
  '/trpc/*',
  requireAuth,
  trpcServer({
    router: trpcRouter.appRouter,
    createContext: (opts, c) => {
      // 因为 c.get('clerkAuth') 并没有透传到 trpc 这里重复处理下
      const auth = getAuth(c);
      return {
        auth,
      };
    },
  }),
);

const app = createApp<HonoEnv>({
  app: happ,
});

showRoutes(app);

export default app;
