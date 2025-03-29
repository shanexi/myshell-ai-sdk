/* eslint-disable */
import type {} from 'hono';
import { type Database } from '@myshell-run/simple-prisma';
import { type Kysely } from 'kysely';
import { type ClerkAuth } from '@hono/clerk-auth';
declare module 'hono' {
  interface Env {
    Variables: {};
    Bindings: {};
  }
  interface ContextVariableMap {
    db: Kysely<Database>;
    auth: ClerkAuth;
  }
}
