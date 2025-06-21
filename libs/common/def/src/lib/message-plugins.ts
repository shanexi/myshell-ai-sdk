import { JSX } from 'react/jsx-runtime';

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

export interface StrictMessage {
  key: string;
  text: string;
  type: string;
}

export const MessagePlugin = Symbol.for('MessagePlugin');

export interface MessagePlugin {
  type: string;
  render: (data: StrictMessage) => JSX.Element;
}

export const DEFAULT_AVATAR =
  'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';
