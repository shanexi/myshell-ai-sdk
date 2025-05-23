import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './chat-input';
import { container } from './stories.utils';

const meta: Meta<typeof ChatInput> = {
  component: ChatInput,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YHfVjepmkzvSL4Yf1nD9KS/Shell-Agent?node-id=1408-77922&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof ChatInput> = {
  args: {},
};
