import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './chat-input';

const meta: Meta<typeof ChatInput> = {
  component: ChatInput,
};
export default meta;

export const Primary: StoryObj<typeof ChatInput> = {
  args: {},
};
