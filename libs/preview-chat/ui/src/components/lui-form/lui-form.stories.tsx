import type { Meta, StoryObj } from '@storybook/react';
import { LuiForm } from './lui-form';

const meta: Meta<typeof LuiForm> = {
  component: LuiForm,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/QCuwDQJUCZ7dfLbsmlSCZj/Basic-Page?node-id=3064-100577&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof LuiForm> = {
  args: {},
};
