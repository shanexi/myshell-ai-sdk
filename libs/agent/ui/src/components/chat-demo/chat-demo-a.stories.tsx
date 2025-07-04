import type { Meta, StoryObj } from '@storybook/react';
import { ChatDemoA } from './chat-demo-a';
import { Provider as InversifyProvider } from 'inversify-react';
import { container } from '../stories.utils';

const meta: Meta<typeof ChatDemoA> = {
  component: ChatDemoA,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof ChatDemoA> = {
  args: {},
};
