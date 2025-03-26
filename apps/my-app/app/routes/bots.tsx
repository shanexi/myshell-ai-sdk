import { Kysely } from 'kysely';
import { createRoute } from '../createRoute';
import { Bot, Database } from '../db';
import { D1Dialect } from '../kysely-d1';

export default createRoute(async (c) => {
  let bots: Bot[] = [];
  if (import.meta.env.VITE_SSG !== '1') {
    // const db = c.env.DB_MYSHELL_RUN_TEST;
    // const { results } = await db.prepare('SELECT * FROM User').all<User>();
    // users = results;
    const db = new Kysely<Database>({
      dialect: new D1Dialect({ database: c.env.DB_MYSHELL_RUN_TEST }),
    });
    bots = await db.selectFrom('bot').selectAll().execute();
  }
  return c.render(
    <div>
      <ul>
        {bots.map((bot) => {
          return <li key={bot.id}>{bot.name}</li>;
        })}
      </ul>
    </div>,
  );
});
