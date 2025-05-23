import { ChatInputPlugin } from '@myshell-run/common-def';
import { cn } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';

export const ChatInput = () => {
  const plugins = useInjection<ChatInputPlugin[]>(ChatInputPlugin);
  return (
    <div className={cn('px-spacing-xl-v2 py-spacing-sm-v2')}>
      <div
        className={cn(
          'rounded-lg-v2 border border-CCr-input-border-light-v2',
          'bg-CCr-input-bg_default-light-v2',
          'p-spacing-xs-v2',
        )}
      >
        {plugins.map((Plugin, index) => {
          return <Plugin key={index} />;
        })}
      </div>
    </div>
  );
};
