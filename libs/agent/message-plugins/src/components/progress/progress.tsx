import { cn } from '@myshell-run/common-ui';
import { z } from 'zod';
import { progress_message_schema } from '../../types';
import { ReplyWrapper } from '../reply/reply-msg';

export const Progress: React.FC<z.infer<typeof progress_message_schema>> = ({
  args,
}) => {
  const { progress, text } = args;
  if (progress === 100) return <span></span>;
  return (
    <ReplyWrapper>
      <div
        className={cn(
          'flex flex-col',
          // 'gap-[8px]',
          'bg-Cr-Bg-normal-secondary-alt-light-v2',
          'border border-Cr-border-default-light-v2',
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
