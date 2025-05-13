import { Message } from '@myshell-run/common-def';
import { RemarkMsg } from '@myshell-run/common-ui';

export const ReplyMsg: React.FC<Message> = (props) => {
  const { text } = props;
  return (
    <div className="px-spacing-xl-v2 py-spacing-lg-v2">
      <RemarkMsg text={text} />
    </div>
  );
};
