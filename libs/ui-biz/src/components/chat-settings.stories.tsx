import type { Meta, StoryObj } from '@storybook/react';
import { ChatSettings } from './chat-settings';

const meta: Meta<typeof ChatSettings> = {
  component: ChatSettings,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=41-47079&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof ChatSettings> = {
  args: {},
};
