import { createClerkClient } from '@clerk/backend';
import { MyAppALS, type HonoEnv, type MyAppEnv } from '@myshell-run/biz-def';
import { initTRPC } from '@trpc/server';
import { AsyncLocalStorage } from 'async_hooks';
import { Context } from 'hono';
import { inject, injectable } from 'inversify';
import { z } from 'zod';
import { Tracing } from '../simple-tracer';
const t = initTRPC
  .context<{
    env: MyAppEnv;
  }>()
  .create();

const publicProcedure = t.procedure;
const router = t.router;

@injectable()
export class TrpcRouter {
  constructor(
    @inject(MyAppALS) private als: AsyncLocalStorage<Context<HonoEnv>>,
  ) {
    //
  }

  appRouter = router({
    getUser: publicProcedure
      .input(z.object({}))
      .query(async ({ input, ctx }) => {
        const clerk = createClerkClient({
          secretKey: ctx.env.CLERK_SECRET_KEY,
        });
        const auth = this.als.getStore()?.get('clerkAuth');
        if (!auth?.userId) {
          throw new Error('Unauthorized');
        }
        const user = await Tracing.startSpan('clerk_get_user', () =>
          clerk.users.getUser(auth.userId),
        );
        return user.imageUrl;
      }),
  });
}

export type AppRouter = TrpcRouter[`appRouter`];
