import { type VirtuosoMessageListProps } from '@virtuoso.dev/message-list';

export interface Message {
  key: string;
  text: string;
  user: 'me' | 'other';
}

export const MessageItem: VirtuosoMessageListProps<
  Message,
  null
>['ItemContent'] = (props) => {
  const { data } = props;
  const ownMessage = data.user === 'me';
  if (ownMessage) return <OwnMessageItem {...data} />;
  return <ReplyMessageItem {...data} />;
};

export const OwnMessageItem = (props: Message) => {
  return (
    <div className="flex pb-8">
      <div className="ml-auto max-w-[80%] rounded-tl-[16px] rounded-tr-[2px] rounded-br-[16px] rounded-bl-[16px] bg-surface-primary-subtle-default-light p-4 text-text-brand-light">
        {props.text}
      </div>
    </div>
  );
};

export const ReplyMessageItem = (props: Message) => {
  return (
    <div className="flex pb-8">
      <img
        className="mr-[8px] h-[32px] w-[32px] rounded-lg"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      />
      <div className="w-[80%]">
        <div className="rounded-tl-[2px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] bg-surface-default-light p-4 text-text-default-light">
          {props.text}
        </div>
        <div className="mt-[8px]">
          <div className="-mx-spacing-xs flex justify-between">
            <LuiButton>🪄 Upscale (Subtle)</LuiButton>
            <LuiButton>💥 Upscale (Creative)</LuiButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LuiButton = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <button className="text-sm-medium mx-spacing-xs flex h-components-button-lg-height flex-auto items-center justify-center rounded-lg border border-border-default-light bg-surface-default-light p-spacing-lg">
      {children}
    </button>
  );
};
