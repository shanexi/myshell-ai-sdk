import type { Meta, StoryObj } from '@storybook/react';
import { CheckList } from './checklist-msg';

const meta: Meta<typeof CheckList> = {
  component: CheckList,
};
export default meta;

export const Primary: StoryObj<typeof CheckList> = {
  args: {
    title: 'Design interactive landing pages.',
  },
};
