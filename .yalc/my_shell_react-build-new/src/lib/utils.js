import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export function getAlternatesMap(pathname, isMobile) {
    const defaultUrl = `https://app.myshell.ai/${pathname}`;
    return {
        canonical: defaultUrl,
        media: {
            'only screen and (max-width: 768px)': `https://app.myshell.ai/m/${pathname}`
        }
    };
}
export function limitStringLength(str, limit) {
    if (str.length > limit) {
        return str.substring(0, limit) + '...';
    }
    else {
        return str;
    }
}
