import { Container } from 'inversify';
import { primitivesSchema } from '../convert-plugin';
import { toName, transform } from './primitive-plugin';
import { figmaTwcfgMod } from '../figma-twcfg.mod';
import { Converter } from '../converter';

describe('primitive plugin', () => {
  it('name to name', () => {
    const input = 'Primitives/8 (32px)';
    const output = '8';
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
        "8",
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
    expect(converter.cfgData).toMatchInlineSnapshot(`
      [
        [
          "0",
          0,
        ],
        [
          "0․5",
          2,
        ],
        [
          "1",
          4,
        ],
        [
          "1․5",
          6,
        ],
        [
          "2",
          8,
        ],
        [
          "3",
          12,
        ],
        [
          "4",
          16,
        ],
        [
          "5",
          20,
        ],
        [
          "6",
          24,
        ],
        [
          "7",
          28,
        ],
        [
          "8",
          32,
        ],
        [
          "9",
          36,
        ],
        [
          "10",
          40,
        ],
        [
          "11",
          44,
        ],
        [
          "12",
          48,
        ],
        [
          "14",
          56,
        ],
        [
          "16",
          64,
        ],
        [
          "20",
          80,
        ],
        [
          "24",
          96,
        ],
        [
          "32",
          128,
        ],
        [
          "40",
          160,
        ],
        [
          "56",
          224,
        ],
        [
          "64",
          256,
        ],
        [
          "80",
          320,
        ],
        [
          "96",
          384,
        ],
        [
          "120",
          480,
        ],
        [
          "140",
          560,
        ],
        [
          "160",
          640,
        ],
        [
          "180",
          720,
        ],
        [
          "192",
          768,
        ],
        [
          "256",
          1024,
        ],
        [
          "320",
          1280,
        ],
        [
          "360",
          1440,
        ],
        [
          "400",
          1600,
        ],
        [
          "480",
          1920,
        ],
      ]
    `);
  });
});
