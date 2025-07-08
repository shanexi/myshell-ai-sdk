import { cn } from '@myshell-run/common-ui';
import { CircleAlert } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

export const ERROR_MESSAGE_TYPE = 'error_message';

export const error_message_schema = z.object({
  type: z.literal(ERROR_MESSAGE_TYPE),
  message_id: z.number(),
  headers: z.object({}).passthrough(),
  args: z.object({
    content: z.string(),
  }),
});

export const ErrorMessage: React.FC<z.infer<typeof error_message_schema>> = (
  props,
) => {
  const [copied, setCopied] = useState(false);

  const handleCopyFeedback = async () => {
    const feedbackText = `ShellAgent - Error Report
${new Date().toLocaleString()}

Issue: ${props.args.content}

Technical Details:
\`\`\`json
${JSON.stringify(props, null, 2)}
\`\`\`
This information can help the team look into the problem.`;

    try {
      await navigator.clipboard.writeText(feedbackText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div
      className={cn(
        'flex justify-between px-spacing-xl-v2 py-spacing-lg-v2',
        'w-full',
        'rounded-lg-v2 px-spacing-xl-v2 py-spacing-lg-v2',
        'bg-CCr-chat-tips-bg_error-v2',
        'border border-CCr-chat-tips-border_error-v2',
      )}
    >
      <div className="flex items-center">
        <CircleAlert
          size={20}
          className="mr-spacing-md-v2 text-CCr-chat-tips-fg_error-v2"
        />
        <div className={cn('text-sm-medium', 'whitespace-pre-wrap')}>
          {props.args.content}
        </div>
      </div>
      <button
        onClick={handleCopyFeedback}
        className={cn(
          'cursor-pointer',
          'text-sm-medium',
          'rounded-C-button-sm-radius-v2',
          'px-C-button-sm-padding-v2',
          'py-[2px]', // 手动补齐
          'bg-CCr-button-error-primary-bg_default-v2 hover:bg-CCr-button-error-primary-bg_active-v2',
          'hover:text-CCr-button-error-primary-fg_active-v2 text-CCr-button-error-primary-fg_default-v2',
        )}
      >
        {copied ? 'Copied' : 'Feedback'}
      </button>
    </div>
  );
};
