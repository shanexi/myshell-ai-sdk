import { Hono } from 'hono';
import { trpcServer } from '@hono/trpc-server';
import { appRouter } from './app-router';

const app = new Hono();

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
  }),
);

app.get('/', (c) => c.text('Hono!'));

export default app;
