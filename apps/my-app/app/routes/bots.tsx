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
  console.time('db');
  const dbBots = await db
    .selectFrom('bot')
    .select(['id', 'avatar', 'name', 'isOfficial', 'description'])
    .limit(30)
    .execute();
  console.timeEnd('db');

  const bots: Bot[] = dbBots.map((bot) => ({
    ...bot,
    // FIXME 0 50 会导致 hyrdate 有 diff 奇怪 似乎是碰到了一些特殊字符
    description: bot.description?.slice(0, 60),
  }));

  const key = `AVATAR_${auth.userId}`;
  console.time(`get ${key}`);
  const avatar = await c.env.MY_APP.get(key);
  console.timeEnd(`get ${key}`);

  // TODO 放到 client 去请求 当然客户端也可以写 KV
  // 减少服务端针对 third-party 调用
  // if (!avatar) {
  // console.time('clerk');
  // const user = await clerk.users.getUser(auth.userId);
  // console.timeEnd('clerk');
  // avatar = user.imageUrl;
  // c.env.MY_APP.put(`AVATAR_${auth.userId}`, avatar);
  // }

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
