import { inject, injectable } from 'inversify';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC
  .context<{
    env: Env;
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
      .input(z.string().nullish())
      .query(async ({ input, ctx }) => {
        return [];
      }),
  });
}

export type AppRouter = TrpcRouter[`appRouter`];
