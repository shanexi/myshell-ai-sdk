import type { Meta, StoryObj } from '@storybook/react';
import { MdViewer } from './mdviewer';

const meta: Meta<typeof MdViewer> = {
  component: MdViewer,
};
export default meta;

export const Primary: StoryObj<typeof MdViewer> = {
  args: {},
};
