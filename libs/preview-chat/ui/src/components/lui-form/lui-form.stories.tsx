import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { Provider as InversifyProvider } from 'inversify-react';
import { previewChatUIModule } from '../../preview-chat-ui.module';
import { LuiForm } from './lui-form';
import { commonUIModule } from '@myshell-run/common-ui';

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
    jsonschema: {
      type: 'object',
      properties: {
        // selfie: {
        //   variant: 'object_image_upload',
        //   type: 'object',
        //   title: 'Selfie',
        //   properties: {
        //     url: {
        //       type: 'string',
        //     },
        //     title: {
        //       type: 'string',
        //     },
        //   },
        //   examples: [
        //     {
        //       url: 'a',
        //       title: '单人正脸',
        //     },
        //   ],
        // },
        // team_member: {
        //   variant: 'string_selector',
        //   type: 'string',
        //   title: 'Team member',
        //   enum: ['MyShell'],
        // },
        description: {
          variant: 'string_textarea',
          type: 'string',
          title: 'Description',
          // todo: placeholder 用 example？
        },
        title: {
          variant: 'object_image_upload',
          type: 'object',
          title: 'Title',
          description: 'This is a simple description.',
          properties: {
            title: {
              type: 'string',
            },
            url: {
              type: 'string',
            },
          },
        },
        style: {
          variant: 'object_image_choice',
          type: 'object',
          title: 'Style',
          properties: {
            name: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            url: {
              type: 'string',
            },
          },
          examples: [
            {
              name: 'a',
              title: 'A',
              url: 'http://a',
            },
          ],
        },
      },
    },
  },
};
