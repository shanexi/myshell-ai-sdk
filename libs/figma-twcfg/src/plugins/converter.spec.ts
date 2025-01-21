import { ConverterPlugin } from '../convert-plugin';
import { getPlugin, shouldSkip } from '../converter';

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
