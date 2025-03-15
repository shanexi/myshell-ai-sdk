import { Hono } from 'hono';
import { trpcServer } from '@hono/trpc-server';
import { appRouter } from './app-router';
import prismaClients from './prisma';
import { Container } from 'inversify';
import { loadModule, PrismaClientProvider } from './loadModule';

const container = new Container();
loadModule(container);

const prismaClientProvider = container.get<PrismaClientProvider>(
  'PrismaClientProvider',
);

const app = new Hono<{ Bindings: Env }>();

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
  }),
);

app.get('/', async (c) => {
  const prisma = await prismaClientProvider(c.env.DB_MYSHELL_RUN_TEST);
  const users = await prisma.user.findMany();
  return c.json(users);
});

export default app;
