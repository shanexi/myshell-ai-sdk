import { cn } from '../utils';

export function ChatTopTab() {
  return (
    <div role="tablist" className="tabs w-fit tabs-box rounded-full">
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
        active && 'tab-active text-surface-primary-default-light',
      )}
    >
      <div className="text-sm-medium w-[74px]">{label}</div>
    </a>
  );
}
