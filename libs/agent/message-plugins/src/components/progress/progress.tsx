import { cn } from '@myshell-run/common-ui';
import { z } from 'zod';
import { ReplyWrapper } from '../reply/reply-msg';

export const PROGRESS_MESSAGE_TYPE = 'chat_progress_message';

export const progress_message_schema = z.object({
  type: z.literal(PROGRESS_MESSAGE_TYPE),
  message_id: z.string(),
  args: z.object({
    progress: z.number(),
    text: z.string(),
  }),
});

export const Progress: React.FC<z.infer<typeof progress_message_schema>> = ({
  args,
}) => {
  // 在 sotrybook hmr 会出现 args undef
  if (!args) return <span></span>;

  const { progress, text } = args;
  if (progress === 100) return <span></span>;
  return (
    <ReplyWrapper>
      <div
        className={cn(
          'flex flex-col',
          // 'gap-[8px]',
          'bg-Cr-Bg-normal-secondary-alt-v2',
          'border border-Cr-border-default-v2',
          'p-spacing-lg-v2',
          'rounded-md-v2',
        )}
      >
        {text}
        <progress
          className="progress mt-spacing-md-v2 h-[6px] w-full progress-neutral"
          value={progress}
          max="100"
        ></progress>
      </div>
    </ReplyWrapper>
  );
};
