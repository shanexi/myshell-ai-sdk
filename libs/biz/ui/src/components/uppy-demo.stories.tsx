import type { Meta, StoryObj } from '@storybook/react';
import { UppyDemo } from './uppy-demo';

const meta: Meta<typeof UppyDemo> = {
  component: UppyDemo,
};
export default meta;

export const Primary: StoryObj<typeof UppyDemo> = {
  args: {},
};
