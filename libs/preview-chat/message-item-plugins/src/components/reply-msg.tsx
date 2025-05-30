import { DEFAULT_AVATAR } from '@myshell-run/common-def';
import { RemarkMsg } from '@myshell-run/common-ui';
import { AgentMessage } from '../types';

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
      <div className="max-w-[321px] min-w-[140px]">
        <div className="text-text-default-light-v2 rounded-tl-sm-v2 rounded-tr-C-bubble-radius-v2 rounded-br-C-bubble-radius-v2 rounded-bl-C-bubble-radius-v2 bg-CCr-button-tertiary-bg_default-light-v2 p-spacing-lg-v2">
          <RemarkMsg text={text} />
        </div>
      </div>
    </div>
  );
};
