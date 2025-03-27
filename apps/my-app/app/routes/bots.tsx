import { getAuth } from '@hono/clerk-auth';
import { Bot } from '@myshell-run/simple-prisma';
import { BotListHeader, BotListRoot } from '@myshell-run/ui-biz';
import { createRoute } from '../create-route';
import { BotListIsland, BotListSearchIsland } from '../islands/bot-list';

export default createRoute(async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.redirect(`/signin?redirect_url=${c.req.url}`);
  }

  let bots: Bot[] = [];
  if (import.meta.env.VITE_SSG !== '1') {
    // const db = c.env.DB_MYSHELL_RUN_TEST;
    // const { results } = await db.prepare('SELECT * FROM User').all<User>();
    // users = results;
    const db = c.get('db');
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
