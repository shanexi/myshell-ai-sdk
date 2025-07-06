import { cn, HiddenInputFile } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { ArrowUp, CirclePlus, Mic, RotateCw } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { ChatInputModel } from './chat-input.model';
// import { ReactComponent as Brush } from './brush.svg';

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
        <RotateCw
          strokeWidth={1.5}
          size={22}
          className={cn(
            'cursor-pointer text-CCr-icon-button-plain-fg_default-v2',
            'mr-[3px]', // 视觉微调
          )}
          onClick={() => model.clear()}
        />
        <div
          className={cn(
            'mx-spacing-xs-v2 border border-Cr-Bg-neutral-on-surface-active-v2',
            'h-[16px] w-[1px]',
            'scale-x-75', // 粗细视觉微调
          )}
        ></div>
        <HiddenInputFile uppyModel={model.uppy}>
          <CirclePlus
            strokeWidth={1.5}
            size={22}
            className="cursor-pointer text-CCr-icon-button-plain-fg_default-v2"
          />
        </HiddenInputFile>
      </div>
      {model.showSendButton ? (
        <div
          onClick={() => model.sendText()}
          className={cn(
            'h-[28px] w-[28px]',
            'bg-CCr-button-primary-bg_default-v2',
            'rounded-C-button-md-radius-v2',
            'flex items-center justify-center',
            'cursor-pointer',
          )}
        >
          <ArrowUp strokeWidth={1.5} className="text-Cr-Fg-bolder-v2" />
        </div>
      ) : (
        <Mic strokeWidth={1.5} size={28} className="cursor-pointer p-[3px]" />
      )}
    </div>
  );
});
