import { Database } from '@myshell-run/simple-prisma';
import { Kysely } from 'kysely';
import { factory } from '../create-route';
import { D1Dialect } from '../kysely-d1';

export const setDb = factory.createMiddleware(async (c, next) => {
  // 只是代码去重，创建 db 实例应该已经被 cloudflare 封装了
  const db = new Kysely<Database>({
    dialect: new D1Dialect({ database: c.env.DB_MYSHELL_RUN_TEST }),
  });
  c.set('db', db);
  await next();
});
