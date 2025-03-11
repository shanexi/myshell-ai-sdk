import type { Meta, StoryObj } from '@storybook/react';
import { ChatTop } from './chat-top';

const meta: Meta<typeof ChatTop> = {
  component: ChatTop,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=16712-281088&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof ChatTop> = {
  args: {},
};
