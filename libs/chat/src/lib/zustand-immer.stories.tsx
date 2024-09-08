import type { Meta, StoryObj } from '@storybook/react';
import { Immer } from './zustand-immer';

const meta: Meta<typeof Immer> = {
  component: Immer,
};
export default meta;

export const Primary: StoryObj<typeof Immer> = {
  args: {},
};
