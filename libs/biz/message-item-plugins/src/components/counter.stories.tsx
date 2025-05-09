import type { Meta, StoryObj } from '@storybook/react';
import { Timer } from './executing-msg';
import { bizMsgItemPluginsModule } from '../biz-msg-item-plugins.module';
import { Container } from 'inversify';
import { InversifyProvider } from '@myshell-run/common-ui';

const container = new Container();
container.load(bizMsgItemPluginsModule);

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
