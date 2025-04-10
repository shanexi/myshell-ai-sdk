import type { Meta, StoryObj } from '@storybook/react';
import { ChatTextarea } from './chat-input-re';
import { Container } from 'inversify';
import { messageItemPluginsModule } from '@myshell-run/message-item-plugins';
import { uiBizModule } from '../ui-biz.module';
import { InversifyProvider } from '@myshell-run/ui-primitives';
import { useState } from 'react';

const container = new Container();
container.load(messageItemPluginsModule);
container.load(uiBizModule);

// Example usage
const Demo: React.FC = () => {
  const [text, setText] = useState('');

  return (
    <div style={{ height: '200px', width: '300px', border: '1px solid #ccc' }}>
      <ChatTextarea
        value={text}
        onChange={setText}
        placeholder="Type something..."
      />
    </div>
  );
};

const meta: Meta<typeof Demo> = {
  component: Demo,
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

export const Primary: StoryObj<typeof Demo> = {
  args: {},
};
