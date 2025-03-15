import { PrismaClient } from '@prisma/client-simple';
import { PrismaD1 } from '@prisma/adapter-d1';

const prismaClients = {
  async fetch(db: D1Database): Promise<PrismaClient> {
    const adapter = new PrismaD1(db);
    const prisma = new PrismaClient({ adapter });
    return prisma;
  },
};

export default prismaClients;
