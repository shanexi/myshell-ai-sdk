import type { Meta, StoryObj } from '@storybook/react';
import { SimpleAuto } from './zustand-simple-auto';

const meta: Meta<typeof SimpleAuto> = {
  component: SimpleAuto,
};
export default meta;

export const Primary: StoryObj<typeof SimpleAuto> = {
  args: {},
};
