import { bizMsgItemPluginsModule } from '@myshell-run/biz-message-item-plugins';
import {
  commonUIModule,
  InversifyProvider,
  useInjection,
} from '@myshell-run/common-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from 'inversify';
import { ChatModel } from '../chat.model';
import { observer } from 'mobx-react-lite';
import { ChatTextarea } from './chat-textarea';
import { uiBizModule } from '../../ui-biz.module';

const container = new Container();
container.load(bizMsgItemPluginsModule);
container.load(uiBizModule);
container.load(commonUIModule);
const model = container.get(ChatModel);

const ChatInput = observer(() => {
  const model = useInjection(ChatModel);

  return (
    <div className="h-[200px]">
      <ChatTextarea
        placeholder="Write a message..."
        value={model.inputText}
        onChange={model.setInputText}
      />
    </div>
  );
});

model.setInputText(
  'useFloating() only calculates the position once on render, or when the reference/floating elements changed. Depending on the context in which the floating element lives, you may need to update its position in an Effect.',
);

const meta: Meta<typeof ChatInput> = {
  component: ChatInput,
  decorators: [
    (Story) => {
      return (
        <InversifyProvider container={container}>
          <Story />
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
  args: {},
};
