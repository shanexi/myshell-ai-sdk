import { injectable, multiInject } from 'inversify';
import {
  ConverterPlugin,
  ConverterPluginSym,
  varSchema,
} from './convert-plugin';
import { z } from 'zod';

export const runInputSchema = z.object({
  vars: z.array(varSchema),
  filter: z.array(z.string()).optional(),
});

@injectable()
export class Converter {
  #varsMap: Map<string, z.infer<typeof varSchema>> = new Map();
  #cfgData: [string, number][] = [];
  #scopeNameMap: Map<string, string[]> = new Map();

  get cfgData() {
    return [...this.#cfgData].sort((a, b) => a[1] - b[1]);
  }

  constructor(
    @multiInject(ConverterPluginSym) private plugins: ConverterPlugin[]
  ) {}

  run(input: z.infer<typeof runInputSchema>): void {
    runInputSchema.parse(input);
    const { vars, filter } = input;

    this.#varsMap = new Map(input.vars.map((v) => [v.id, v]));

    this.#scopeNameMap = collectScopeNameMap(vars);

    vars.forEach((varObj) => {
      if (shouldSkip(filter, varObj.name)) return;
      const plugin = getPlugin(varObj.name, this.plugins);
      const ret = plugin.transform(varObj);
      this.#cfgData.push(ret);
    });
  }
}

export function collectScopes(vars: z.infer<typeof varSchema>[]) {
  const scopes: string[][] = [];
  vars.forEach((varObj) => {
    const scopeStr = varObj.scopes.join(',');
    if (!scopes.some((s) => s.join(',') === scopeStr)) {
      scopes.push(varObj.scopes);
    }
  });
  return scopes;
}

export function collectScopeNameMap(vars: z.infer<typeof varSchema>[]) {
  const scopeMap = new Map<string, string[]>();
  vars.forEach((varObj) => {
    varObj.scopes.forEach((scope) => {
      if (!scopeMap.has(scope)) {
        scopeMap.set(scope, []);
      }
      scopeMap.get(scope)?.push(varObj.name);
    });
  });
  return scopeMap;
}

export function getPlugin(
  name: string,
  patterns: ConverterPlugin[]
): ConverterPlugin {
  const ps = patterns.filter((p) => name.startsWith(p.pattern));
  if (ps.length === 0) {
    throw new Error(`${name} has no plugin`);
  } else if (ps.length > 1) {
    throw new Error(
      `${name} has multi plugin, ${ps.map((p) => p.pattern).join(',')}`
    );
  } else {
    return ps[0];
  }
}

export function shouldSkip(filter: string[] | undefined, varName: string) {
  if (!filter) return false;
  const ret = filter.some((f) => {
    return varName.startsWith(f);
  });
  return !ret;
}
