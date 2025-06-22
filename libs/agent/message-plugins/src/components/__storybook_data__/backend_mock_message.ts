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

// msg6 msg7 message_id 相同 无 cause，即 append 同一个消息
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

// msg8 msg9 和 msg6 7 同一个 case
export const msg8 = {
  id: 96,
  message_id: 1750384508693248,
  timestamp: '2025-06-20T01:55:12.693349',
  source: 'agent',
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '然后，我需要生成一个邮箱密码验证功能。\n',
        },
      },
    ],
  },
};

export const msg9 = {
  id: 97,
  message_id: 1750384508693248,
  timestamp: '2025-06-20T01:55:14.693463',
  source: 'agent',
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '最后，我需要生成一个记住登录状态功能。\n',
        },
      },
    ],
  },
};

// msg10 11 同一个 message_id 有 cause 即 replace
export const msg10 = {
  id: 98,
  message_id: 1750384516694053,
  timestamp: '2025-06-20T01:55:16.694030',
  source: 'agent',
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '正在查看需求文档，请稍等...',
        },
      },
    ],
  },
};

export const msg11 = {
  id: 99,
  message_id: 1750384516694053,
  timestamp: '2025-06-20T01:55:18.694821',
  source: 'agent',
  cause: 1,
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '已经为您找到相关代码，接下来我会开始生成应用.',
        },
      },
    ],
  },
};

// msg12 msg13 同 message_id 但是有 agent_log 类型
export const msg12 = {
  id: 100,
  message_id: 1750384520695892,
  timestamp: '2025-06-20T01:55:20.695870',
  source: 'agent',
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '正在生成应用，请稍等...',
        },
      },
    ],
  },
};

export const msg13 = {
  id: 101,
  message_id: 1750384520695892,
  timestamp: '2025-06-20T01:55:22.696145',
  source: 'agent',
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'agent_log',
        content: {
          text: '正在查看文件结构...',
        },
      },
    ],
  },
};

// 手动从 msg13 copy 验证能否 agent_log append
/*
大概思路 等有网了用 AI 实现
相同 message_id 的
content_blocks 按照相邻类型一致的进行 text append。
不一定是 append（根据 type 处理）
*/
export const msg14 = {
  id: 102,
  message_id: 1750384520695892,
  timestamp: '2025-06-20T01:55:22.696145',
  source: 'agent',
  type: 'chat_message',
  args: {
    content_blocks: [
      {
        type: 'agent_log',
        content: {
          text: '正在执行安全检查...',
        },
      },
    ],
  },
};
