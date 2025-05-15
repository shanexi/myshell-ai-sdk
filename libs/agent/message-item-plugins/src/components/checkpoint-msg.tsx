import { cn } from '@myshell-run/common-ui';
import { History, RotateCw } from 'lucide-react';

export const Checkpoint = () => {
  return (
    <div
      className={cn(
        'border border-colors-border-default-light-v2',
        'bg-colors-background-normal-secondary-alt-light-v2',
        'px-spacing-lg-v2 py-spacing-md-v2',
        'rounded-md-v2',
        'flex gap-spacing-xs-v2',
        'relative',
      )}
    >
      <div className="flex h-[20px] items-center">
        <History
          strokeWidth={1.5}
          size={16}
          className="text-colors-foreground-subtle-light-v2"
        />
      </div>
      <div>
        <div className="text-sm-medium text-colors-text-default-light-v2">
          Add chatbot functionality
        </div>
        <div className="text-sm-regular text-colors-text-subtler-light-v2">
          Checkpoint
        </div>
      </div>
      <div
        className={cn(
          'flex items-center gap-components-button-sm-spacing-v2',
          'absolute right-0 bottom-0 translate-1',
          'border border-component-colors-button-solid-border-light-v2',
          'px-components-button-sm-padding-v2',
          'h-components-button-sm-height-v2',
          'min-w-components-button-sm-min-width-v2',
          'rounded-components-button-sm-radius-v2',
          'bg-component-colors-button-solid-bg_default-light-v2',
        )}
      >
        <RotateCw
          strokeWidth={1.5}
          size={16}
          className="text-component-colors-button-tertiary-fg_default-light-v2"
        />
        <span className="text-sm-medium text-component-colors-button-solid-fg_default-light-v2">
          Restore
        </span>
      </div>
    </div>
  );
};
