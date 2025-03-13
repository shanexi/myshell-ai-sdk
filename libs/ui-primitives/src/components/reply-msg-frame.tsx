export const ReplyMsgFrame = (props: {
  children: React.ReactNode;
  button?: React.ReactNode;
}) => {
  const { children, button } = props;
  return (
    <div className="flex pb-8">
      <img
        className="mr-[8px] h-[32px] w-[32px] rounded-lg"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      />
      <div className="w-[80%]">
        <div className="rounded-tl-[2px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] bg-surface-default-light p-4 text-text-default-light">
          {children}
        </div>
        {button && <div className="mt-[8px]">{button}</div>}
      </div>
    </div>
  );
};
