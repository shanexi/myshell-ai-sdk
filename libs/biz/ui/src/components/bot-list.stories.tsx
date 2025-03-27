import type { Meta, StoryObj } from '@storybook/react';
import { BotListItem } from './bot-list';

const meta: Meta<typeof BotListItem> = {
  // @ts-expect-error 暂不处理 props 复杂的类型
  component: BotListItem,
};
export default meta;

export const Primary: StoryObj<typeof BotListItem> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=14002-78921&m=dev',
    },
  },
  args: {
    data: {
      id: 1,
      name: 'Bot 1',
      description: 'Bot 1 description',
    },
  },
};
