import type { Meta, StoryObj } from '@storybook/react';
import { RemarkMsg } from './remark-msg';

const meta: Meta<typeof RemarkMsg> = {
  component: RemarkMsg,
};
export default meta;

export const Reply: StoryObj<typeof RemarkMsg> = {
  parameters: {},
  args: {},
};
