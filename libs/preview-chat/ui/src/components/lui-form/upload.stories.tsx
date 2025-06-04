import type { Meta, StoryObj } from '@storybook/react';
import { Upload } from './upload';
import { Provider } from 'inversify-react';
import { commonUIModule } from '@myshell-run/common-ui';
import { Container } from 'inversify';
import { previewChatUIModule } from '../../preview-chat-ui.module';
import { UploadModel } from './upload.model';

const container = new Container();
container.load(commonUIModule);
container.load(previewChatUIModule);
const meta: Meta<typeof Upload> = {
  component: Upload,
  decorators: [
    (Story) => (
      <Provider container={container}>
        <Story />
      </Provider>
    ),
  ],
};
export default meta;

export const Primary: StoryObj<typeof Upload> = {
  args: {
    model: container.get(UploadModel),
  },
};
