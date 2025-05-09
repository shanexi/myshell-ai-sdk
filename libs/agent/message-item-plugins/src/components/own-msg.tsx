import { Message } from '@myshell-run/common-def';
import { cn } from '@myshell-run/common-ui';

export const OwnMessage = (props: Message) => {
  return (
    <div className="flex px-spacing-xl-v2 py-spacing-lg-v2">
      <div
        className={cn(
          'rounded-tl-components-bubble-radius-v2 rounded-tr-sm-v2 rounded-br-components-bubble-radius-v2 rounded-bl-components-bubble-radius-v2',
          'ml-auto max-w-[80%] p-spacing-lg-v2',
          'bg-colors-background-normal-secondary-default-light-v2 text-colors-text-default-light-v2',
          'text-lg-regular',
        )}
      >
        {props.text}
      </div>
    </div>
  );
};
