import { Bot, Database } from '@myshell-run/simple-prisma';
import { BotListHeader, BotListRoot } from '@myshell-run/ui-biz';
import { Kysely } from 'kysely';
import { createRoute } from '../create-route';
import { BotListIsland, BotListSearchIsland } from '../islands/bot-list';
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
    bots = await db
      .selectFrom('bot')
      .select(['id', 'avatar', 'name', 'isOfficial', 'description'])
      .limit(30)
      .execute();
    bots = bots.map((bot) => ({
      ...bot,
      // FIXME 0 50 会导致 hyrdate 有 diff 奇怪 似乎是碰到了一些特殊字符
      description: bot.description?.slice(0, 60),
    }));
  }
  return c.render(
    <BotListRoot>
      <div className="flex-none">
        <BotListHeader />
        <BotListSearchIsland />
      </div>
      <BotListIsland
        licenseKey={c?.env?.LIC}
        initialBots={bots}
        className="flex-grow overflow-auto"
      />
    </BotListRoot>,
  );
});
