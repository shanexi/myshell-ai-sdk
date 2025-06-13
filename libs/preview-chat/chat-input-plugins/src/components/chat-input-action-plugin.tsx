import { cn, HiddenInputFile } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { ArrowUp, BrushCleaning, CirclePlus, Mic } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { ChatInputModel } from './chat-input.model';

export const ChatInputActionPlugin = observer(() => {
  const model = useInjection(ChatInputModel);
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        // 'my-spacing-xs-v2'
      )}
    >
      <div className="flex items-center">
        <BrushCleaning
          onClick={() => model.clear()}
          strokeWidth={1.5}
          size={22}
          className="cursor-pointer p-[7px]"
        />

        <HiddenInputFile uppyModel={model.chatCommon.uppyModel}>
          <CirclePlus
            strokeWidth={1.5}
            size={22}
            className="cursor-pointer text-CCr-icon-button-plain-fg_default-light-v2"
          />
        </HiddenInputFile>
      </div>
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
        <Mic strokeWidth={1.5} size={22} className="cursor-pointer p-[7px]" />
      )}
    </div>
  );
});
