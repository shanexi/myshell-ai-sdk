import type { Meta, StoryObj } from '@storybook/react';
import { LuiForm } from './lui-form';

const meta: Meta<typeof LuiForm> = {
  component: LuiForm,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=15138-112742&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof LuiForm> = {
  args: {},
};
