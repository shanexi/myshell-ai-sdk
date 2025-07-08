import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './error-msg';

const meta: Meta<typeof ErrorMessage> = {
  component: ErrorMessage,
};
export default meta;

export const Primary: StoryObj<typeof ErrorMessage> = {
  args: {
    message_id: 1,
    args: {
      content: 'Hello, how are you?',
    },
  },
};
