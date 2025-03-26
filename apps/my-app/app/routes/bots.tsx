import { Kysely } from 'kysely';
import { createRoute } from '../createRoute';
import { Bot, Database } from '@myshell-run/simple-prisma';
import { D1Dialect } from '../kysely-d1';
import {
  BotList,
  BotListHeader,
  BotListRoot,
  BotListSearch,
} from '@myshell-run/ui-biz';
import { BotListIsland } from '../islands/bot-list';

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
    <BotListRoot>
      <div className="flex-none">
        <BotListHeader />
        <BotListSearch />
      </div>
      <BotListIsland
        licenseKey={c?.env?.LIC}
        initialBots={bots}
        className="flex-grow overflow-auto"
      />
    </BotListRoot>,
  );
});
