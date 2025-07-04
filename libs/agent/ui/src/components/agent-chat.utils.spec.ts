import { ChatInputDoc } from '@myshell-run/common-ui';
import {
  f2b_content_blocks,
  mergeContentBlocksText,
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

describe('merge same type', () => {
  it('case 1', () => {
    const a = [
      {
        type: 'think',
        text: '🔧 Calling tool: **get_widget_schema_batch**',
      },
      {
        type: 'think',
        text: '&#10;✅ Tool **get_widget_schema_batch** executed successfully',
      },
    ];

    const b = mergeContentBlocksText(a);
    expect(b).toMatchInlineSnapshot(`
      [
        {
          "text": "🔧 Calling tool: **get_widget_schema_batch**&#10;✅ Tool **get_widget_schema_batch** executed successfully",
          "type": "think",
        },
      ]
    `);
  });

  it('case 1', () => {
    const a = [
      {
        type: 'think',
        text: '🔧 Calling tool: **get_widget_schema_batch**',
      },
      {
        type: 'button',
        text: '&#10;✅ Tool **get_widget_schema_batch** executed successfully',
      },
    ];

    const b = mergeContentBlocksText(a);
    expect(b).toMatchInlineSnapshot(`
      [
        {
          "text": "🔧 Calling tool: **get_widget_schema_batch**",
          "type": "think",
        },
        {
          "text": "&#10;✅ Tool **get_widget_schema_batch** executed successfully",
          "type": "button",
        },
      ]
    `);
  });

  it('case 2', () => {
    const a = [
      {
        type: 'think',
        text: '🔧 Calling tool: **get_widget_schema_batch**',
      },
      {
        type: 'text',
        text: 'hello',
      },
      {
        type: 'think',
        text: '🔧 Calling tool: **get_widget_schema_batch**',
      },
    ];

    const b = mergeContentBlocksText(a);
    expect(b).toMatchInlineSnapshot(`
      [
        {
          "text": "🔧 Calling tool: **get_widget_schema_batch**",
          "type": "think",
        },
        {
          "text": "hello",
          "type": "text",
        },
        {
          "text": "🔧 Calling tool: **get_widget_schema_batch**",
          "type": "think",
        },
      ]
    `);
  });
});
