import { createClerkClient } from '@clerk/backend';
import { initTRPC } from '@trpc/server';
import { inject, injectable } from 'inversify';
import { z } from 'zod';
import { HonoCtx } from './hono-ctx';
import { getAuth } from '@hono/clerk-auth';

const t = initTRPC
  .context<{
    env: Env;
    auth: ReturnType<typeof getAuth>;
  }>()
  .create();

const publicProcedure = t.procedure;
const router = t.router;

@injectable()
export class TrpcRouter {
  constructor(@inject(HonoCtx) private honoCtx: HonoCtx) {
    //
  }

  appRouter = router({
    getUser: publicProcedure
      .input(z.object({}))
      .query(async ({ input, ctx }) => {
        const clerk = createClerkClient({
          secretKey: ctx.env.CLERK_SECRET_KEY,
        });
        if (!ctx.auth?.userId) {
          throw new Error('Unauthorized');
        }
        const user = await clerk.users.getUser(ctx.auth?.userId);
        return user.imageUrl;
      }),
  });
}

export type AppRouter = TrpcRouter[`appRouter`];
