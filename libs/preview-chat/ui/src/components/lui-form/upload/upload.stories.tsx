import type { Meta, StoryObj } from '@storybook/react';
import { Upload, upload_schema } from './upload';
import { Provider } from 'inversify-react';
import { commonUIModule } from '@myshell-run/common-ui';
import { Container } from 'inversify';
import { previewChatUIModule } from '../../../preview-chat-ui.module';
import { UploadModel } from './upload.model';
import { z } from 'zod';

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
    ...({
      title: 'Selfie',
      type: 'array',
      maxItems: 1,
      items: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          file: {
            type: 'string',
            maxLength: 1024 * 10,
            enum: ['image/*', '.jpg', '.jpeg', '.png', '.gif'],
          },
        },
      },
      examples: [
        {
          url: 'a',
          title: '单人正脸',
        },
      ],
    } satisfies z.infer<typeof upload_schema>),
    model: container.get(UploadModel),
  },
};
