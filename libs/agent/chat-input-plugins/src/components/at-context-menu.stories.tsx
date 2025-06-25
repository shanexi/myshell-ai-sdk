import type { Meta, StoryObj } from '@storybook/react';
import { Provider as InversifyProvider } from 'inversify-react';
import { AtContextMenu, items } from './at-context-menu';
import { container } from './stories.utils';

const meta: Meta<typeof AtContextMenu> = {
  component: AtContextMenu,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof AtContextMenu> = {
  args: {
    items: items,
  },
};
