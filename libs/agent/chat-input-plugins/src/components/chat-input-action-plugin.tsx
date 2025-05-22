import { cn } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { ArrowUp, CirclePlus, Mic, BrushCleaning } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { ChatInputActionPluginModel } from './chat-input-action-plugin.model';

export const ChatInputActionPlugin = observer(() => {
  const model = useInjection(ChatInputActionPluginModel);
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        // 'my-spacing-xs-v2'
      )}
    >
      <BrushCleaning
        onClick={() => model.clear()}
        strokeWidth={1.5}
        size={36}
        className="cursor-pointer p-[7px]"
      />
      {model.showSendButton ? (
        <div
          onClick={() => model.sendText()}
          className={cn(
            'h-[28px] w-[28px]',
            'bg-CCr-button-primary-bg_default-light-v2',
            'rounded-C-button-md-radius-v2',
            'flex items-center justify-center',
            'cursor-pointer',
          )}
        >
          <ArrowUp strokeWidth={1.5} className="text-Cr-Fg-bolder-light-v2" />
        </div>
      ) : (
        <Mic strokeWidth={1.5} size={36} className="cursor-pointer p-[7px]" />
      )}
    </div>
  );
});
