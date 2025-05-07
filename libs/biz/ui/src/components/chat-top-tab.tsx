import { cn } from '@myshell-run/ui-primitives';

export function ChatTopTab() {
  return (
    <div
      role="tablist"
      className="tabs w-fit tabs-box rounded-full-v1 border border-border-default-light-v1 bg-surface-container-default-light-v1"
    >
      <Tab label="Chats" active />
      <Tab label="Gallery" active={false} />
    </div>
  );
}

export function Tab(props: { label: string; active: boolean }) {
  const { label, active } = props;
  return (
    <a
      role="tab"
      className={cn(
        'text-text-subtler tab !rounded-full px-[12px] py-[10px]',
        active &&
          'tab-active text-surface-primary-default-light-v1 !shadow-[0px_1px_2px_0px_rgba(0,0,0,0.10)]',
      )}
    >
      <div className="text-sm-medium w-[74px]">{label}</div>
    </a>
  );
}
