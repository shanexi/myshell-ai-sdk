import { Container, interfaces } from 'inversify';
import { type PrismaClient } from '@prisma/client-simple-pg/edge';
import { TrpcRouter } from './trpc-router';
import { isNotSSG } from './constants';

export function loadModule(container: Container) {
  isNotSSG && container.bind(TrpcRouter).toSelf().inSingletonScope();
}
