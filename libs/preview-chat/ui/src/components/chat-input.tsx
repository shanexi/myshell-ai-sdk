import { ChatInputPluginSlot, cn } from '@myshell-run/common-ui';

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
        <ChatInputPluginSlot />
      </div>
    </div>
  );
};
