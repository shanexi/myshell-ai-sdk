import { clerkMiddleware } from '@hono/clerk-auth';
import { trpcServer } from '@hono/trpc-server';
import { MyAppEnv } from '@myshell-run/biz-def';
import {
  bizServiceModule,
  honoMiddleware,
  otlpExporter,
  Tracing,
  TrpcRouter,
} from '@myshell-run/biz-service';
import { AsyncLocalStorage } from 'async_hooks';
import { Context, Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';
import { Container } from 'inversify';
import { als } from './middlewares/als';
import { inversify } from './middlewares/inversify';
import { requireAuth } from './middlewares/require-auth';
import { setDb } from './middlewares/set-db';
import { traceparent } from './middlewares/traceparent';

// import { sentry } from '@hono/sentry';

Tracing.tname = 'test-app';
Tracing.globalAttributes = new Map([['service.name', 'test-app']]);

Tracing.exporter = otlpExporter(
  'https://metrics_01jr0emez9ener2ctwyf09w1gx.myshell.run/v1/traces',
  {},
  Tracing.globalAttributes,
);

const serverContainer = new Container();
serverContainer.load(bizServiceModule);

const asyncLocalStorage = new AsyncLocalStorage<Context<HonoEnv>>();

// 这个必须要保留 否则 `c.get('db')` 没有类型，而且必须 `export`
// 这个应该 hotfix 下，另外，interface merge 还是有效的，即定义在 biz-def/my-app-hono 中的 `interface ContextVariableMap {` 还是能 merge 的
export type HonoEnv = {
  Bindings: MyAppEnv;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Variables: {};
};

const happ = new Hono<HonoEnv>();
happ.use(traceparent());
happ.use(als(asyncLocalStorage, serverContainer));
happ.use(inversify(serverContainer));
// happ.use('*', sentry());
happ.use(honoMiddleware);
happ.use('*', clerkMiddleware());
happ.use(setDb);

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
