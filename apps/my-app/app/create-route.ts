import { createFactory } from 'hono/factory';

const factory = createFactory<{
  Bindings: Env;
}>();

export const createRoute = factory.createHandlers;
