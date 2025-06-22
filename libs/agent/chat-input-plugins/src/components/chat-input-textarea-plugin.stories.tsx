import type { Meta, StoryObj } from '@storybook/react';
import { Provider as InversifyProvider } from 'inversify-react';
import { ChatInputTextareaPlugin } from './chat-input-textarea-plugin';
import { container } from './stories.utils';

const meta: Meta<typeof ChatInputTextareaPlugin> = {
  component: ChatInputTextareaPlugin,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof ChatInputTextareaPlugin> = {
  args: {},
};
