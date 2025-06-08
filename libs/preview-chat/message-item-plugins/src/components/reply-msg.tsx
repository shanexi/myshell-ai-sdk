import { DEFAULT_AVATAR } from '@myshell-run/common-def';
import { RemarkMsg } from '@myshell-run/common-ui';
import { AgentMessage } from '../types';
import { MessageItemHandlers } from './message-item-handlers';
import { useInjection } from 'inversify-react';
import { MessageItemModel } from './message-item.model';

export const ReplyMsg: React.FC<AgentMessage> = ({
  avatar = DEFAULT_AVATAR,
  text,
  user,
}) => {
  return (
    <div className="flex pb-8 pl-[8px]">
      <img
        className="mr-spacing-sm-v2 h-[32px] w-[32px] rounded-default-v2"
        src={avatar}
        alt={`${user} avatar`}
      />
      <div className="w-[80%]">
        <div className="text-text-default-light-v2 rounded-tl-sm-v2 rounded-tr-C-bubble-radius-v2 rounded-br-C-bubble-radius-v2 rounded-bl-C-bubble-radius-v2 bg-CCr-button-tertiary-bg_default-light-v2 p-spacing-lg-v2">
          <RemarkMsg text={text} />
        </div>
        <div className="gap-spacing-xs mt-[8px] flex justify-between">
          <LuiButton>🪄 Upscale (Subtle)</LuiButton>
          <LuiButton>💥 Upscale (Creative)</LuiButton>
        </div>
      </div>
    </div>
  );
};

// legacy v1 先跑通全联路再 refactor
export const LuiButton = (props: { children: React.ReactNode }) => {
  const model = useInjection(MessageItemModel);
  const { children } = props;
  return (
    <button
      onClick={() => {
        model.click('file://id');
      }}
      className="text-sm-medium mx-spacing-xs-v1 flex h-components-button-lg-height-v1 flex-auto items-center justify-center rounded-lg-v1 border border-border-default-light-v1 bg-surface-default-light-v1 p-spacing-lg-v1"
    >
      {children}
    </button>
  );
};
