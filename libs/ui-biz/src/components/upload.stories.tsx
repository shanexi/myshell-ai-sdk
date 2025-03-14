import type { Meta, StoryObj } from '@storybook/react';
import { Upload } from './upload';

const meta: Meta<typeof Upload> = {
  component: Upload,
};
export default meta;

export const Primary: StoryObj<typeof Upload> = {
  args: {},
};
