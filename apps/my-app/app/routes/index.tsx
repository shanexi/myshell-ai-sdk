import { createFactory } from 'hono/factory';

import Counter from '../islands/counter';
import type { Meta } from './types';
import { Kysely } from 'kysely';
import { D1Dialect } from '../kysely-d1';

const factory = createFactory<{
  Bindings: Env;
}>();

export const createRoute = factory.createHandlers;

export type User = {
  id: string;
  email: string;
  name: string;
};

interface Database {
  user: User;
}

export default createRoute(async (c) => {
  let users: User[] = [];
  if (import.meta.env.VITE_SSG !== '1') {
    // const db = c.env.DB_MYSHELL_RUN_TEST;
    // const { results } = await db.prepare('SELECT * FROM User').all<User>();
    // users = results;
    const db = new Kysely<Database>({
      dialect: new D1Dialect({ database: c.env.DB_MYSHELL_RUN_TEST }),
    });
    users = await db.selectFrom('user').selectAll().execute();
  }

  const name = c.req.query('name') ?? 'Hono';
  const posts = import.meta.glob<{ frontmatter: Meta }>('./posts/*.mdx', {
    eager: true,
  });
  return c.render(
    <div class="py-8 text-center">
      <title>{name}</title>
      <h1 class="text-3xl font-bold">Hello, {name}!</h1>
      <Counter />
      <ul class="article-list">
        {Object.entries(posts).map(([id, module]) => {
          if (module.frontmatter) {
            return (
              <li>
                <a href={`${id.replace(/\.mdx$/, '')}`}>
                  {module.frontmatter.title}
                </a>
              </li>
            );
          }
        })}
      </ul>

      <ul class="user-list">
        {Object.entries(users).map(([id, module]) => {
          return <li>{module.name}</li>;
        })}
      </ul>
    </div>,
  );
});
