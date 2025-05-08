import { cn } from '@myshell-run/ui-primitives';

export const ChatInput = () => {
  return (
    <div className={cn('px-spacing-xl-v2 py-spacing-sm-v2')}>
      <div
        className={cn(
          'rounded-lg-v2 border border-component-colors-input-border-light-v2',
          'bg-component-colors-input-bg_default-light-v2',
          'p-spacing-md-v2',
        )}
      >
        Chat Input
      </div>
    </div>
  );
};
