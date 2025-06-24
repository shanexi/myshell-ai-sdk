import { cn, RemarkMsg } from '@myshell-run/common-ui';
import { AgentMessage } from '../types';

export const ReplyMsg: React.FC<AgentMessage> = (props) => {
  const { text } = props;
  return (
    <div
      className={cn(
        'prose',
        'dark:prose-invert',
        'px-spacing-xl-v2 py-spacing-lg-v2',
      )}
    >
      <div
        className={cn(
          'p-spacing-lg-v2',
          'rounded-tl-sm-v2 rounded-tr-C-bubble-radius-v2 rounded-br-C-bubble-radius-v2 rounded-bl-C-bubble-radius-v2',
          'transition-colors duration-200 hover:bg-Cr-Bg-normal-secondary-default-light-v2',
        )}
      >
        <RemarkMsg text={text} />
      </div>
    </div>
  );
};
