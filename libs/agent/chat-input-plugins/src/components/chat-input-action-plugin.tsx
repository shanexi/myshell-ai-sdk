import { cn, HiddenInputFile } from '@myshell-run/common-ui';
import { ArrowUp, CirclePlus, Mic } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useAgentChatInputModel } from '../chat-input-model-factory';
import { AgentChatInputPluginProps } from './agent-chat-input-plugin-slot';

export const ChatInputActionPlugin = observer<AgentChatInputPluginProps>(
  (props) => {
    const model = useAgentChatInputModel(props.messageId);
    return (
      <div className={cn('flex items-center justify-between')}>
        <HiddenInputFile uppyModel={model.uppy}>
          <CirclePlus
            strokeWidth={1.5}
            size={22}
            className="cursor-pointer text-CCr-icon-button-plain-fg_default-v2"
          />
        </HiddenInputFile>
        {model.canSend ? (
          <div
            onClick={() => model.sendChatInputDoc()}
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
          <div className="tooltip" data-tip="Coming soon">
            <Mic
              strokeWidth={1.5}
              size={28}
              className="cursor-pointer p-[3px] text-CCr-icon-button-plain-fg_default-v2"
            />
          </div>
        )}
      </div>
    );
  },
);
