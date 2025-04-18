import { cn } from '@myshell-run/ui-primitives';
import { forwardRef, PropsWithChildren, useImperativeHandle } from 'react';
import { useTransitionState } from 'react-transition-state';

export interface MyMotionRef {
  toggle: (toEnter?: boolean) => void;
}

export const MyMotion = forwardRef<
  MyMotionRef,
  PropsWithChildren<{
    /**
     * debug 模式下，去掉动画，直接显示
     */
    debug?: boolean;
    className: string;
    from: string;
    to: string;
    timeout?: number;
  }>
>(({ children, debug = false, className, from, to, timeout = 400 }, ref) => {
  const [{ status, isMounted }, toggle] = useTransitionState({
    timeout,
    mountOnEnter: true,
    unmountOnExit: true,
    preEnter: true,
  });

  useImperativeHandle(ref, () => ({
    toggle,
  }));

  if (!isMounted && !debug) return null;

  return (
    <div
      // 这里用 inline style 是为了和 useTransitionState.timeout 保持一致
      style={{
        transitionDuration: `${timeout}ms`,
      }}
      className={cn(
        className,
        debug
          ? {}
          : {
              [from]:
                status === 'preEnter' ||
                status === 'unmounted' ||
                status === 'exiting',
              [to]: status === 'entering' || status === 'entered',
            },
      )}
    >
      {children}
    </div>
  );
});
