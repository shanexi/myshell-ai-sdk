import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './error-msg';

const meta: Meta<typeof ErrorMessage> = {
  component: ErrorMessage,
};
export default meta;

export const Primary: StoryObj<typeof ErrorMessage> = {
  args: {
    key: '1',
    text: 'Hello, how are you?',
  },
};
