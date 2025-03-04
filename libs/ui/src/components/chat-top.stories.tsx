import type { Meta, StoryObj } from '@storybook/react';
import { ChatTop } from './chat-top';

const meta: Meta<typeof ChatTop> = {
  component: ChatTop,
};
export default meta;

export const Primary: StoryObj<typeof ChatTop> = {
  args: {},
};
