import { Message } from '@myshell-run/common-def';
import { RemarkMsg } from '@myshell-run/common-ui';

export const ReplyMsg: React.FC<Message> = (props) => {
  const { text } = props;
  return (
    <div className="prose dark:prose-invert px-spacing-xl-v2 py-spacing-lg-v2">
      <RemarkMsg text={text} />
    </div>
  );
};
