export const ReplyMsgFrame = (props: {
  children: React.ReactNode;
  button?: React.ReactNode;
  avatar?: React.ReactNode;
}) => {
  const { children, button, avatar } = props;
  return (
    <div className="flex pb-8 pl-[8px]">
      {avatar}
      <div className="w-[80%]">
        <div className="rounded-tl-[2px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] bg-surface-container-default-light p-4 text-text-default-light">
          {children}
        </div>
        {button && <div className="mt-[8px]">{button}</div>}
      </div>
    </div>
  );
};
