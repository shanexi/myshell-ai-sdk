import { getAuth } from '@hono/clerk-auth';
import { Bot } from '@myshell-run/simple-prisma';
import { BotListHeader, BotListRoot } from '@myshell-run/biz-ui';
import { createRoute } from '../create-route';
import { BotListIsland, BotListSearchIsland } from '../islands/bot-list';
import { createClerkClient } from '@clerk/backend';

export default createRoute(async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.redirect(`/signin?redirect_url=${c.req.url}`);
  }

  const clerk = createClerkClient({
    secretKey: c.env.CLERK_SECRET_KEY,
  });
  const db = c.get('db');
  const [dbBots, user] = await Promise.all([
    db
      .selectFrom('bot')
      .select(['id', 'avatar', 'name', 'isOfficial', 'description'])
      .limit(30)
      .execute(),
    clerk.users.getUser(auth.userId),
  ]);
  const bots: Bot[] = dbBots.map((bot) => ({
    ...bot,
    // FIXME 0 50 会导致 hyrdate 有 diff 奇怪 似乎是碰到了一些特殊字符
    description: bot.description?.slice(0, 60),
  }));
  const avatar = user.imageUrl;

  return c.render(
    <BotListRoot>
      <div className="flex-none">
        <BotListHeader avatar={avatar} />
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
