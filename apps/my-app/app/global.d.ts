import { type Database } from '@myshell-run/def';
import type {} from 'hono';
import { type Kysely } from 'kysely';
import { type Container } from 'inversify';
declare module 'hono' {
  interface Env {
    // eslint-disable-next-line
    Variables: {};
    // eslint-disable-next-line
    Bindings: {};
  }
  interface ContextVariableMap {
    db: Kysely<Database>;
    container: Container;
  }
}
