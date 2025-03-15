import build from '@hono/vite-build/cloudflare-workers';
import adapter from '@hono/vite-dev-server/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import honox from 'honox/vite';
import ssg from '@hono/vite-ssg';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  // default
  const entry = './app/server.ts';
  return {
    plugins: [
      honox({
        devServer: { adapter },
        client: { input: ['./app/style.css'] },
      }),
      tailwindcss(),
      // ssg({ entry }),
      build(),
    ],
  };
});
