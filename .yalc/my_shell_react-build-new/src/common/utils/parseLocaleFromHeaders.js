"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLocaleFromHeaders = void 0;
const parseLocaleFromHeaders = (headersParam) => {
    const acceptLanguage = headersParam.get('accept-language');
    if (!acceptLanguage || acceptLanguage === '*') {
        return undefined;
    }
    const p = acceptLanguage.indexOf('-');
    if (p === -1) {
        return undefined;
    }
    const locale = acceptLanguage.substring(0, p);
    if (!locale) {
        return undefined;
    }
    return locale;
};
exports.parseLocaleFromHeaders = parseLocaleFromHeaders;
