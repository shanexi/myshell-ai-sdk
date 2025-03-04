import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessageList } from './chat-message-list';

const meta: Meta<typeof ChatMessageList> = {
  component: ChatMessageList,
};
export default meta;

export const Primary: StoryObj<typeof ChatMessageList> = {
  args: {},
};
