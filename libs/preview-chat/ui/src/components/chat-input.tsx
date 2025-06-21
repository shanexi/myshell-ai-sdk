import { cn } from '@myshell-run/common-ui';
import { PreviewChatInputPluginSlot } from '@myshell-run/preview-chat-input-plugins';

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
        <PreviewChatInputPluginSlot />
      </div>
    </div>
  );
};
