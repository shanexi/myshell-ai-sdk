import { cn } from '@myshell-run/common-ui';
import { AgentMessage } from '../../types';
import { CircleAlert } from 'lucide-react';

export const ErrorMessage: React.FC<AgentMessage> = ({ text }) => {
  return (
    <div
      className={cn(
        'flex px-spacing-xl-v2 py-spacing-lg-v2',
        'w-full',
        'rounded-lg-v2 px-spacing-xl-v2 py-spacing-lg-v2',
        'bg-CCr-chat-tips-bg_error-light-v2',
        'border border-CCr-chat-tips-border_error-light-v2',
      )}
    >
      <CircleAlert
        size={20}
        className="mr-spacing-md-v2 text-CCr-chat-tips-fg_error-light-v2"
      />
      <div className={cn('text-sm-medium', 'whitespace-pre-wrap')}>{text}</div>
    </div>
  );
};
