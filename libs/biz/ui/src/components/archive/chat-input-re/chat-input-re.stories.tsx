import { messageItemPluginsModule } from '@myshell-run/biz-message-item-plugins';
import { InversifyProvider } from '@myshell-run/common-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { uiBizModule } from '../../../ui-biz.module';
import { ChatInput } from './chat-input-re';
import { ChatModel } from '../../chat.model';

const container = new Container();
container.load(messageItemPluginsModule);
container.load(uiBizModule);
const model = container.get(ChatModel);

model.setInputText(
  'useFloating() only calculates the position once on render, or when the reference/floating elements changed. Depending on the context in which the floating element lives, you may need to update its position in an Effect.',
);

const meta: Meta<typeof ChatInput> = {
  component: ChatInput,
  decorators: [
    (Story) => {
      return (
        <InversifyProvider container={container}>
          <div className="fixed h-full w-full">
            <button
              className="border border-red-500"
              onClick={() => model.toggleUploadArea()}
            >
              click me!
            </button>
            <Story />
          </div>
        </InversifyProvider>
      );
    },
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/PyibahIqkubOp9rSsHLa6K/Chat-Basic?node-id=16756-291206&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof ChatInput> = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    placeholder: 'Write a message',
  },
};
