import { z } from 'zod';
import { error_message_schema } from './components/error/error-msg';
import { loading_message_schema } from './components/loading/loading';
import { progress_message_schema } from './components/progress/progress';
import { content_blocks_schema } from './components/remark/content-blockable';

export const OWN_MESSAGE_TYPE = 'agent:own';
export const own_message_schema = z.object({
  type: z.literal(OWN_MESSAGE_TYPE),
  key: z.string(),
  text: z.string(),
});

export const REPLY_MESSAGE_TYPE = 'agent:reply';
export const reply_message_schema = z
  .object({
    type: z.literal(REPLY_MESSAGE_TYPE),
    key: z.string(),
    text: z.string(),
  })
  .passthrough();

/**
 * 非 chat_message 和 chat_history_message_schema
 */
export const agent_message_schema_2 = z.discriminatedUnion('type', [
  error_message_schema,
  loading_message_schema,
  progress_message_schema,
]);

/**
 * 不包含 chat_history_message_schema
 */
export const agent_message_schema_1 = z.discriminatedUnion('type', [
  content_blocks_schema,
  error_message_schema,
  loading_message_schema,
  progress_message_schema,
]);

export const CHAT_HISTORY_MSG_TYPE = 'chat_history_message';
export const chat_history_message_schema = z.object({
  type: z.literal(CHAT_HISTORY_MSG_TYPE),
  args: z.object({
    data: z.array(agent_message_schema_1),
  }),
});

export const agent_message_schema = z.discriminatedUnion('type', [
  content_blocks_schema,
  error_message_schema,
  loading_message_schema,
  progress_message_schema,
  chat_history_message_schema,
]);
