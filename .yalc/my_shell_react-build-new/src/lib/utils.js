"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = cn;
exports.getAlternatesMap = getAlternatesMap;
exports.limitStringLength = limitStringLength;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
function getAlternatesMap(pathname, isMobile) {
    const defaultUrl = `https://app.myshell.ai/${pathname}`;
    return {
        canonical: defaultUrl,
        media: {
            'only screen and (max-width: 768px)': `https://app.myshell.ai/m/${pathname}`
        }
    };
}
function limitStringLength(str, limit) {
    if (str.length > limit) {
        return str.substring(0, limit) + '...';
    }
    else {
        return str;
    }
}
