import { cn } from '@myshell-run/common-ui';
import TextareaAutosize from 'react-textarea-autosize';
import { AtSign, CirclePlus, Mic } from 'lucide-react';

export const ChatInput = () => {
  return (
    <div className={cn('px-spacing-xl-v2 py-spacing-sm-v2')}>
      <div
        className={cn(
          'rounded-lg-v2 border border-component-colors-input-border-light-v2',
          'bg-component-colors-input-bg_default-light-v2',
          'p-spacing-xs-v2',
        )}
      >
        <TextareaAutosize
          className={cn(
            'my-spacing-xs-v2 w-full resize-none px-spacing-sm-v2 outline-none',
          )}
          maxRows={8}
          placeholder="Write a message"
        />
        <div className="flex items-center justify-between my-spacing-xs-v2">
          <div className="flex items-center gap-[2px]">
            <AtSign strokeWidth={1.5} size={36} className="p-[7px]" />
            <CirclePlus strokeWidth={1.5} size={36} className="p-[7px]" />
          </div>
          <Mic strokeWidth={1.5} size={36} className="p-[7px]" />
        </div>
      </div>
    </div>
  );
};
