/**
 *
 * @deprecated 当前文件已经废弃, 是在和 backend 讨论的过程 留下来做参考
 *
 */
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
        type: 'x-collapse' as const,
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

// agent_ [state_changed]
export const wait_container_init = {
  type: 'chat_message',
  id: 2,
  message_id: 'abc',
  timestamp: '2024-03-20T10:00:01Z',
  source: 'agent',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: '正在初始化任务',
      },
    ],
  },
};

/**
 * msg.type == msgs[cause id].type
 */
export const wait_container_init_1 = {
  type: 'chat_message',
  id: 3,
  message_id: 'abc',
  timestamp: '2024-03-20T10:00:02Z',
  source: 'agent',
  cause: 2, // event id 等同于 replace/append
  args: {
    content_blocks: [
      {
        type: 'text',
        content: '开始分析需求',
      },
    ],
  },
};

// [chat_]
export const user_send_init = {
  type: 'chat_message',
  id: 1,
  timestamp: '2024-03-20T10:00:00Z',
  source: 'user',
  args: {
    content_blocks: [
      {
        type: 'text',
        content: {
          text: '请帮我实现一个用户登录功能',
        },
      },
    ],
  },
};

// chat_
export const tool_call = {
  type: 'chat_tool_call_message',
  id: 4,
  timestamp: '2024-03-20T10:00:03Z',
  source: 'agent',
  args: {
    // "status": "call_started",
    info: {
      // "name": "code_search",
      type: 'search',
      content_blocks: [
        {
          type: 'text',
          content: {
            text: '正在搜索相关代码...',
          },
        },
      ],
    },
  },
};

/**
 * message 展示类型
 * figma
 * - 富文本消息（带 button） chat_default_message
 * - 进度消息
 * - 折叠消息
 * - 报错消息
 */
export const tool_call_done = {
  type: 'chat_log',
  id: 5, // event id
  message_id: 5, // history message id
  timestamp: '2024-03-20T10:00:04Z',
  cause: '', // replace append
  source: 'agent',
  args: {
    info: {
      type: 'search',
      content_blocks: [
        {
          type: 'text',
          content: {
            text: '找到相关代码文件 ✅', //
          },
        },
        {
          type: 'log',
          content: {
            block_id: '',
            text: 'abc', // 折叠
          },
        },
      ],
    },
  },
};

export const tool_call_done_1 = {
  type: 'chat_progress_message',
  id: 5,
  timestamp: '2024-03-20T10:00:04Z',
  source: 'agent',
  args: {
    status: 'doing',
    content: 'Create initial files',
  },
};

export const tool_call_done_2 = {
  type: 'chat_progress_message',
  id: 6,
  timestamp: '2024-03-20T10:00:04Z',
  source: 'agent',
  cause: 5,
  args: {
    status: 'done',
    content: 'Create initial files',
  },
};

export const tool_call_done_3 = {
  type: 'chat_progress_message',
  id: 7,
  timestamp: '2024-03-20T10:00:04Z',
  source: 'agent',
  cause: 9,
  args: {
    status: 'doing',
    content: 'Install dependencies',
  },
};

// 原则 名字一样，但是实质上不一样

// chat_messaage

// 以下是后端 mock 数据 0619

export const connect_msg = {
  id: -1,
  status: 'completed',
  type: 'agent_state_changed',
  args: {
    agent_state: 'running',
    reason: '',
  },
};

export const user_msg1 = {
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

export const user_msg1_reply = {
  id: -1,
  message_id: 12334,
  status: 'completed',
  type: 'error_message',
  args: {
    id: '1750288857709',
    content: 'data must be a json',
  },
};
