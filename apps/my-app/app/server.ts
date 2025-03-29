import { clerkMiddleware } from '@hono/clerk-auth';
import { trpcServer } from '@hono/trpc-server';
import { TrpcRouter } from '@myshell-run/biz-service';
import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';
import { Container } from 'inversify';
import { requireAuth } from './middlewares/require-auth';
import { setDb } from './middlewares/set-db';

const serverContainer = new Container();
serverContainer.bind(TrpcRouter).toSelf().inSingletonScope();

export type HonoEnv = {
  Bindings: Env;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Variables: {};
};

const happ = new Hono<HonoEnv>();
happ.use('*', clerkMiddleware());
happ.use(setDb);

const trpcRouter = serverContainer.get(TrpcRouter);
happ.use(
  '/trpc/*',
  requireAuth,
  trpcServer({
    router: trpcRouter.appRouter,
    createContext: (opts, c) => {
      // 因为 c.get('auth') 并没有透传到 trpc 这里重复处理下
      const auth = c.get('auth');
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
