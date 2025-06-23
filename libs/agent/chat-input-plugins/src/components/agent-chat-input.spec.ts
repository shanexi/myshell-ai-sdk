import { mapToSendRequest } from './agent-chat-input.utils';
it('data to send backend', () => {
  const chatInputDoc = [
    [
      {
        type: 'text',
        text: '分析这张图片',
      },
    ],
  ];
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
      fileKind: 'image',
    },
  ];

  const exp = {
    type: 'chat_message',
    args: {
      context: [
        {
          type: 'image',
          content: {
            name: 'ComfyUI_00074_.png',
            url: '/uploads/file-1750641112789-121254784.png',
          },
        },
      ],
      content_blocks: [{ type: 'text', content: { text: '分析这张图片' } }],
    },
  };

  expect(mapToSendRequest(chatInputDoc, uploads)).toEqual(exp);
});
