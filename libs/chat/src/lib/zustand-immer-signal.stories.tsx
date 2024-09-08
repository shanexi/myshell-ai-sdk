import type { Meta, StoryObj } from '@storybook/react';
import { ImmerSignal } from './zustand-immer-signal';

const meta: Meta<typeof ImmerSignal> = {
  component: ImmerSignal,
};
export default meta;

export const Primary: StoryObj<typeof ImmerSignal> = {
  args: {},
};
