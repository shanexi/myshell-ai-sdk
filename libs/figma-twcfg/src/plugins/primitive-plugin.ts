import { injectable } from 'inversify';
import { z } from 'zod';
import {
  ConverterPlugin,
  primitivesSchema,
  varSchema,
} from '../convert-plugin';

@injectable()
export class PrimitivePlugin implements ConverterPlugin {
  get pattern() {
    return 'Primitives/';
  }
  transform(varObj: z.infer<typeof varSchema>): [string, number] {
    return transform(primitivesSchema.parse(varObj));
  }

  get category() {
    return 'cssvar' as const;
  }
}

export function transform(
  varObj: z.infer<typeof primitivesSchema>
): [string, number] {
  const name = toName(varObj.name);
  return [name, Object.values(varObj.valuesByMode)[0]];
}

export function toName(input: string): string {
  return input
    .replace('Primitives/', 'primitives-')
    .replace(/\s*\([^)]*\)/g, '');
}
