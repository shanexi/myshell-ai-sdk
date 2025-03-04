import type { Meta, StoryObj } from '@storybook/react';
import { Chat } from './chat';

const meta: Meta<typeof Chat> = {
  component: Chat,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

export const Primary: StoryObj<typeof Chat> = {
  args: {},
};
