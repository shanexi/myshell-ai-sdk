import type { Meta, StoryObj } from '@storybook/react';
import { Provider as InversifyProvider } from 'inversify-react';
import { ChatInputStructuredInputPlugin } from './chat-input-structured-input-plugin';
import { container } from './stories.utils';

const meta: Meta<typeof ChatInputStructuredInputPlugin> = {
  component: ChatInputStructuredInputPlugin,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof ChatInputStructuredInputPlugin> = {
  args: {},
};
