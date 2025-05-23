import type { Meta, StoryObj } from '@storybook/react';
import { FloatUIPopoverDemo } from './floatui-popover-demo';

const meta: Meta<typeof FloatUIPopoverDemo> = {
  component: FloatUIPopoverDemo,
};
export default meta;

export const Primary: StoryObj<typeof FloatUIPopoverDemo> = {
  args: {},
};
