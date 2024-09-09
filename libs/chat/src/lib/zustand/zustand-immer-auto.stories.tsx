import type { Meta, StoryObj } from '@storybook/react';
import { ImmerAuto } from './zustand-immer-auto';

const meta: Meta<typeof ImmerAuto> = {
  component: ImmerAuto,
};
export default meta;

export const Primary: StoryObj<typeof ImmerAuto> = {
  args: {},
};
