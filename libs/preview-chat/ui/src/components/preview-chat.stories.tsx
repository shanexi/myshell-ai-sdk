import { commonUIModule } from '@myshell-run/common-ui';
import { previewChatInputPluginsModule } from '@myshell-run/preview-chat-input-plugins';
import { previewChatMsgItemPluginsModule } from '@myshell-run/preview-chat-message-plugins';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { Provider as InversifyProvider } from 'inversify-react';
import { previewChatUIModule } from '../preview-chat-ui.module';
import { Chat } from './chat';
import { UploadEndpoint } from '@myshell-run/common-def';

const container = new Container();
container.load(commonUIModule);
container.load(previewChatUIModule);
container.load(previewChatInputPluginsModule);
container.load(previewChatMsgItemPluginsModule);
container
  .bind(UploadEndpoint)
  .toConstantValue('http://localhost:3333/api/upload');

const meta: Meta<typeof Chat> = {
  component: Chat,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

export const Primary: StoryObj<typeof Chat> = {
  args: {},
};
