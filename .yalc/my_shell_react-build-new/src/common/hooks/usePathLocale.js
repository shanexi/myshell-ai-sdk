import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { defaultLocale } from '../../lib/config.js';
function splitPathFromPathname(pathname) {
    return pathname.split('/');
}
export const useIsMobile = () => {
    const pathname = usePathname() || '';
    return pathname.includes('/m/');
};
export const usePathLocale = () => {
    const pathname = usePathname() || '';
    const pathLocale = useMemo(() => {
        const allCookies = typeof document !== 'undefined' ? document.cookie : '';
        const localeMatch = allCookies.match(/(^|;\s*)NEXT_LOCALE=([^;]+)/);
        const locale = (localeMatch && localeMatch?.[2]) || 'en';
        return {
            defaultLocale,
            locale,
            pathname,
            isMobile: pathname.includes('/m/')
        };
    }, [pathname]);
    return pathLocale;
};
