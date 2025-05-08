import type { Meta, StoryObj } from '@storybook/react';
import { BotInfo } from './bot-info';
import { DEFAULT_AVATAR } from '@myshell-run/common-def';

const meta: Meta<typeof BotInfo> = {
  component: BotInfo,
};
export default meta;

export const Primary: StoryObj<typeof BotInfo> = {
  args: {
    bot: {
      id: 1,
      name: 'MyShell',
      avatar: DEFAULT_AVATAR,
      isOfficial: true,
    },
  },
};
