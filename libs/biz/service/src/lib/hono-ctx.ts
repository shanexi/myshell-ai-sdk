import { getAuth } from '@hono/clerk-auth';
import { injectable } from 'inversify';
import { type Kysely } from 'kysely';
import { type Database, type MyAppEnv } from '@myshell-run/biz-def';

@injectable()
export class HonoCtx {
  private _env?: MyAppEnv;
  private _auth?: ReturnType<typeof getAuth>;
  private _db?: Kysely<Database>;

  get env() {
    if (!this._env) {
      throw new Error('env is not set');
    }
    return this._env;
  }

  get auth() {
    if (!this._auth) {
      throw new Error('auth is not set');
    }
    return this._auth;
  }

  get db() {
    if (!this._db) {
      throw new Error('db is not set');
    }
    return this._db;
  }

  init(env: MyAppEnv, auth: ReturnType<typeof getAuth>, db: Kysely<Database>) {
    this._env = env;
    this._auth = auth;
    this._db = db;
  }
}
