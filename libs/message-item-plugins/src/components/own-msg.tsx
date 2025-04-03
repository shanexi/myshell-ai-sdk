import { Message } from '@myshell-run/def';

export const OwnMessage = (props: Message) => {
  return (
    <div className="flex pr-[8px] pb-8">
      <div className="ml-auto max-w-[80%] rounded-tl-[16px] rounded-tr-[2px] rounded-br-[16px] rounded-bl-[16px] bg-surface-primary-subtle-default-light p-4 text-text-brand-light">
        {props.text}
      </div>
    </div>
  );
};
