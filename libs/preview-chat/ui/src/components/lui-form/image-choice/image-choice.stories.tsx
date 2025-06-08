import type { Meta, StoryObj } from '@storybook/react';
import { ImageChoice } from './image-choice';

const meta: Meta<typeof ImageChoice> = {
  component: ImageChoice,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=19487-424961&m=dev',
    },
  },
};
export default meta;

export const Default: StoryObj<typeof ImageChoice> = {
  args: {},
};
