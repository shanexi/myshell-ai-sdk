import { initTRPC } from '@trpc/server';
import { injectable } from 'inversify';
import { z } from 'zod';
import { createClerkClient } from '@clerk/backend';

const t = initTRPC
  .context<{
    env: {
      CLERK_PUBLISHABLE_KEY: string;
    };
  }>()
  .create();

const publicProcedure = t.procedure;
const router = t.router;

@injectable()
export class TrpcRouter {
  constructor() {
    //
  }

  appRouter = router({
    hello: publicProcedure
      .input(
        z.object({
          message: z.string().nullish(),
        }),
      )
      .query(async ({ input, ctx }) => {
        return input.message;
      }),

    getUser: publicProcedure
      .input(
        z.object({
          userId: z.string(),
        }),
      )
      .query(async ({ input, ctx }) => {
        const clerk = createClerkClient({
          secretKey: ctx.env.CLERK_PUBLISHABLE_KEY,
        });
        const user = await clerk.users.getUser(input.userId);
        return user;
      }),
  });
}

export type AppRouter = TrpcRouter[`appRouter`];
