import { Message } from './reply-message';

export const OwnMessage = (props: Message) => {
  return (
    <div className="flex pb-8">
      <div className="bg-surface-primary-subtle-default-light text-text-brand-light ml-auto max-w-[80%] rounded-bl-[16px] rounded-br-[16px] rounded-tl-[16px] rounded-tr-[2px] p-4">
        {props.text}
      </div>
    </div>
  );
};
