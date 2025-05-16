import { cn } from '@myshell-run/common-ui';
import { ChatInputContextPlugin } from './chat-input/chat-input-context-plugin';
import { ChatInputUploadPlugin } from './chat-input/chat-input-upload-plugin';
import { ChatInputTextareaPlugin } from './chat-input/chat-input-textarea-plugin';
import { ChatInputActionPlugin } from './chat-input/chat-input-action-plugin';

export const ChatInput = () => {
  return (
    <div className={cn('px-spacing-xl-v2 py-spacing-sm-v2')}>
      <div
        className={cn(
          'rounded-lg-v2 border border-CCr-input-border-light-v2',
          'bg-CCr-input-bg_default-light-v2',
          'p-spacing-xs-v2',
        )}
      >
        <ChatInputContextPlugin />
        <ChatInputUploadPlugin />
        <ChatInputTextareaPlugin />
        <ChatInputActionPlugin />
      </div>
    </div>
  );
};
