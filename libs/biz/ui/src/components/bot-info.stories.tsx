import type { Meta, StoryObj } from '@storybook/react';
import { BotInfo } from './bot-info';

const meta: Meta<typeof BotInfo> = {
  component: BotInfo,
};
export default meta;

export const Primary: StoryObj<typeof BotInfo> = {
  args: {
    bot: {
      id: 1,
      name: 'MyShell',
      avatar: 'https://picsum.photos/200/300',
      isOfficial: true,
    },
  },
};
