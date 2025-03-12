import { Message } from '@myshell-run/def';

export const ReplyMessage = (props: Message) => {
  return (
    <div className="flex pb-8">
      <img
        className="mr-[8px] h-[32px] w-[32px] rounded-lg"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      />
      <div className="w-[80%]">
        <div className="bg-surface-default-light text-text-default-light rounded-bl-[16px] rounded-br-[16px] rounded-tl-[2px] rounded-tr-[16px] p-4">
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
    <button className="text-sm-medium mx-spacing-xs h-components-button-lg-height border-border-default-light bg-surface-default-light p-spacing-lg flex flex-auto items-center justify-center rounded-lg border">
      {children}
    </button>
  );
};
