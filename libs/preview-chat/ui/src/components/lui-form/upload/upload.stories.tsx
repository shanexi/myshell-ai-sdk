import type { Meta, StoryObj } from '@storybook/react';
import { Upload } from './upload';
import { Provider } from 'inversify-react';
import { commonUIModule } from '@myshell-run/common-ui';
import { Container } from 'inversify';
import { previewChatUIModule } from '../../../preview-chat-ui.module';
import { upload_schema, UploadModel } from './upload.model';
import { z } from 'zod';
import { UploadEndpoint } from '@myshell-run/common-def';

const container = new Container();
container.load(commonUIModule);
container.load(previewChatUIModule);
container
  .bind(UploadEndpoint)
  .toConstantValue('http://localhost:3333/api/upload');

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
      description: 'Drop a file or click to upload',
      maxItems: 1,
      items: {
        type: 'object',
        properties: {
          file: {
            type: 'object',
            properties: {
              uploadURL: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              type: {
                type: 'string',
                enum: ['image/*', '.jpg', '.jpeg', '.png', '.gif'],
              },
              size: {
                type: 'number',
                maxLength: 1024 * 1024 * 10,
              },
            },
          },
        },
      },
      examples: [
        {
          file: {
            uploadURL: 'a',
            name: '单人正脸',
          },
        },
      ],
    } satisfies z.infer<typeof upload_schema>),
    model: container.get(UploadModel),
  },
};
