import type { Meta, StoryObj } from '@storybook/react';
import { Energy } from './energy';

const meta: Meta<typeof Energy> = {
  component: Energy,
};
export default meta;

export const Primary: StoryObj<typeof Energy> = {
  args: {},
};
