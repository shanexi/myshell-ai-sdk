import { Container, interfaces } from 'inversify';
import { type PrismaClient } from '@prisma/client-simple-pg/edge';
import { TrpcRouter } from './trpc-router';
import { isNotSSG } from './constants';

export type PrismaClientProvider = (
  datasourceUrl: string,
) => Promise<PrismaClient>;

export function loadModule(container: Container) {
  isNotSSG &&
    container
      .bind<PrismaClientProvider>(`PrismaClientProvider`)
      // @ts-expect-error temp
      .toProvider<PrismaClient>((ctx: interfaces.Context) => {
        return async (datasourceUrl: string) => {
          const { PrismaClient } = await import(
            '@prisma/client-simple-pg/edge'
          );
          const { withAccelerate } = await import(
            '@prisma/extension-accelerate'
          );
          const prisma = new PrismaClient({
            datasourceUrl,
          }).$extends(withAccelerate());
          return prisma;
        };
      });

  isNotSSG && container.bind(TrpcRouter).toSelf().inSingletonScope();
}
