import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from './loading';

const meta: Meta<typeof Loading> = {
  component: Loading,
};
export default meta;

export const Primary: StoryObj<typeof Loading> = {
  args: {
    text: 'ShellAgent is generating',
  },
};
