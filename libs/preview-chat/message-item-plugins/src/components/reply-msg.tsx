import { RemarkMsg } from '@myshell-run/common-ui';
import { AgentMessage } from '../types';

export const ReplyMsg: React.FC<AgentMessage> = (props) => {
  const { text } = props;
  return (
    <div className="prose px-spacing-xl-v2 py-spacing-lg-v2 dark:prose-invert">
      <RemarkMsg text={text} />
    </div>
  );
};
