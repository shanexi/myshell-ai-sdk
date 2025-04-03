import { Meta, StoryObj } from '@storybook/react';
import { BotListHeader } from './bot-list';

const meta: Meta<typeof BotListHeader> = {
  component: BotListHeader,
};
export default meta;

export const Primary: StoryObj<typeof BotListHeader> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=14002-78921&m=dev',
    },
  },
  args: {},
};
