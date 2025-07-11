import { cn, HiddenInputFile, UppyModel } from '@myshell-run/common-ui';
import { ArrowUp, CirclePlus, Mic as MicIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useAgentChatInputModel } from '../chat-input-model-factory';
import { AgentChatInputPluginProps } from './agent-chat-input-plugin-slot';
import { PropsWithChildren } from 'react';
import { Mic } from './mic';

export const ChatInputActionPlugin = observer<AgentChatInputPluginProps>(
  ({ messageId }) => {
    const model = useAgentChatInputModel(messageId);
    if (model.variant === 'message')
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
      <Wrapper>
        <UploadPlus uppy={model.uppy} />
        {
          model.loading ? (
            <div className="loader"></div>
          ) : model.canSend ? (
            <SendButton onClick={() => model.sendChatInputDoc()} />
          ) : model.listening ? (
            <div
              className={cn(
                'absolute cursor-pointer',
                'right-[2px]', // 微调
              )}
              onClick={() => model.setListening(false)}
            >
              <Mic volume={0} />
            </div>
          ) : (
            <MicIcon
              onClick={() => model.setListening(true)}
              strokeWidth={1.5}
              size={28}
              className="cursor-pointer p-[3px] text-CCr-icon-button-plain-fg_default-v2"
            />
          )
          // <NotAllowedSendButton />
        }
      </Wrapper>
    );
  },
);

ChatInputActionPlugin.displayName = 'ChatInputActionPlugin';

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        'px-spacing-md-v2',
        'pb-spacing-xs-v2',
        'relative',
      )}
    >
      {children}
    </div>
  );
};

export const UploadPlus: React.FC<{ uppy: UppyModel }> = ({ uppy }) => {
  return (
    <HiddenInputFile uppyModel={uppy}>
      <CirclePlus
        strokeWidth={1.5}
        size={22}
        className="cursor-pointer text-CCr-icon-button-plain-fg_default-v2"
      />
    </HiddenInputFile>
  );
};

export const SendButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
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
  );
};

export const NotAllowedSendButton = () => {
  return (
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
  );
};
