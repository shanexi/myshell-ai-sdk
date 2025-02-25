import type { Meta, StoryObj } from '@storybook/react';
import { Signal } from './zustand-signal';

const meta: Meta<typeof Signal> = {
  component: Signal,
};
export default meta;

export const Primary: StoryObj<typeof Signal> = {
  args: {},
};
