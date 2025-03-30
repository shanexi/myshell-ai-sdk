import { HonoEnv, MyAppALS } from '@myshell-run/biz-def';
import { AsyncLocalStorage } from 'async_hooks';
import { Context } from 'hono';
import { factory } from '../create-route';
import { Container } from 'inversify';

export const als = (
  als: AsyncLocalStorage<Context<HonoEnv>>,
  container: Container,
) => {
  container
    .bind<AsyncLocalStorage<Context<HonoEnv>>>(MyAppALS)
    .toDynamicValue(() => {
      return als;
    })
    .inRequestScope();

  return factory.createMiddleware(async (c, next) => {
    return als.run(c, next);
  });
};
