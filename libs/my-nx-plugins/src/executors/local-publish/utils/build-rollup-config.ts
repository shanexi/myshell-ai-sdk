import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import * as fs from 'fs-extra';
import * as rollup from 'rollup';
import dts from 'rollup-plugin-dts';
import { z } from 'zod';
import { buildRollupConfigInputSchema } from '../zod-schema';

export function buildRollupConfig(
  input: z.infer<typeof buildRollupConfigInputSchema>,
): rollup.RollupOptions[] {
  const packageJson = fs.readJSONSync(input.packageJsonPath);
  const cfgs = [
    {
      onwarn: (warning, next) => {
        if (input.bundleSuppressWarnCodes.indexOf(warning.code) > -1) return;
        next(warning);
      },
      input: input.dtsBundleInput,
      output: [
        {
          file: input.dtsBundleFile,
          format: 'es',
        },
      ],
      plugins: [
        dts({}),
        alias({
          entries: input.bundleAlias,
        }),
      ],
    },
    {
      onwarn: (warning, next) => {
        if (input.bundleSuppressWarnCodes.indexOf(warning.code) > -1) return;
        next(warning);
      },
      input: input.bundleInput,
      output: [
        {
          file: input.bundleFile,
          format: 'es',
          interop: 'auto',
        },
      ],
      external: [
        ...Object.keys(packageJson.peerDependencies || {}),
        ...Object.keys(packageJson.dependencies || {}),
        ...input.externals,
      ].filter((k) => {
        return Object.keys(input.bundleAlias).indexOf(k) === -1;
      }),
      plugins: [
        alias({
          entries: input.bundleAlias,
        }),
        nodeResolve(),
      ],
    },
  ] as rollup.RollupOptions[];

  return cfgs;
}
