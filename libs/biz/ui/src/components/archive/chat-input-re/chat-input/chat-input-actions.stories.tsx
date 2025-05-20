import { bizMsgItemPluginsModule } from '@myshell-run/biz-message-item-plugins';
import { commonUIModule } from '@myshell-run/common-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { uiBizModule } from '../../../../ui-biz.module';
import { ChatModel } from '../../../chat.model';
import { ChatInputActions } from './chat-input-actions';
import { Provider as InversifyProvider } from 'inversify-react';

const container = new Container();
container.load(bizMsgItemPluginsModule);
container.load(uiBizModule);
container.load(commonUIModule);
const model = container.get(ChatModel);

model.setInputText(
  'useFloating() only calculates the position once on render, or when the reference/floating elements changed. Depending on the context in which the floating element lives, you may need to update its position in an Effect.',
);

const meta: Meta<typeof ChatInputActions> = {
  component: ChatInputActions,
  decorators: [
    (Story) => {
      return (
        <InversifyProvider container={container}>
          <div className="flex h-full flex-col justify-end pb-2">
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

export const Primary: StoryObj<typeof ChatInputActions> = {
  args: {
    placeholder: 'Write a message',
  },
};
