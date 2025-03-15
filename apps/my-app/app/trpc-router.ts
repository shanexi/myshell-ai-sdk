import { inject, injectable } from 'inversify';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClientProvider } from './loadModule';

const DATABASE_URL =
  'prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZWIzNzYyYWYtMjk5ZS00MzE4LWE0NmItMWYyMTBjYThiZjRkIiwidGVuYW50X2lkIjoiMzgxOGRkNTlhZDI3ODIxZWRjMTFkMjBlNTYyOTU0MTU4M2Y2NWFhYTQyZWFhZTc4NzgzZTNlOTk0MzU4ZGQwYyIsImludGVybmFsX3NlY3JldCI6IjlkNTA0MGM2LWJiOGYtNGU1Yi05OTEwLWFkMTFhY2NmZjZhYSJ9.T63mMP8pfl4Q_dezeO7HN_G-Qk1grTUTNOGVs2w45P8';

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
        const prisma = await this.prismaClientProvider(DATABASE_URL);
        const users = await prisma.user.findMany();
        return users;
      }),
  });
}

export type AppRouter = TrpcRouter[`appRouter`];
