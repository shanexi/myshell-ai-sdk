import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';
import { loadModule } from './loadModule';
import { Container } from 'inversify';
import { TrpcRouter } from './trpc-router';
import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { isNotSSG } from './constants';

const container = new Container();
loadModule(container);

type HonoEnv = {
  Bindings: Env;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Variables: {};
};

const happ = new Hono<HonoEnv>();

if (isNotSSG) {
  const trpcRouter = container.get(TrpcRouter);
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
