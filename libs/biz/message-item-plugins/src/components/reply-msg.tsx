import { DEFAULT_AVATAR, Message } from '@myshell-run/common-def';
import { RemarkMsg } from '@myshell-run/common-ui';

export const ReplyMsg: React.FC<Message> = ({
  avatar = DEFAULT_AVATAR,
  text,
  user,
}) => {
  return (
    <div className="flex pb-8 pl-[8px]">
      <img
        className="mr-[8px] h-[32px] w-[32px] rounded-lg-v1"
        src={avatar}
        alt={`${user} avatar`}
      />
      <div className="w-[80%]">
        <div className="rounded-tl-[2px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] bg-surface-container-default-light-v1 p-4 text-text-default-light-v1">
          <RemarkMsg text={text} />
        </div>
      </div>
    </div>
  );
};
