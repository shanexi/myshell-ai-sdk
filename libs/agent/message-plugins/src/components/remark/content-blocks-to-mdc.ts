import { z } from 'zod';

export const chat_message_type = z.enum(['chat_message']);

const text_schema = z.object({
  type: z.literal('text'),
  content: z.object({
    text: z.string(),
  }),
});

const button_schema = z.object({
  type: z.literal('button'),
  content: z.object({
    action_type: z.enum(['submit']),
    display_text: z.string(),
    target: z.string(),
    parameters: z.object({
      action: z.string(),
    }),
  }),
});

const agent_log_schema = z.object({
  type: z.literal('agent_log'),
  content: z.object({
    text: z.string(),
  }),
});

const think_schema = z.object({
  type: z.literal('think'),
  content: z.object({
    text: z.string(),
  }),
});

export const content_blocks_schema = z.object({
  id: z.number(),
  message_id: z.number(),
  // timestamp: z.string().datetime(),
  timestamp: z.string(),
  source: z.union([z.literal('agent'), z.literal('user'), z.literal('server')]),
  type: chat_message_type,
  cause: z
    .number()
    .optional()
    .describe(
      'cause 是一个语义不明确的字段，来自于 openhands，目前的含义是如果有，则替 message_id 内容 ',
    ),
  args: z.object({
    content_blocks: z.array(
      z.discriminatedUnion('type', [
        text_schema,
        button_schema,
        agent_log_schema,
        think_schema,
      ]),
    ),
  }),
});

/**
 *
 * 考虑到 remark 实现换行有难度，先转成 directive
 * todo 插件 先 if-else
 */
export const content_blocks_to_mdc = (
  res: z.infer<typeof content_blocks_schema>,
) => {
  return res.args.content_blocks
    .map((block) => {
      switch (block.type) {
        case 'text':
          return block.content.text;
        case 'button':
          // 行内
          return `:x-${block.type}{display_text='${block.content.display_text}'}`;
        case 'agent_log':
          // return `:x-${block.type}{display_text='${block.content.text}'}`;
          return `::x-agent-log{#${res.message_id} text="${escapeForDirective(block.content.text)}"}`;
        case 'think':
          return `::x-think{#${res.message_id} text="${escapeForDirective(block.content.text)}"}`;
        default:
          return '';
      }
    })
    .join(' ');
};

// 非常可以，即使替换成了 &quot; @patternfly/react-log-viewer 也能重新解析成 "
const escapeForDirective = (value: string): string => {
  return `${value.replace(/"/g, '&quot;')}`;
};
