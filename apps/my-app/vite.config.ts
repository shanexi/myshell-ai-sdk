import build from '@hono/vite-build/cloudflare-workers';
import adapter from '@hono/vite-dev-server/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import honox from 'honox/vite';
import ssg from '@hono/vite-ssg';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
// import { visualizer } from 'rollup-plugin-visualizer';
import { analyzer } from 'vite-bundle-analyzer';
import ViteTsConfigPathsPlugin from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    console.log('building client');
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
      },
      plugins: [
        // build need this plugin, dev not need
        ViteTsConfigPathsPlugin({
          root: '../../',
        }),
        tailwindcss(),
        // https://github.com/nrwl/nx/issues/19282
        svgr({
          svgrOptions: {
            exportType: 'named',
            ref: true,
            svgo: false,
            titleProp: true,
          },
          include: '**/*.svg',
        }),
        // visualizer(),
        analyzer(),
      ],
    };
  } else {
    return {
      ssr: {
        external: [
          'react',
          'react-dom',
          'mobx-react-lite',
          'mobx',
          'react-markdown',
          'remark-gfm',
          'use-sync-external-store',
        ],
      },
      plugins: [
        ViteTsConfigPathsPlugin({
          root: '../../',
        }),
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
        svgr({
          svgrOptions: {
            exportType: 'named',
            ref: true,
            svgo: false,
            titleProp: true,
          },
          include: '**/*.svg',
        }),
      ],
    };
  }
});
