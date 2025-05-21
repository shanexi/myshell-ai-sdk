import { cn } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import TextareaAutosize from 'react-textarea-autosize';
import { ChatInputTextareaPluginModel } from './chat-input-textarea-plugin.model';

export const ChatInputTextareaPlugin = observer(() => {
  const model = useInjection(ChatInputTextareaPluginModel);
  return (
    <TextareaAutosize
      className={cn(
        'my-spacing-xs-v2 w-full resize-none !px-spacing-sm-v2 outline-none',
      )}
      maxRows={8}
      placeholder="Write a message"
      value={model.inputText}
      onChange={(e) => {
        model.setInputText(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          model.sendText();
        }
      }}
    />
  );
});
