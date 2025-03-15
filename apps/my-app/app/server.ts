import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';
import { loadModule } from './loadModule';
import { Container } from 'inversify';

const container = new Container();
loadModule(container);

const app = createApp();

showRoutes(app);

export default app;
