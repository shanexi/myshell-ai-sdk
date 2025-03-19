export function ChatRoot(props: { children?: React.ReactNode }) {
  const { children } = props;
  return (
    <div className="flex h-screen flex-col bg-surface-container-default-light">
      {children}
    </div>
  );
}

export function ChatFoot(props: { children?: React.ReactNode }) {
  const { children } = props;
  return (
    <div className="mb-[34px] flex-none border-t-[0.5px] border-border-default-light">
      {children}
    </div>
  );
}
