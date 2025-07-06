import { cn } from '@myshell-run/common-ui';
import { observer } from 'mobx-react-lite';
import TextareaAutosize from 'react-textarea-autosize';
import {
  NO_MESSAGE_ID_AGENT_CHAT_INPUT,
  useAgentChatInputModel,
} from '../chat-input-model-factory';

export const ChatInputTextareaPlugin = observer(() => {
  const model = useAgentChatInputModel(NO_MESSAGE_ID_AGENT_CHAT_INPUT);
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
});
