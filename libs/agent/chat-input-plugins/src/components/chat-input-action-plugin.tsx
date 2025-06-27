import { cn, HiddenInputFile } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { ArrowUp, CirclePlus, Mic } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { AgentChatInputModel } from './agent-chat-input.model';

export const ChatInputActionPlugin = observer(() => {
  const model = useInjection(AgentChatInputModel);
  return (
    <div className={cn('flex items-center justify-between')}>
      <HiddenInputFile uppyModel={model.chatCommon.uppyModel}>
        <CirclePlus
          strokeWidth={1.5}
          size={22}
          className="cursor-pointer text-CCr-icon-button-plain-fg_default-light-v2"
        />
      </HiddenInputFile>
      {model.canSend ? (
        <div
          onClick={() => model.sendChatInputDoc()}
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
        <div className="tooltip" data-tip="Coming soon">
          <Mic
            strokeWidth={1.5}
            size={28}
            className="cursor-pointer p-[3px] text-CCr-icon-button-plain-fg_default-light-v2"
          />
        </div>
      )}
    </div>
  );
});
