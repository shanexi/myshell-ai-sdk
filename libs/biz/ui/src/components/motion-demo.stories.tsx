import type { Meta, StoryObj } from '@storybook/react';
import { MotionDemo } from './motion-demo';

const meta: Meta<typeof MotionDemo> = {
  component: MotionDemo,
  title: 'Components/MotionDemo',
};
export default meta;

export const Primary: StoryObj<typeof MotionDemo> = {
  args: {},
};
