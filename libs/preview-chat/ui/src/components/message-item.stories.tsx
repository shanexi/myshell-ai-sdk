import { commonUIModule, MessageItem, setupMdc } from '@myshell-run/common-ui';
import {
  OWN_MESSAGE_TYPE,
  previewChatMsgItemPluginsModule,
  REPLY_MESSAGE_TYPE,
} from '@myshell-run/preview-chat-message-item-plugins';
import type { Meta, StoryObj } from '@storybook/react';
import { Container, ContainerModule } from 'inversify';
import { Provider as InversifyProvider } from 'inversify-react';
import { previewChatUIModule } from '../preview-chat-ui.module';

const container = new Container();
container.load(previewChatMsgItemPluginsModule);
container.load(previewChatUIModule);
container.load(commonUIModule);
const mod = new ContainerModule((bind, unbind, isBound, rebind) => {
  const register = setupMdc(bind, unbind, isBound, rebind);
});
container.load(mod);

const meta: Meta<typeof MessageItem> = {
  component: MessageItem,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof MessageItem> = {
  args: {
    data: {
      key: '1',
      text: 'Hello, how are you?',
      type: OWN_MESSAGE_TYPE,
    },
  },
};

export const Reply: StoryObj<typeof MessageItem> = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=14522-121105&m=dev',
    },
  },
  args: {
    data: {
      key: '2',
      text: 'I am fine, thank you!',
      type: REPLY_MESSAGE_TYPE,
    },
  },
};
