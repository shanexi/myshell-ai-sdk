import type { Meta, StoryObj } from '@storybook/react';
import { ListDirectoryMsg } from './list-directory-msg';

const meta: Meta<typeof ListDirectoryMsg> = {
  component: ListDirectoryMsg,
};
export default meta;

export const Primary: StoryObj<typeof ListDirectoryMsg> = {
  args: {
    key: '1',
    text: 'Hello, how are you?',
    user: 'me',
  },
};
