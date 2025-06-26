import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  component: Progress,
};
export default meta;

export const Primary: StoryObj<typeof Progress> = {
  args: {
    args: {
      text: 'Starting to create',
      progress: 50,
    },
  },
};
