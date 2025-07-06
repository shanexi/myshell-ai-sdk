import { cn } from '@myshell-run/common-ui';
import { observer } from 'mobx-react-lite';
import TextareaAutosize from 'react-textarea-autosize';
import { useAgentChatInputModel } from '../chat-input-model-factory';
import { AgentChatInputPluginProps } from './agent-chat-input-plugin-slot';

export const ChatInputTextareaPlugin = observer<AgentChatInputPluginProps>(
  ({ messageId }) => {
    const model = useAgentChatInputModel(messageId);
    return (
      <TextareaAutosize
        className={cn(
          'my-spacing-xs-v2 w-full resize-none !px-spacing-sm-v2 outline-none',
        )}
        maxRows={8}
        placeholder="Write a message"
        value={model.edix.inputText}
        onChange={(e) => {
          model.edix.setInputText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            e.preventDefault();
            model.sendText();
          }
        }}
      />
    );
  },
);
