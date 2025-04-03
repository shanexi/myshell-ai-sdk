import type { Meta, StoryObj } from '@storybook/react';
import { ChatInputRoot, ChatInputMenu } from './chat-input';

const meta: Meta<typeof ChatInputRoot> = {
  component: ChatInputRoot,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=16756-291206&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof ChatInputRoot> = {
  args: {
    children: <ChatInputMenu />,
  },
};
