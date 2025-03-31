import type { Meta, StoryObj } from '@storybook/react';
import { Preview } from './mdx-msg';

const meta: Meta<typeof Preview> = {
  component: Preview,
};
export default meta;

export const Reply: StoryObj<typeof Preview> = {
  parameters: {},
  args: {
    source: `
      This is some content.
      <Demo />
    `,
  },
};
