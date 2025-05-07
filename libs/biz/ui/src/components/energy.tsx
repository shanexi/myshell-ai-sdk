import { ReactComponent as Zap } from './zap.svg';

/* eslint-disable-next-line */
export interface UiProps {}

export function Energy(props: UiProps) {
  return (
    <div className="flex items-center">
      <div className="rounded-md-v1 border border-surface-lemon-default-light-v1 bg-surface-default-light-v1 p-[1.81px]">
        <Zap />
      </div>
      <div className="relative left-[-1px] -z-10 inline-flex h-5 items-center justify-center gap-2.5 overflow-hidden rounded-r-md-v1 border-t border-r border-b border-surface-lemon-default-light-v1 bg-linear-[90deg,var(--color-surface-lemon-default-light-v1)_32%,var(--color-surface-lemon-subtle-light-v1)_32%,var(--color-surface-lemon-subtle-light-v1)] px-2.5 py-2.5">
        <div className="font-['Mona Sans'] text-center text-xs leading-none font-medium text-surface-lemon-bold-light-v1">
          32/100
        </div>
      </div>
    </div>
  );
}
