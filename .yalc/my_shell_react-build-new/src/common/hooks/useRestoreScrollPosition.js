"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMemoScrollPosition = exports.useRestoreScrollPosition = void 0;
const react_1 = require("react");
const usePathLocale_1 = require("../../common/hooks/usePathLocale");
const useRestoreScrollPosition = (scrollRef, isScrollTop, scollPathName) => {
    const { isMobile, pathname } = (0, usePathLocale_1.usePathLocale)();
    const name = scollPathName !== undefined ? scollPathName : pathname;
    (0, react_1.useLayoutEffect)(() => {
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
exports.useRestoreScrollPosition = useRestoreScrollPosition;
const useMemoScrollPosition = (scrollRef, scollPathName) => {
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const name = scollPathName !== undefined ? scollPathName : pathname;
    const memoScrollPosition = (0, react_1.useCallback)((id) => {
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
exports.useMemoScrollPosition = useMemoScrollPosition;
