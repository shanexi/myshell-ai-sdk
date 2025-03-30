import { type Database } from './lib/database';
import type {} from 'hono';
import { type Kysely } from 'kysely';
import { interfaces } from 'inversify';
declare module 'hono' {
  interface Env {
    // eslint-disable-next-line
    Variables: {};
    // eslint-disable-next-line
    Bindings: {};
  }
  interface ContextVariableMap {
    db: Kysely<Database>;
    resolve<T>(identifier: interfaces.ServiceIdentifier<T>): T;
  }
}
