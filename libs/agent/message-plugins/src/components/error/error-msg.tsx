import { cn } from '@myshell-run/common-ui';
import { CircleAlert } from 'lucide-react';
import { z } from 'zod';
import { error_message_schema } from '../../types';

export const ErrorMessage: React.FC<z.infer<typeof error_message_schema>> = ({
  args,
}) => {
  const { content } = args;
  return (
    <div
      className={cn(
        'flex px-spacing-xl-v2 py-spacing-lg-v2',
        'w-full',
        'rounded-lg-v2 px-spacing-xl-v2 py-spacing-lg-v2',
        'bg-CCr-chat-tips-bg_error-v2',
        'border border-CCr-chat-tips-border_error-v2',
      )}
    >
      <CircleAlert
        size={20}
        className="mr-spacing-md-v2 text-CCr-chat-tips-fg_error-v2"
      />
      <div className={cn('text-sm-medium', 'whitespace-pre-wrap')}>
        {content}
      </div>
    </div>
  );
};
