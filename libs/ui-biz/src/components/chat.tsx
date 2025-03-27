export function ChatRoot(props: { children?: React.ReactNode }) {
  const { children } = props;
  return (
    // 不能依赖 100vh 因为 100vh 会受到浏览器地址栏的影响
    <div className="flex h-full flex-col bg-surface-default-light">
      {children}
    </div>
  );
}

export function ChatFoot(props: { children?: React.ReactNode }) {
  const { children } = props;
  return (
    <div className="flex-none border-t-[0.5px] border-border-default-light">
      {children}
    </div>
  );
}
