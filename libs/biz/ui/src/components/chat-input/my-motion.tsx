import { cn } from '@myshell-run/ui-primitives';
import {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
} from 'react';
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
    debug?: 'from' | 'to';
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

  useEffect(() => {
    if (debug) {
      console.log('[DEBUG] motion class', clz);
    }
  }, []);

  if (!isMounted && !debug) return null;

  const clz = cn(
    className,
    {
      [from]: debug === 'from' ? from : undefined,
      [to]: debug === 'to' ? to : undefined,
    },
    debug
      ? {}
      : {
          [from]: ['preEnter', 'unmounted', 'exiting'].includes(status),
          [to]: ['entering', 'entered'].includes(status),
        },
  );

  return (
    <div
      // 这里用 inline style 是为了和 useTransitionState.timeout 保持一致
      style={{
        transitionDuration: `${timeout}ms`,
      }}
      className={clz}
    >
      {children}
    </div>
  );
});
