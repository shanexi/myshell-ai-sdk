import type { Meta, StoryObj } from '@storybook/react';
import { CheckList } from './checklist-msg';

const meta: Meta<typeof CheckList> = {
  component: CheckList,
};
export default meta;

export const Primary: StoryObj<typeof CheckList> = {
  args: {
    key: '1',
    text: 'Hello, how are you?',
    user: 'me',
  },
};
