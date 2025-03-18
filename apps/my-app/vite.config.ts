import build from '@hono/vite-build/cloudflare-workers';
import adapter from '@hono/vite-dev-server/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import honox from 'honox/vite';
import ssg from '@hono/vite-ssg';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: ['./app/client.ts', './app/style.css'],
          output: {
            entryFileNames: 'static/client.js',
            chunkFileNames: 'static/assets/[name]-[hash].js',
            assetFileNames: 'static/assets/[name].[ext]',
          },
        },
        emptyOutDir: true,
        plugins: [],
      },
      plugins: [tailwindcss(), visualizer()],
    };
  } else {
    return {
      ssr: {
        external: ['react', 'react-dom', 'mobx-react-lite', 'mobx'],
      },
      plugins: [
        honox({
          devServer: { adapter },
          client: { input: ['./app/style.css'] },
        }),
        tailwindcss(),
        build(),
        ...(process.env.VITE_SSG === '1'
          ? [ssg({ entry: './app/server.ts' })]
          : []),
        mdx({
          jsxImportSource: 'react',
          remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        }),
      ],
    };
  }
});
