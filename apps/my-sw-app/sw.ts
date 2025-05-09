// To support types
// https://github.com/microsoft/TypeScript/issues/14877
declare const self: ServiceWorkerGlobalScope;

import { Hono } from 'hono';
import { handle } from 'hono/service-worker';

const app = new Hono().basePath('/sw');
app.get('/', (c) => c.text('Hello World 1234'));

self.addEventListener('fetch', handle(app));
