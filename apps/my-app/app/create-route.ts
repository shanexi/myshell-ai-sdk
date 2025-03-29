import { createFactory } from 'hono/factory';
import { HonoEnv } from './server';

export const factory = createFactory<HonoEnv>();

export const createRoute = factory.createHandlers;
