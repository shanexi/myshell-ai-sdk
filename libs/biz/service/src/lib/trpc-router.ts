import { initTRPC } from '@trpc/server';
import { injectable } from 'inversify';
import { z } from 'zod';

const t = initTRPC
  .context<{
    //
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

    chat: publicProcedure
      .input(
        z.object({
          messages: z.array(
            z.object({
              role: z.enum(['user', 'assistant']),
              content: z.string(),
            }),
          ),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        return input;
      }),
  });
}

export type AppRouter = TrpcRouter[`appRouter`];
