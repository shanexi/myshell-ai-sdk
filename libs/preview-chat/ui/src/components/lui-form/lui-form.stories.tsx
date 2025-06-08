import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { Provider as InversifyProvider } from 'inversify-react';
import { previewChatUIModule } from '../../preview-chat-ui.module';
import { LuiForm } from './lui-form';
import { commonUIModule } from '@myshell-run/common-ui';
import { demo_jsonschema, demo_uischema } from './__storybook__/demo_form';

const container = new Container();
container.load(previewChatUIModule);
container.load(commonUIModule);

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
    uischema: demo_uischema,
    jsonschema: demo_jsonschema,
  },
};
