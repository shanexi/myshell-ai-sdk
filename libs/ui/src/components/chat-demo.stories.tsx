import type { Meta, StoryObj } from '@storybook/react';
import { ChatDemo } from './chat-demo';

const meta: Meta<typeof ChatDemo> = {
  component: ChatDemo,
};
export default meta;

export const Primary: StoryObj<typeof ChatDemo> = {
  args: {},
};
