import { Provider as InversifyProvider } from 'inversify-react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './chat-input';
import { container } from './stories.utils';
import { AgentChatInputPlugin } from '@myshell-run/agent-chat-input-plugins';
import {
  ChatInputTextareaPlugin,
  ChatInputActionPlugin,
} from '@myshell-run/agent-chat-input-plugins';
import { useEffect } from 'react';

const meta: Meta<typeof ChatInput> = {
  component: ChatInput,
  decorators: [
    (Story) => {
      container.snapshot();
      container
        .rebind<AgentChatInputPlugin[]>(AgentChatInputPlugin)
        .toConstantValue([ChatInputTextareaPlugin, ChatInputActionPlugin]);

      useEffect(() => {
        return () => {
          container.restore();
        };
      }, []);

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
      url: 'https://www.figma.com/design/YHfVjepmkzvSL4Yf1nD9KS/Shell-Agent?node-id=1408-77922&m=dev',
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof ChatInput> = {
  args: {},
};
