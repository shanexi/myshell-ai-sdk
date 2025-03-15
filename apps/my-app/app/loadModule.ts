import { Container, interfaces } from 'inversify';
import { type PrismaClient } from '@prisma/client-simple';
import { TrpcRouter } from './trpc-router';
import { isNotSSG } from './constants';

export type PrismaClientProvider = (db: D1Database) => Promise<PrismaClient>;

export function loadModule(container: Container) {
  isNotSSG &&
    container
      .bind<PrismaClientProvider>(`PrismaClientProvider`)
      .toProvider<PrismaClient>((ctx: interfaces.Context) => {
        return async (db: D1Database) => {
          const { PrismaClient } = await import('@prisma/client-simple');
          const { PrismaD1 } = await import('@prisma/adapter-d1');
          const adapter = new PrismaD1(db);
          const prisma = new PrismaClient({ adapter });
          return prisma;
        };
      });

  isNotSSG && container.bind(TrpcRouter).toSelf().inSingletonScope();
}
