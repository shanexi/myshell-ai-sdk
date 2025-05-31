import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
};
export default meta;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: 'Cancel',
    variant: 'default',
  },
};

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: 'Generate',
    variant: 'primary',
  },
};
