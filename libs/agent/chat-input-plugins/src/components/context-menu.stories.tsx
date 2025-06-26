import type { Meta, StoryObj } from '@storybook/react';
import { Provider as InversifyProvider } from 'inversify-react';
import { ContextMenu } from './context-menu';
import { container } from './stories.utils';

const meta: Meta<typeof ContextMenu> = {
  component: ContextMenu,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof ContextMenu> = {
  args: {},
};
