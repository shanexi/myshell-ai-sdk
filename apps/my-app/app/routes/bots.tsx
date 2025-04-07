import { BotListHeader, BotListRoot } from '@myshell-run/biz-ui';
import { DbBot } from '@myshell-run/biz-def';
import { createRoute } from '../create-route';
import { BotListIsland, BotListSearchIsland } from '../islands/bot-list';
import { requireAuth } from '../middlewares/require-auth';
import { Tracing } from '@myshell-run/biz-service';

export default createRoute(requireAuth, async (c) => {
  const db = c.get('db');

  // TODO: 后续优化下 type infer 先验证 otel
  let dbBots: {
    id: number;
    name: string;
    description: string | undefined;
    avatar: string | undefined;
    isOfficial: boolean;
  }[] = [];

  await Tracing.startSpan('db_bot_select', async () => {
    dbBots = await db
      .selectFrom('bot')
      .select(['id', 'avatar', 'name', 'isOfficial', 'description'])
      .limit(30)
      .execute();
  });

  const bots: DbBot[] = dbBots.map((bot: DbBot) => ({
    ...bot,
    // FIXME 0 50 会导致 hyrdate 有 diff 奇怪 似乎是碰到了一些特殊字符
    description: bot.description?.slice(0, 60),
  }));

  const auth = c.get('clerkAuth');
  if (!auth?.userId) {
    throw new Error('Unauthorized');
  }
  const key = `AVATAR_${auth.userId}`;
  let avatar: string | null = null;
  await Tracing.startSpan('kv_get_avatar', async () => {
    avatar = await c.env.MY_APP.get(key);
  });

  let res;

  await Tracing.startSpan('ssr_render', async () => {
    res = c.render(
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

  return res;
});
