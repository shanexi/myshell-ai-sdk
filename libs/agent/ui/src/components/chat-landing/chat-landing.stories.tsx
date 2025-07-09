import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { container } from '../stories.utils';
import { ChatLanding } from './chat-landing';

const meta: Meta<typeof ChatLanding> = {
  component: ChatLanding,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof ChatLanding> = {
  args: {},
};
