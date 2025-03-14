import type { Meta, StoryObj } from '@storybook/react';
import { ChatTopTab } from './chat-top-tab';

const meta: Meta<typeof ChatTopTab> = {
  component: ChatTopTab,
};
export default meta;

export const Primary: StoryObj<typeof ChatTopTab> = {
  args: {},
};
