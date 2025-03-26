import { Meta, StoryObj } from '@storybook/react';
import { BotListSearch } from './bot-list-search';

const meta: Meta<typeof BotListSearch> = {
  component: BotListSearch,
};
export default meta;

export const Primary: StoryObj<typeof BotListSearch> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=14002-78921&m=dev',
    },
  },
  args: {},
};
