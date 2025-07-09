import { cn, HiddenInputFile } from '@myshell-run/common-ui';
import { ArrowUp, CirclePlus, Mic } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useAgentChatInputModel } from '../chat-input-model-factory';
import { AgentChatInputPluginProps } from './agent-chat-input-plugin-slot';

export const ChatInputActionPlugin = observer<AgentChatInputPluginProps>(
  ({ messageId }) => {
    const model = useAgentChatInputModel(messageId);
    if (model.isMessage)
      return (
        <div
          className={cn(
            'flex items-center justify-between',
            'border-t border-t-Cr-border-default-v2',
            'text-sm-regular',
            'px-spacing-md-v2 pt-spacing-md-v2 pb-spacing-xs-v2',
          )}
        >
          {/* <span>Generating</span> */}
          <span></span>
          <span
            className={cn(
              'text-Cr-text-subtler-v2 hover:text-Cr-text-default-v2',
              'cursor-pointer',
            )}
          >
            Restore checkpoint
          </span>
        </div>
      );

    return (
      <div
        className={cn('flex items-center justify-between', 'px-spacing-sm-v2')}
      >
        <HiddenInputFile uppyModel={model.uppy}>
          <CirclePlus
            strokeWidth={1.5}
            size={22}
            className="cursor-pointer text-CCr-icon-button-plain-fg_default-v2"
          />
        </HiddenInputFile>
        {model.loading ? (
          <div className="loader"></div>
        ) : model.canSend ? (
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
          // <Mic
          //   strokeWidth={1.5}
          //   size={28}
          //   className="cursor-pointer p-[3px] text-CCr-icon-button-plain-fg_default-v2"
          // />
          <div
            className={cn(
              'h-[28px] w-[28px]',
              'bg-CCr-button-brand-bg_disabled-v2',
              'rounded-C-button-md-radius-v2',
              'flex items-center justify-center',
              'cursor-not-allowed',
            )}
          >
            <ArrowUp strokeWidth={1.5} className="text-Cr-Fg-bolder-v2" />
          </div>
        )}
      </div>
    );
  },
);

ChatInputActionPlugin.displayName = 'ChatInputActionPlugin';
