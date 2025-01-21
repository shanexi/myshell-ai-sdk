import { ThemeConfig } from 'tailwindcss/types/config';
import { z } from 'zod';

export const primitivesSchema = z.object({
  id: z.string(),
  name: z.string(),
  valuesByMode: z.record(z.string(), z.number()),
  resolvedValuesByMode: z.record(
    z.string(),
    z.object({
      resolvedValue: z.number(),
      alias: z.null(),
    })
  ),
});

export const varSchema = z.object({
  id: z.string(),
  name: z.string(),
  valuesByMode: z.record(
    z.string(),
    z.union([
      z.object({
        type: z.literal('VARIABLE_ALIAS'),
        id: z.string(),
      }),
      z.number(),
    ])
  ),
  resolvedValuesByMode: z.record(
    z.string(),
    z.union([
      z.object({
        resolvedValue: z.number(),
        alias: z.string(),
        aliasName: z.string(),
      }),
      z.object({
        resolvedValue: z.number(),
        alias: z.null(),
      }),
    ])
  ),
});

export const ConverterPluginSym = Symbol.for('ConverterPlugin');

export interface ConverterPlugin {
  pattern: string;
  category: keyof ThemeConfig | 'cssvar';
  transform(varObj: z.infer<typeof varSchema>): [string, number];
}
