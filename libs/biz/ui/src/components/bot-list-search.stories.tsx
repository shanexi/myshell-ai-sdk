import { Meta, StoryObj } from '@storybook/react';
import { BotListSearch } from './bot-list-search';
import { InversifyProvider } from '@myshell-run/common-ui';
import { uiBizModule } from '../ui-biz.module';
import { messageItemPluginsModule } from '@myshell-run/biz-message-item-plugins';
import { Container } from 'inversify';
import { MyAppTrpcClient } from '@myshell-run/biz-def';
import { TRPCClient } from '@trpc/client';
import { AppRouter } from '@myshell-run/biz-service';

const container = new Container();
container.load(messageItemPluginsModule);
container.load(uiBizModule);
container
  .bind<TRPCClient<AppRouter>>(MyAppTrpcClient)
  .toConstantValue({} as TRPCClient<AppRouter>);

const meta: Meta<typeof BotListSearch> = {
  component: BotListSearch,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof BotListSearch> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=14002-78921&m=dev',
    },
  },
  args: {},
};
