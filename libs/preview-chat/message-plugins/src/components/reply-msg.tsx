import { DEFAULT_AVATAR } from '@myshell-run/common-def';
import { cn, RemarkMsg } from '@myshell-run/common-ui';
import { PreviewMessage } from '../types';
import { useInjection } from 'inversify-react';
import { MessageItemModel } from './message-item.model';

export const ReplyMsg: React.FC<PreviewMessage> = ({
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
        <div className="mt-[8px] flex gap-spacing-xs-v2">
          <LuiButton>🪄 Upscale (Subtle)</LuiButton>
          <LuiButton>💥 Upscale (Creative)</LuiButton>
        </div>
      </div>
    </div>
  );
};

export const LuiButton = (props: { children: React.ReactNode }) => {
  const model = useInjection(MessageItemModel);
  const { children } = props;
  return (
    <button
      onClick={() => {
        model.click('file://id');
      }}
      className={cn(
        'h-C-button-lg-height-v2 min-w-C-button-md-min-width-v2',
        'rounded-C-button-md-radius-v2',
        'p-C-button-plain-spacing-v2',
        'bg-CCr-button-tertiary-bg_default-light-v2',
        'border border-CCr-button-tertiary-border-light-v2',
      )}
    >
      {children}
    </button>
  );
};
