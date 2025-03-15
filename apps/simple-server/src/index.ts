import { Hono } from 'hono';
import { trpcServer } from '@hono/trpc-server';
import { appRouter } from './app-router';
import prismaClients from './prisma';

const app = new Hono<{ Bindings: Env }>();

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
  }),
);

app.get('/', async (c) => {
  console.log('c.env', c.env);
  const prisma = await prismaClients.fetch(c.env.DB_MYSHELL_RUN_TEST);
  const users = await prisma.user.findMany();
  console.log('users', users);
  return c.json(users);
});

export default app;
