import { DbBot } from '@myshell-run/biz-def';
import { Tracing } from '@myshell-run/biz-service';
import { BotListHeader, BotListRoot } from '@myshell-run/biz-ui';
import { createRoute } from '../create-route';
import { BotListIsland, BotListSearchIsland } from '../islands/bot-list';
import { requireAuth } from '../middlewares/require-auth';

export default createRoute(requireAuth, async (c) => {
  const db = c.get('db');

  const dbBots = await Tracing.startSpan('db_bot_select', () =>
    db
      .selectFrom('bot')
      .select(['id', 'avatar', 'name', 'isOfficial', 'description'])
      .limit(30)
      .execute(),
  );

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
  const avatar = await Tracing.startSpan('kv_get_avatar', () =>
    c.env.MY_APP.get(key),
  );

  return Tracing.startSpan('ssr_render', async () =>
    c.render(
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
    ),
  );
});
