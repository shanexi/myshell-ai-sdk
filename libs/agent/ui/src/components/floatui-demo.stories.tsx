import type { Meta, StoryObj } from '@storybook/react';
import { FloatUIDemo } from './floatui-demo';

const meta: Meta<typeof FloatUIDemo> = {
  component: FloatUIDemo,
};
export default meta;

export const Primary: StoryObj<typeof FloatUIDemo> = {
  args: {},
};
