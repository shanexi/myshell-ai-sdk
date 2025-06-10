export const demo_default_message_1 = {
  id: 203,
  timestamp: '2025-06-07T15:30:00.400Z',
  type: 'chat_default_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        behavior: 'append',
        content:
          '✅ 我已完成在线学习平台的全面需求分析，并更新了所有相关文档：\\n\\n📋 **',
      },
    ],
  },
};

export const demo_default_message_2 = {
  id: 204,
  timestamp: '2025-06-07T15:30:00.400Z',
  type: 'chat_default_message',
  args: {
    cause: 203,
    content_blocks: [
      {
        type: 'button',
        behavior: 'append',
        display_text: '✅ Confirm',
      },
    ],
  },
};
