import { ConverterPlugin } from '../convert-plugin';
import {
  collectScopeNameMap,
  collectScopes,
  getPlugin,
  shouldSkip,
} from '../converter';

describe('isInFilter', () => {
  it('should return true when variable name is not in filter list', () => {
    const filter = ['color', 'spacing'];
    const varName = 'typography.h1';
    expect(shouldSkip(filter, varName)).toBe(true);
  });

  it('should return false when variable name is in filter list', () => {
    const filter = ['color', 'typography'];
    const varName = 'typography.h1';
    expect(shouldSkip(filter, varName)).toBe(false);
  });

  it('should return false when filter is undefined', () => {
    const varName = 'typography.h1';
    expect(shouldSkip(undefined, varName)).toBe(false);
  });
});

describe('getPlugin', () => {
  const mockPlugins: ConverterPlugin[] = [
    { pattern: 'color/', category: 'colors', transform: jest.fn() },
    { pattern: 'spacing/', category: 'spacing', transform: jest.fn() },
    { pattern: 'typography/', category: 'borderRadius', transform: jest.fn() },
  ];

  it('should return matching plugin when variable name matches pattern', () => {
    const result = getPlugin('color/primary/500', mockPlugins);
    expect(result).toBe(mockPlugins[0]);
  });

  it('should throw error when no plugin matches', () => {
    expect(() => getPlugin('border/radius', mockPlugins)).toThrow(
      'border/radius has no plugin'
    );
  });

  it('should throw error when multiple plugins match', () => {
    const conflictPlugins = [
      ...mockPlugins,
      { pattern: 'color', category: 'colors' as const, transform: jest.fn() },
    ];

    expect(() => getPlugin('color/primary/500', conflictPlugins)).toThrow(
      'color/primary/500 has multi plugin, color/,color'
    );
  });

  it('should work with empty plugins array', () => {
    expect(() => getPlugin('any/name', [])).toThrow('any/name has no plugin');
  });
});

describe('collectScopeNameMap', () => {
  it('should work', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vars = require('../__fixtures__/Base.json').variables;
    const scopeMap = collectScopeNameMap(vars);
    expect(scopeMap).toMatchInlineSnapshot(`
      Map {
        "CORNER_RADIUS" => [
          "Redius/radius-xl",
          "Redius/radius-4xl",
          "Redius/radius-full",
          "Redius/radius-md",
          "Redius/radius-sm",
          "Redius/radius-2xl",
          "Redius/radius-lg",
          "Redius/radius-none",
          "Redius/radius-3xl",
          "Redius/radius-default",
          "Components/Button/lg/radius",
          "Components/Button/md/radius",
          "Components/Button/sm/radius",
          "Components/Chip/sm/radius",
        ],
        "GAP" => [
          "Spacing/spacing-none",
          "Spacing/spacing-xs",
          "Spacing/spacing-md",
          "Spacing/spacing-lg",
          "Spacing/spacing-xl",
          "Spacing/spacing-2xl",
          "Spacing/spacing-3xl",
          "Spacing/spacing-4xl",
          "Spacing/spacing-7xl",
          "Spacing/spacing-sm",
          "Spacing/spacing-xxs",
          "Spacing/spacing-5xl",
          "Spacing/spacing-6xl",
          "Spacing/spacing-8xl",
          "Spacing/spacing-9xl",
          "Spacing/spacing-10xl",
          "Spacing/spacing-11xl",
          "Spacing/spacing-12xl",
          "Containers/container-padding-mobile",
          "Containers/container-padding-desktop",
          "Components/Button/lg/spacing",
          "Components/Button/lg/padding",
          "Components/Button/md/spacing",
          "Components/Button/md/padding",
          "Components/Button/sm/spacing",
          "Components/Button/sm/padding",
          "Components/Chip/sm/spacing",
          "Components/Chip/sm/padding",
        ],
        "WIDTH_HEIGHT" => [
          "Widths/width-xxs",
          "Widths/width-xs",
          "Widths/width-sm",
          "Widths/width-md",
          "Widths/width-lg",
          "Widths/width-xl",
          "Widths/width-2xl",
          "Widths/width-3xl",
          "Widths/width-4xl",
          "Widths/width-5xl",
          "Widths/width-6xl",
          "Widths/paragraph-max-width",
          "Containers/container-max-width-desktop",
          "Components/Button/lg/height",
          "Components/Button/lg/min-width",
          "Components/Button/md/height",
          "Components/Button/md/min-width",
          "Components/Button/sm/height",
          "Components/Button/sm/min-width",
          "Components/Chip/sm/height",
        ],
        "ALL_SCOPES" => [
          "Components/Input/height",
          "Redius/radius-5xl",
          "Components/Button/xs/height",
          "Components/Button/xs/radius",
          "Components/Button/xs/spacing",
          "Components/Button/xs/min-width",
          "Containers/container-padding-mobile-Chat",
        ],
      }
    `);
  });
});

describe('collectScopes', () => {
  it('should work', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vars = require('../__fixtures__/Base.json').variables;
    const scopes = collectScopes(vars);
    expect(scopes).toMatchInlineSnapshot(`
      [
        [
          "CORNER_RADIUS",
        ],
        [],
        [
          "GAP",
        ],
        [
          "WIDTH_HEIGHT",
        ],
        [
          "ALL_SCOPES",
        ],
      ]
    `);
  });
});
