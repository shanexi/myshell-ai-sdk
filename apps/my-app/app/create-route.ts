import { createFactory } from 'hono/factory';

const factory = createFactory<{
  Bindings: Env & {
    LIC: string;
  };
}>();

export const createRoute = factory.createHandlers;
