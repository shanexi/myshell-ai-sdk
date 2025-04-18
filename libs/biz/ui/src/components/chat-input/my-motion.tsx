import { cn } from '@myshell-run/ui-primitives';
import { forwardRef, PropsWithChildren, useImperativeHandle } from 'react';
import { useTransitionState } from 'react-transition-state';

// 这个 6px 是 parent element 比 children elements (目前只有textarea) 多出的 6px
// 原因不明
const UNKNOWN_6px = '6px';

export interface MyMotionRef {
  toggle: (toEnter?: boolean) => void;
}

export const MyMotion = forwardRef<MyMotionRef, PropsWithChildren>(
  ({ children }, ref) => {
    const timeout = 400;
    const [{ status, isMounted }, toggle] = useTransitionState({
      timeout,
      mountOnEnter: true,
      unmountOnExit: true,
      preEnter: true,
    });

    useImperativeHandle(ref, () => ({
      toggle,
    }));

    if (!isMounted) return null;

    return (
      <div
        style={{
          transitionDuration: `${timeout}ms`,
        }}
        className={cn(
          `absolute w-full px-2 transition-[translate,opacity] ease-in-out`,
          'top-0',
          {
            'opacity-0':
              status === 'preEnter' ||
              status === 'unmounted' ||
              status === 'exiting',
            [`-translate-y-[calc(100%-${UNKNOWN_6px})]`]:
              status === 'entering' || status === 'entered',
          },
        )}
      >
        {children}
      </div>
    );
  },
);
