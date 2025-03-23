import { JSX } from 'react/jsx-runtime';

export type MessageListContext = {
  //
};

export interface Message {
  key: string;
  text: string;
  user: 'me' | 'other';
  type?: string;
}

export const MessageItem = Symbol('MessageItem');

export interface MessageItem {
  type: string;
  render: (data: Message) => JSX.Element;
}
