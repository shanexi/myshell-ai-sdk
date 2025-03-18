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
  if (mode === 'client-js') {
    console.log('building client js');
    return {
      build: {
        minify: false,
        rollupOptions: {
          input: './app/client.ts',
          external: ['react', 'react-dom'],
          output: {
            format: 'umd',
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
            dir: 'dist/static/js',
            entryFileNames: 'client.js',
          },
        },
        emptyOutDir: true,
        plugins: [],
      },
      plugins: [visualizer()],
    };
  }
  if (mode === 'client-css') {
    console.log('building client css');
    return {
      build: {
        minify: false,
        rollupOptions: {
          input: './app/style.css',
          output: {
            dir: 'dist/static/css',
            assetFileNames: '[name].[ext]',
          },
        },
        emptyOutDir: true,
        plugins: [],
      },
      plugins: [tailwindcss()],
    };
  } else {
    return {
      minify: false,
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
