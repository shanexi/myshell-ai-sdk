import { clerkMiddleware } from '@hono/clerk-auth';
import { trpcServer } from '@hono/trpc-server';
import { HonoEnv, MyAppALS } from '@myshell-run/biz-def';
import { bizServiceModule, TrpcRouter } from '@myshell-run/biz-service';
import { AsyncLocalStorage } from 'async_hooks';
import { Context, Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';
import { Container } from 'inversify';
import { inversify } from './middlewares/inversify';
import { requireAuth } from './middlewares/require-auth';
import { setDb } from './middlewares/set-db';
import { als } from './middlewares/als';

const serverContainer = new Container();
serverContainer.load(bizServiceModule);

const asyncLocalStorage = new AsyncLocalStorage<Context<HonoEnv>>();

const happ = new Hono<HonoEnv>();
happ.use('*', clerkMiddleware());
happ.use(setDb);
happ.use(als(asyncLocalStorage, serverContainer));
happ.use(inversify(serverContainer));

const trpcRouter = serverContainer.get(TrpcRouter);
happ.use(
  '/trpc/*',
  requireAuth,
  trpcServer({
    router: trpcRouter.appRouter,
    createContext: (opts, c) => {
      return {};
    },
  }),
);

const app = createApp<HonoEnv>({
  app: happ,
});

showRoutes(app);

export default app;
