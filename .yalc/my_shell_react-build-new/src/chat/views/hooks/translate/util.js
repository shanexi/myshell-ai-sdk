"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeaders = exports.LangMap = void 0;
const identityService_1 = require("../../../../common/services/identityService.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const defaultVisitorId_1 = require("../../../../common/utils/defaultVisitorId.js");
exports.LangMap = {
    en: 'en',
    zh: 'zh-CN',
    'zh-tw': 'zh-TW',
    es: 'es',
    jp: 'ja',
    ru: 'ru',
    ko: 'ko'
};
const getHeaders = async () => {
    const token = identityService_1.identityService.getToken();
    const language = identityService_1.identityService.getLanguage() || 'en';
    const commonHeaders = {
        platform: 'web',
        version: '1.0.0',
        'Accept-Language': exports.LangMap[language]
    };
    if (token && !!token.trim()) {
        return {
            Authorization: `Bearer ${token}`,
            ...commonHeaders
        };
    }
    const nanoAnonymousId = (0, defaultVisitorId_1.defaultVisitorId)();
    let visitorId;
    const randomVisitorId = ((0, common_helper_1.isClient)() && identityService_1.identityService.getRandomVisitorId()) ?? '';
    if (randomVisitorId) {
        visitorId = randomVisitorId;
    }
    else {
        visitorId = (0, common_helper_1.generateUUID)();
    }
    let scDeviceId = identityService_1.identityService.getSCDeviceId();
    if (!scDeviceId) {
        const anonymousId = identityService_1.identityService.getAnonymousId();
        if (anonymousId) {
            scDeviceId = anonymousId;
        }
        else {
            identityService_1.identityService.setAnonymousId(nanoAnonymousId);
            scDeviceId = nanoAnonymousId;
        }
        return {
            'Visitor-Id': visitorId,
            'sc-device-id': scDeviceId,
            ...commonHeaders
        };
    }
    return {
        'Visitor-Id': visitorId,
        'sc-cookie-id': scDeviceId,
        ...commonHeaders
    };
};
exports.getHeaders = getHeaders;
