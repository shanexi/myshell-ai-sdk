import { JSX } from 'react/jsx-runtime';
import { z } from 'zod';

export type MessageListContext = {
  //
};

/**
 * @deprecated 使用 StrictMessage
 */
export interface Message {
  key: string;
  text: string;
  user: 'me' | 'other';
  type?: string;
  avatar?: string;
}

export const strict_message_schema = z.object({
  key: z.string(),
  message_id: z.number().optional().describe('后端返回的 message_id'),
  text: z.string(),
  type: z.string(),
  args: z.any().optional(),
  toDelete: z.boolean().optional(),
});

export type StrictMessage = z.infer<typeof strict_message_schema>;

export const MessagePlugin = Symbol.for('MessagePlugin');

export interface MessagePlugin {
  type: string;
  render: (data: StrictMessage) => JSX.Element;
}

export const DEFAULT_AVATAR =
  'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';
