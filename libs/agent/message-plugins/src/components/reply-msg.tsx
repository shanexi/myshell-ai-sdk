import { cn, RemarkMsg } from '@myshell-run/common-ui';
import { AgentMessage } from '../types';

export const ReplyMsg: React.FC<AgentMessage> = (props) => {
  const { text } = props;
  return (
    <div
      className={cn(
        'prose px-spacing-xl-v2 py-spacing-lg-v2 dark:prose-invert',
        // AI 添加的 hover
        'transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50',
      )}
    >
      <RemarkMsg text={text} />
    </div>
  );
};
