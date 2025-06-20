export const msg1 = {
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '你好',
        },
      },
    ],
  },
};

export const msg2 = {
  id: 70,
  message_id: 1750313794763181,
  timestamp: '2025-06-19T06:16:34.763161',
  source: 'agent',
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '你好，有什么可以帮你的吗？我可以帮你实现任意功能，请使用 *生成+功能名称* 命令来生成代码',
        },
      },
    ],
  },
};

export const msg3 = {
  id: 73,
  message_id: 1750314168162596,
  timestamp: '2025-06-19T06:22:48.162576',
  source: 'user',
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '生成代码',
        },
      },
    ],
  },
};

export const msg4 = {
  id: 74,
  message_id: 1750314170176126,
  timestamp: '2025-06-19T06:22:50.176104',
  source: 'agent',
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '我已经分析了您的需求，需要实现以下功能：\n 1. 用户登录页面\n2. 邮箱密码验证\n3. 记住登录状态\n4. 错误提示，请使用 *确认需求* 命令来确认需求',
        },
      },
      {
        type: 'button',
        content: {
          action_type: 'submit',
          display_text: '确认需求',
          target: 'confirm_requirements',
          parameters: {
            action: 'confirm',
          },
        },
      },
    ],
  },
};

export const msg5 = {
  id: 75,
  message_id: 1750314198178051,
  timestamp: '2025-06-19T06:23:18.178031',
  source: 'user',
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '确认需求',
        },
      },
    ],
  },
};

export const msg6 = {
  id: 77,
  message_id: 1750314202186060,
  timestamp: '2025-06-19T06:23:22.186037',
  source: 'agent',
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '好的，我会开始生成代码。',
        },
      },
    ],
  },
};

export const msg7 = {
  id: 78,
  message_id: 1750314202186060,
  timestamp: '2025-06-19T06:23:24.186390',
  source: 'agent',
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '首先，我需要生成一个用户登录页面。\n',
        },
      },
    ],
  },
};
