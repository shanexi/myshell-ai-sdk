import { Container, interfaces } from 'inversify';
import { PrismaClient } from '@prisma/client-simple';
import { PrismaD1 } from '@prisma/adapter-d1';

export function loadModule(container: Container) {
  // container
  //   .bind<interfaces.Factory<PrismaClient>>('Factory<PrismaClient>')
  //   .toFactory<PrismaClient, [D1Database]>(() => {
  //     return (db) => {
  //       const adapter = new PrismaD1(db);
  //       const prisma = new PrismaClient({ adapter });
  //       return prisma;
  //     };
  //   });
}
