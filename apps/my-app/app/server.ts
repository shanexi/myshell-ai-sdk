import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';
import { Container } from 'inversify';
import { isNotSSG } from './constants';
import { TrpcRouter } from './trpc-router';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';

import ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver;

const serverContainer = new Container();
isNotSSG && serverContainer.bind(TrpcRouter).toSelf().inSingletonScope();

type HonoEnv = {
  Bindings: Env;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Variables: {};
};

const happ = new Hono<HonoEnv>();

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
}

const app = createApp<HonoEnv>({
  app: happ,
});

showRoutes(app);

export default app;
