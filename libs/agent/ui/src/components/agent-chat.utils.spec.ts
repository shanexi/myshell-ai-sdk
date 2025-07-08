import { ChatInputDoc } from '@myshell-run/common-ui';
import {
  chatInputDocToConentBlock,
  f2b_content_blocks,
  mapToSendRequest,
  mergeContentBlocksText,
  processBlockDirectiveNewLine,
  contentBlockToChatInputDoc,
} from './agent-chat.utils';
import { FileKind } from 'human-filetypes';

it('patch to backend', () => {
  const f = [
    [
      {
        type: 'context',
        data: {
          content: 'Bob Smith ',
        },
      },
      {
        type: 'text',
        text: ' 123',
      },
    ],
  ] as ChatInputDoc;
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

describe('mapToSendRequest', () => {
  it('data to send backend', () => {
    const chatInputDoc = [
      [
        {
          type: 'text',
          text: '分析这张图片',
        },
      ],
    ] as ChatInputDoc;
    const uploads = [
      {
        name: 'ComfyUI_00074_.png',
        response: {
          status: 200,
          body: {
            message: '文件上传成功',
            data: {
              file_path: '/uploads/file-1750641112789-121254784.png',
            },
            success: true,
            code: 200,
          },
        },
        fileKind: FileKind.Image,
      },
    ];
    const contexts = [
      {
        type: 'canvas' as const,
        content: {
          name: 'This is canvas',
          a: 'b',
        },
      },
    ];

    const res = mapToSendRequest(chatInputDoc, uploads, contexts);
    if (!res) throw new Error('Cannot hit');
    const { request_id, ...rest } = res;
    expect(rest).toMatchInlineSnapshot(`
          {
            "args": {
              "content_blocks": [
                {
                  "content": {
                    "text": "分析这张图片",
                  },
                  "type": "text",
                },
              ],
              "context": [
                {
                  "content": {
                    "name": "ComfyUI_00074_.png",
                    "url": "/uploads/file-1750641112789-121254784.png",
                  },
                  "type": "image",
                },
                {
                  "content": {
                    "a": "b",
                    "name": "This is canvas",
                  },
                  "type": "canvas",
                },
              ],
            },
            "type": "chat_message",
          }
      `);
  });
});

describe('chatInputDocFrontToBackend', () => {
  it('single line', () => {
    const arr = [
      [
        {
          type: 'text',
          text: '123 ',
        },
        {
          type: 'context',
          data: {
            content: 'Preview ',
            type: 'preview',
          },
        },
        {
          type: 'text',
          text: ' ',
        },
      ],
    ] satisfies ChatInputDoc;
    const act = chatInputDocToConentBlock(arr);
    expect(act).toMatchInlineSnapshot(`
          [
            {
              "content": {
                "text": "123 ",
              },
              "type": "text",
            },
            {
              "content": {
                "content": "Preview ",
                "type": "preview",
              },
              "type": "context",
            },
            {
              "content": {
                "text": " ",
              },
              "type": "text",
            },
          ]
      `);
  });

  it('two line', () => {
    const arr = [
      [
        {
          type: 'text',
          text: '123 ',
        },
        {
          type: 'context',
          data: {
            content: 'Requirement ',
            type: 'requirement',
          },
        },
        {
          type: 'text',
          text: ' ',
        },
      ],
      [
        {
          type: 'text',
          text: 'abc',
        },
      ],
    ] satisfies ChatInputDoc;

    const act = chatInputDocToConentBlock(arr);
    expect(act).toMatchInlineSnapshot(`
      [
        {
          "content": {
            "text": "123 ",
          },
          "type": "text",
        },
        {
          "content": {
            "content": "Requirement ",
            "type": "requirement",
          },
          "type": "context",
        },
        {
          "content": {
            "text": " ",
          },
          "type": "text",
        },
        {
          "content": {
            "text": "
      ",
          },
          "type": "text",
        },
        {
          "content": {
            "text": "abc",
          },
          "type": "text",
        },
      ]
    `);
  });
});

describe('chatInputDocBackendToFrontend', () => {
  it('single line', () => {
    const blocks = [
      {
        content: {
          text: '123 ',
        },
        type: 'text',
      },
      {
        content: {
          content: 'Preview ',
          type: 'preview',
        },
        type: 'context',
      },
      {
        content: {
          text: ' ',
        },
        type: 'text',
      },
    ];

    const result = contentBlockToChatInputDoc(blocks);
    expect(result).toEqual([
      [
        {
          type: 'text',
          text: '123 ',
        },
        {
          type: 'context',
          data: {
            content: 'Preview ',
            type: 'preview',
          },
        },
        {
          type: 'text',
          text: ' ',
        },
      ],
    ]);
  });

  it('two lines', () => {
    const blocks = [
      {
        content: {
          text: '123 ',
        },
        type: 'text',
      },
      {
        content: {
          content: 'Requirement ',
          type: 'requirement',
        },
        type: 'context',
      },
      {
        content: {
          text: ' ',
        },
        type: 'text',
      },
      {
        content: {
          text: '\n',
        },
        type: 'text',
      },
      {
        content: {
          text: 'abc',
        },
        type: 'text',
      },
    ];

    const result = contentBlockToChatInputDoc(blocks);
    expect(result).toEqual([
      [
        {
          type: 'text',
          text: '123 ',
        },
        {
          type: 'context',
          data: {
            content: 'Requirement ',
            type: 'requirement',
          },
        },
        {
          type: 'text',
          text: ' ',
        },
      ],
      [
        {
          type: 'text',
          text: 'abc',
        },
      ],
    ]);
  });
});
