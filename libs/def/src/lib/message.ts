// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
export interface Message {
  key: string;
  text: string;
  user: 'me' | 'other';
}

export const MessageItem = Symbol('MessageItem');

export interface MessageItem {
  type: string;
  render: (data: Message) => JSX.Element;
}
