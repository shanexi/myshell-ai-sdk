import { z } from 'zod';

export const ERROR_MESSAGE_TYPE = 'agent:error';
export const error_message_schema = z.object({
  type: z.literal(ERROR_MESSAGE_TYPE),
  key: z.string(),
  text: z.string(),
});

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

export const LOADING_MESSAGE_TYPE = 'chat_status_message';
export const loading_message_schema = z.object({
  type: z.literal(LOADING_MESSAGE_TYPE),
  key: z.string(),
  args: z.object({
    text: z.string(),
  }),
});

export const PROGRESS_MESSAGE_TYPE = 'chat_progress_message';
export const progress_message_schema = z.object({
  type: z.literal(PROGRESS_MESSAGE_TYPE),
  key: z.string(),
  args: z.object({
    progress: z.number(),
    text: z.string(),
  }),
});

export const agent_message_schema = z.discriminatedUnion('type', [
  own_message_schema,
  reply_message_schema,
  error_message_schema,
  loading_message_schema,
  progress_message_schema,
]);

export type AgentMessage = z.infer<typeof agent_message_schema>;
