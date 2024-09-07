"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePathLocale = exports.useIsMobile = void 0;
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const config_1 = require("../../lib/config.js");
function splitPathFromPathname(pathname) {
    return pathname.split('/');
}
const useIsMobile = () => {
    const pathname = (0, navigation_1.usePathname)() || '';
    return pathname.includes('/m/');
};
exports.useIsMobile = useIsMobile;
const usePathLocale = () => {
    const pathname = (0, navigation_1.usePathname)() || '';
    const pathLocale = (0, react_1.useMemo)(() => {
        const allCookies = typeof document !== 'undefined' ? document.cookie : '';
        const localeMatch = allCookies.match(/(^|;\s*)NEXT_LOCALE=([^;]+)/);
        const locale = (localeMatch && localeMatch?.[2]) || 'en';
        return {
            defaultLocale: config_1.defaultLocale,
            locale,
            pathname,
            isMobile: pathname.includes('/m/')
        };
    }, [pathname]);
    return pathLocale;
};
exports.usePathLocale = usePathLocale;
