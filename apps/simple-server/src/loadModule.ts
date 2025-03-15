import { Container, interfaces } from 'inversify';
import prismaClients from './prisma';
import { PrismaClient } from '@prisma/client-simple';
import { TrpcRouter } from './trpc-router';

export type PrismaClientProvider = (db: D1Database) => Promise<PrismaClient>;

export function loadModule(container: Container) {
  container
    .bind<PrismaClientProvider>(`PrismaClientProvider`)
    .toProvider<PrismaClient>((ctx: interfaces.Context) => {
      return async (db: D1Database) => {
        const prisma = await prismaClients.fetch(db);
        return prisma;
      };
    });
  container.bind(TrpcRouter).toSelf().inSingletonScope();
}
