import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './chat-input';

const meta: Meta<typeof ChatInput> = {
  component: ChatInput,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=16756-291206&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof ChatInput> = {
  args: {},
};
