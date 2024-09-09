import { useLayoutEffect, useCallback } from 'react';
import { usePathLocale } from '../../common/hooks/usePathLocale.js';
export const useRestoreScrollPosition = (scrollRef, isScrollTop, scollPathName) => {
    const { isMobile, pathname } = usePathLocale();
    const name = scollPathName !== undefined ? scollPathName : pathname;
    useLayoutEffect(() => {
        if (scrollRef.current && (isMobile || isScrollTop)) {
            try {
                const pos = Number(sessionStorage.getItem(`scrollPos:${name}`));
                scrollRef.current.scrollTo(0, pos);
            }
            catch (error) {
                console.error(error);
            }
        }
    }, [isMobile, pathname]);
};
export const useMemoScrollPosition = (scrollRef, scollPathName) => {
    const { pathname } = usePathLocale();
    const name = scollPathName !== undefined ? scollPathName : pathname;
    const memoScrollPosition = useCallback((id) => {
        try {
            let ele = null;
            if (id && typeof id === 'string') {
                ele = window.document.getElementById(id);
            }
            else if (scrollRef) {
                ele = scrollRef.current;
            }
            if (ele) {
                sessionStorage.setItem(`scrollPos:${name}`, String(ele?.scrollTop || '0'));
            }
        }
        catch (error) {
            console.error(error);
        }
    }, [pathname]);
    return memoScrollPosition;
};
