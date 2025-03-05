import type { Meta, StoryObj } from '@storybook/react';
import { LuiForm } from './lui-form';

const meta: Meta<typeof LuiForm> = {
  component: LuiForm,
};
export default meta;

export const Primary: StoryObj<typeof LuiForm> = {
  args: {},
};
