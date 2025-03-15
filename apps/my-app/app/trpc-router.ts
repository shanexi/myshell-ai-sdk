import { inject, injectable } from 'inversify';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClientProvider } from './loadModule';

const t = initTRPC
  .context<{
    env: Env;
  }>()
  .create();

const publicProcedure = t.procedure;
const router = t.router;

@injectable()
export class TrpcRouter {
  constructor(
    @inject('PrismaClientProvider')
    private prismaClientProvider: PrismaClientProvider,
  ) {}

  appRouter = router({
    hello: publicProcedure
      .input(z.string().nullish())
      .query(async ({ input, ctx }) => {
        const prisma = await this.prismaClientProvider(
          ctx.env.DB_MYSHELL_RUN_TEST,
        );
        const users = await prisma.user.findMany();
        return users;
      }),
  });
}

export type AppRouter = TrpcRouter[`appRouter`];
