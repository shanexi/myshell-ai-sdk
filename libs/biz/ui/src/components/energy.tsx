import { ReactComponent as Zap } from './zap.svg';

/* eslint-disable-next-line */
export interface UiProps {}

export function Energy(props: UiProps) {
  return (
    <div className="flex items-center">
      <div className="border-surface-lemon-default-light-v1 bg-surface-default-light-v1 rounded-md-v1 border p-[1.81px]">
        <Zap />
      </div>
      <div className="border-surface-lemon-default-light-v1 bg-linear-[90deg,var(--color-surface-lemon-default-light)_32%,var(--color-surface-lemon-subtle-light)_32%,var(--color-surface-lemon-subtle-light)] relative left-[-1px] -z-10 inline-flex h-5 items-center justify-center gap-2.5 overflow-hidden rounded-r-md-v1 border-b border-r border-t px-2.5 py-2.5">
        <div className="font-['Mona Sans'] text-surface-lemon-bold-light-v1 text-center text-xs font-medium leading-none">
          32/100
        </div>
      </div>
    </div>
  );
}
