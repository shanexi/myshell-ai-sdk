import type { Meta, StoryObj } from '@storybook/react';
import { Timer } from './executing-msg';
import { messageItemPluginsModule } from '../message-item-plugins.module';
import { Container } from 'inversify';
import { InversifyProvider } from '@myshell-run/ui-primitives';

const container = new Container();
container.load(messageItemPluginsModule);

const meta: Meta<typeof Timer> = {
  component: Timer,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof Timer> = {
  args: {},
};
