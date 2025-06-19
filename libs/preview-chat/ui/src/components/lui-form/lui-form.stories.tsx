import {
  commonUIModule,
  demo_jsonschema,
  demo_uischema,
} from '@myshell-run/common-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { Provider as InversifyProvider } from 'inversify-react';
import { previewChatUIModule } from '../../preview-chat-ui.module';
import { PreviewChatModel } from '../preview-chat-model';
import { LuiForm } from './lui-form';
import { json_schema, UploadEndpoint } from '@myshell-run/common-def';
import { z } from 'zod';

const container = new Container();
container.load(previewChatUIModule);
container.load(commonUIModule);
container
  .bind(UploadEndpoint)
  .toConstantValue('http://localhost:3333/api/upload');

const previewChatModel = container.get(PreviewChatModel);

const meta: Meta<typeof LuiForm> = {
  component: LuiForm,
  decorators: [
    (Story) => (
      <InversifyProvider container={container}>
        <Story />
      </InversifyProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/QCuwDQJUCZ7dfLbsmlSCZj/Basic-Page?node-id=3064-100577&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof LuiForm> = {
  args: {
    model: previewChatModel.luiFormModel,
    uischema: demo_uischema,
    jsonschema: demo_jsonschema as unknown as z.infer<typeof json_schema>,
  },
};
