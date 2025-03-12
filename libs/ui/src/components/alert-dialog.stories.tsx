import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog } from './alert-dialog';

const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=12164-158054&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof AlertDialog> = {
  args: {},
};
