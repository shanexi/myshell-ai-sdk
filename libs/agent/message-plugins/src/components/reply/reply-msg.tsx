import { cn, RemarkMsg } from '@myshell-run/common-ui';
import { reply_message_schema } from '../../types';
import { z } from 'zod';
import { PropsWithChildren } from 'react';

export const ReplyMsg: React.FC<z.infer<typeof reply_message_schema>> = (
  props,
) => {
  const { text } = props;
  return (
    <ReplyWrapper className="prose">
      <RemarkMsg text={text} />
    </ReplyWrapper>
  );
};

export const ReplyWrapper: React.FC<
  PropsWithChildren<{ className?: string }>
> = ({ children, className }) => (
  <div className={cn('px-spacing-xl-v2 py-spacing-lg-v2', className)}>
    <div
      className={cn(
        'p-spacing-lg-v2',
        'rounded-tl-sm-v2 rounded-tr-C-bubble-radius-v2 rounded-br-C-bubble-radius-v2 rounded-bl-C-bubble-radius-v2',
        // 'transition-colors duration-200 hover:bg-Cr-Bg-normal-secondary-default-light-v2',
      )}
    >
      {children}
    </div>
  </div>
);
