import { Container } from 'inversify';
import { primitivesSchema } from '../convert-plugin';
import { toName, transform } from './primitive-plugin';
import { figmaTwcfgMod } from '../figma-twcfg.mod';
import { Converter } from '../converter';

describe('primitive plugin', () => {
  it('name to name', () => {
    const input = 'Primitives/8 (32px)';
    const output = 'primitives-8';
    expect(toName(input)).toBe(output);
  });

  it('should work', () => {
    const input = {
      id: 'VariableID:6316:1972',
      name: 'Primitives/8 (32px)',
      description: '',
      type: 'FLOAT',
      valuesByMode: { '5261:0': 32 },
      resolvedValuesByMode: { '5261:0': { resolvedValue: 32, alias: null } },
      scopes: [],
      hiddenFromPublishing: true,
      codeSyntax: {},
    };

    expect(transform(primitivesSchema.parse(input))).toMatchInlineSnapshot(`
      [
        "primitives-8",
        32,
      ]
    `);
  });
});

describe('Base', () => {
  let container: Container;
  beforeAll(() => {
    container = new Container();
    container.load(figmaTwcfgMod);
  });
  beforeEach(() => {
    container.snapshot();
  });
  afterEach(() => {
    container.restore();
  });

  it('transform Base.json', () => {
    const converter = container.get(Converter);
    converter.run({
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      vars: require('../__fixtures__/Base.json').variables,
      filter: ['Primitives/'],
    });
    expect(converter.cssvar).toMatchInlineSnapshot(`
      [
        [
          "primitives-0",
          0,
        ],
        [
          "primitives-0․5",
          2,
        ],
        [
          "primitives-1",
          4,
        ],
        [
          "primitives-1․5",
          6,
        ],
        [
          "primitives-2",
          8,
        ],
        [
          "primitives-3",
          12,
        ],
        [
          "primitives-4",
          16,
        ],
        [
          "primitives-5",
          20,
        ],
        [
          "primitives-6",
          24,
        ],
        [
          "primitives-7",
          28,
        ],
        [
          "primitives-8",
          32,
        ],
        [
          "primitives-9",
          36,
        ],
        [
          "primitives-10",
          40,
        ],
        [
          "primitives-11",
          44,
        ],
        [
          "primitives-12",
          48,
        ],
        [
          "primitives-14",
          56,
        ],
        [
          "primitives-16",
          64,
        ],
        [
          "primitives-20",
          80,
        ],
        [
          "primitives-24",
          96,
        ],
        [
          "primitives-32",
          128,
        ],
        [
          "primitives-40",
          160,
        ],
        [
          "primitives-56",
          224,
        ],
        [
          "primitives-64",
          256,
        ],
        [
          "primitives-80",
          320,
        ],
        [
          "primitives-96",
          384,
        ],
        [
          "primitives-120",
          480,
        ],
        [
          "primitives-140",
          560,
        ],
        [
          "primitives-160",
          640,
        ],
        [
          "primitives-180",
          720,
        ],
        [
          "primitives-192",
          768,
        ],
        [
          "primitives-256",
          1024,
        ],
        [
          "primitives-320",
          1280,
        ],
        [
          "primitives-360",
          1440,
        ],
        [
          "primitives-400",
          1600,
        ],
        [
          "primitives-480",
          1920,
        ],
      ]
    `);
  });
});
