import { getAuth } from '@hono/clerk-auth';
import { injectable } from 'inversify';

@injectable()
export class HonoCtx {
  env?: Env;
  auth?: ReturnType<typeof getAuth>;

  setEnv(env: Env) {
    this.env = env;
  }
  setAuth(auth: ReturnType<typeof getAuth>) {
    this.auth = auth;
  }
}
