import type { Meta, StoryObj } from '@storybook/react';
import { Simple } from './zustand-simple';

const meta: Meta<typeof Simple> = {
  component: Simple,
};
export default meta;

export const Primary: StoryObj<typeof Simple> = {
  args: {},
};
