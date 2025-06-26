import { cn } from '@myshell-run/common-ui';
import { z } from 'zod';
import { own_message_schema } from '../../types';

export const OwnMessage: React.FC<z.infer<typeof own_message_schema>> = ({
  text,
}) => {
  return (
    <div className="flex px-spacing-xl-v2 py-spacing-lg-v2">
      <div
        className={cn(
          'rounded-tl-C-bubble-radius-v2 rounded-tr-sm-v2 rounded-br-C-bubble-radius-v2 rounded-bl-C-bubble-radius-v2',
          'ml-auto max-w-[80%] p-spacing-lg-v2',
          'bg-Cr-Bg-normal-secondary-default-light-v2 text-Cr-text-default-light-v2',
          'text-lg-regular',
          'whitespace-pre-wrap',
        )}
      >
        {text}
      </div>
    </div>
  );
};
