import { Hono } from 'hono';
import { trpcServer } from '@hono/trpc-server';
import { Container } from 'inversify';
import { loadModule } from './loadModule';
import { renderer } from './renderer';
import { TrpcRouter } from './trpc-router';
import { hello } from './middlewares/hello';

const container = new Container();
loadModule(container);
const trpcRouter = container.get(TrpcRouter);

const app = new Hono<{ Bindings: Env }>();
app.use(renderer);
app.use(hello('Hello'));

app.use(
  '/trpc/*',
  trpcServer({
    router: trpcRouter.appRouter,
  }),
);

app.get('/', (c) => {
  return c.render(<h1 className="text-green-500">Hello world!</h1>);
});

export default app;
