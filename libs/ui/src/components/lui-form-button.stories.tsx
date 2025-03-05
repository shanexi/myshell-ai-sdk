import type { Meta, StoryObj } from '@storybook/react';
import { LuiFormButton } from './lui-form-button';

const meta: Meta<typeof LuiFormButton> = {
  component: LuiFormButton,
};
export default meta;

export const Default: StoryObj<typeof LuiFormButton> = {
  args: {
    children: 'Cancel',
    variant: 'default',
  },
};

export const Primary: StoryObj<typeof LuiFormButton> = {
  args: {
    children: 'Generate',
    variant: 'primary',
  },
};
