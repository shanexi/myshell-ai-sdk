import { initTRPC } from '@trpc/server';
import { decorate, injectable } from 'inversify';
import { z } from 'zod';

const t = initTRPC
  .context<{
    env: Env;
  }>()
  .create();

const publicProcedure = t.procedure;
const router = t.router;

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
decorate(injectable(), TrpcRouter);

export type AppRouter = TrpcRouter[`appRouter`];
