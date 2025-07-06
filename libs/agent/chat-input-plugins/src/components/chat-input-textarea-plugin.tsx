import { cn } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import TextareaAutosize from 'react-textarea-autosize';
import { AgentChatInputModel } from './agent-chat-input.model';

export const ChatInputTextareaPlugin = observer(() => {
  const model = useInjection(AgentChatInputModel);
  return (
    <TextareaAutosize
      className={cn(
        'my-spacing-xs-v2 w-full resize-none !px-spacing-sm-v2 outline-none',
      )}
      maxRows={8}
      placeholder="Write a message"
      value={model.chatCommon.edix.inputText}
      onChange={(e) => {
        model.chatCommon.edix.setInputText(e.target.value);
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
