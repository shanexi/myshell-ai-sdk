import { cn } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import TextareaAutosize from 'react-textarea-autosize';
import { ChatInputModel } from './chat-input.model';

export const ChatInputTextareaPlugin = observer(() => {
  const model = useInjection(ChatInputModel);
  return (
    <TextareaAutosize
      className={cn(
        'my-spacing-xs-v2 w-full resize-none !px-spacing-sm-v2 outline-none',
      )}
      maxRows={8}
      placeholder="Write a message"
      value={model.chatCommon.inputText}
      onChange={(e) => {
        model.chatCommon.setInputText(e.target.value);
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
