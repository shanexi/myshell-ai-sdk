import { RefObject, useEffect } from 'react';

/**
 * 监听 ref 的第一个子元素的高度变化
 * FIXME: 为什么是第一个元素，是因为包的子元素是 absolute, 这个是 ugly 方案
 */
export function useFirstChildHeight(
  ref: RefObject<HTMLElement>,
  onResize: (height: number) => void,
) {
  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;
    if (ref.current) {
      resizeObserver = new ResizeObserver(() => {
        const height =
          ref.current?.firstElementChild?.getBoundingClientRect().height ?? 0;
        onResize(height);
      });

      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver?.disconnect();
    };
  }, [ref, onResize]);
}
