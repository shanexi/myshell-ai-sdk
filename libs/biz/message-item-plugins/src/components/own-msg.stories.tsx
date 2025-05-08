import type { Meta, StoryObj } from '@storybook/react';
import { OwnMessage } from './own-msg';

const meta: Meta<typeof OwnMessage> = {
  component: OwnMessage,
};
export default meta;

export const Primary: StoryObj<typeof OwnMessage> = {
  args: {
    key: '1',
    text: 'Hello, how are you?',
    user: 'me',
  },
};
