/* eslint-disable */
import { type Database } from '@myshell-run/simple-prisma';
import type {} from 'hono';
import { type Kysely } from 'kysely';
declare module 'hono' {
  interface Env {
    Variables: {};
    Bindings: {};
  }
  interface ContextVariableMap {
    db: Kysely<Database>;
  }
}
