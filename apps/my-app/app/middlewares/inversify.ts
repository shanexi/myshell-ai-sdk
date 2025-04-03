import { Container, interfaces } from 'inversify';
import { factory } from '../create-route';

export const inversify = (container: Container) =>
  factory.createMiddleware(async (c, next) => {
    c.set('resolve', function <
      T,
    >(identifier: interfaces.ServiceIdentifier<T>): T {
      return container.get<T>(identifier) as T;
    });
    await next();
  });
