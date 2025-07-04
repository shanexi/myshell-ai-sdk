import { ChatInputDoc } from '@myshell-run/common-ui';
import {
  f2b_content_blocks,
  processBlockDirectiveNewLine,
} from './agent-chat.utils';

it('patch to backend', () => {
  const f: ChatInputDoc = [
    [
      {
        type: 'context',
        // @ts-expect-error 暂时不处理
        data: {
          content: 'Bob Smith ',
        },
      },
      {
        type: 'text',
        text: ' 123',
      },
    ],
  ];
  const b = [
    [
      {
        type: 'context',
        content: {
          content: 'Bob Smith ',
        },
      },
      {
        type: 'text',
        content: {
          text: ' 123',
        },
      },
    ],
  ];

  const a = f2b_content_blocks(f);
  expect(a).toEqual(b);
});

describe('process directive newline', () => {
  it('case 1', () => {
    const textList = ['hello', '::x-think'];
    const b = processBlockDirectiveNewLine(textList);
    expect(b).toMatchInlineSnapshot(`
      "hello
      ::x-think
      "
    `);
  });

  it('case 2', () => {
    const textList = ['hello\n', '::x-think'];
    const b = processBlockDirectiveNewLine(textList);
    expect(b).toMatchInlineSnapshot(`
      "hello
      ::x-think
      "
    `);
  });

  it('case 3', () => {
    const textList = ['hello\n', '::x-think\n'];
    const b = processBlockDirectiveNewLine(textList);
    expect(b).toMatchInlineSnapshot(`
      "hello
      ::x-think
      "
    `);
  });
});
