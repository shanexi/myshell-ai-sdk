import { MyAppEnv } from './my-app-worker-configuration';
import { type Database } from './lib/database';
import type {} from 'hono';
import { type Kysely } from 'kysely';
import { interfaces } from 'inversify';

export type HonoEnv = {
  Bindings: MyAppEnv;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Variables: {};
};

declare module 'hono' {
  // @ts-expect-error index.d.ts(20, 15): 'Env' was also declared here.
  interface Env {
    // eslint-disable-next-line
    Variables: {};
    // eslint-disable-next-line
    Bindings: {};
  }
  interface ContextVariableMap {
    db: Kysely<Database>;
    resolve<T>(identifier: interfaces.ServiceIdentifier<T>): T;
    traceID: string;
    spanID: string;
    span: unknown;
  }
}
