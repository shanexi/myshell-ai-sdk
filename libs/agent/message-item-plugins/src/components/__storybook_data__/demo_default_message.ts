export const demo_default_message_1 = {
  id: 203,
  timestamp: '2025-06-07T15:30:00.400Z',
  type: 'chat_default_message',
  args: {
    behavior: 'append' as const,
    content_blocks: [
      {
        type: 'text' as const,
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
    behavior: 'append' as const,
    content_blocks: [
      {
        id: 'abc',
        type: 'x-button' as const,
        display_text: 'Confirm',
      },
    ],
  },
};

export const demo_default_message_3 = {
  id: 204,
  timestamp: '2025-06-07T15:30:00.400Z',
  type: 'chat_default_message',
  args: {
    cause: 203,
    behavior: 'append' as const,
    content_blocks: [
      {
        id: 'abc',
        type: 'x-button' as const,
        display_text: '✅ Confirm',
      },
    ],
  },
};

export const demo_default_message_4 = {
  id: 204,
  timestamp: '2025-06-07T15:30:00.400Z',
  type: 'chat_default_message',
  args: {
    behavior: 'append' as const,
    content_blocks: [
      {
        id: 'bcd',
        type: 'x-button' as const,
        display_text: 'Reject',
      },
    ],
  },
};

export const demo_default_message_5 = {
  id: 203,
  timestamp: '2025-06-07T15:30:00.400Z',
  type: 'chat_default_message',
  args: {
    behavior: 'append' as const,
    content_blocks: [
      {
        type: 'text' as const,
        content:
          '✅ 我已完成在线学习平台的全面需求分析，并更新了所有相关文档：\\n\\n📋 **',
      },
      {
        id: 'abc',
        type: 'x-button' as const,
        display_text: 'Confirm',
      },
      {
        id: 'bcd',
        type: 'x-button' as const,
        display_text: 'Reject',
      },
    ],
  },
};
