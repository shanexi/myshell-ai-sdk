"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIFetch = exports.wsBaseURL = exports.baseURL = exports.LangMap = void 0;
const useNotification_1 = require("../../common/hooks/useNotification.js");
const identityService_1 = require("../../common/services/identityService.js");
const common_helper_1 = require("../../common/utils/common-helper.js");
const computeChecksum1226_1 = require("../../common/utils/computeChecksum1226.js");
const defaultVisitorId_1 = require("../../common/utils/defaultVisitorId.js");
const parseLocaleFromHeaders_1 = require("../../common/utils/parseLocaleFromHeaders.js");
const modal_1 = require("../../services/store/modal.js");
const constants_1 = require("../../common/constants/constants.js");
const EventEmitter_1 = __importDefault(require("../../common/utils/EventEmitter.js"));
const initNeteaseVisitorId_1 = require("../../common/utils/initNeteaseVisitorId.js");
const runtime_config_1 = require("../../common/utils/runtime-config.js");
const CfMitigatedHandler_1 = __importDefault(require("./CfMitigatedHandler.js"));
exports.LangMap = {
    en: 'en',
    zh: 'zh-CN',
    'zh-tw': 'zh-TW',
    es: 'es',
    jp: 'ja',
    ru: 'ru',
    ko: 'ko'
};
exports.baseURL = `${runtime_config_1.API_URL}`;
exports.wsBaseURL = `${runtime_config_1.WS_API_URL}`;
const handleError = async (err, config) => {
    let msg = 'request.error.common';
    let translateInToast = true;
    if (err?.status === 401) {
        EventEmitter_1.default.dispatch('Unauthorized', null);
    }
    if (err?.data) {
        const { data } = err;
        if (data?.message) {
            if (Array.isArray(data.message)) {
                msg = data.message.join('; ');
            }
            else {
                msg = data.message;
            }
            translateInToast = false;
        }
        else {
            msg = 'request.error.common';
        }
    }
    if (config?.popupError) {
        if (!(0, common_helper_1.isString)(msg)) {
            msg = 'request.error.common';
        }
        const { Message } = await Promise.resolve().then(() => __importStar(require('../../common/hooks/useNotification.js')));
        Message.error({ content: msg, id: msg, translateInToast });
    }
};
const handleFetch = async (url, request) => {
    const urlBody = request?.production ? `https://api.myshell.ai${url}` : `${exports.baseURL}${url}`;
    const requestUrl = request?.params ? `${urlBody}${request.params}` : `${urlBody}`;
    const { body, adapter, isGoLang, hideErrorToast, withMyShellSecurityToken, allowAnonymous, timeout, serverContext, ...rest } = request;
    const requestBody = body ? (body instanceof FormData ? { body } : { body: JSON.stringify(body) }) : {};
    const headers = {
        ...(request?.headers
            ? request.headers
            : request?.body && request.body instanceof FormData
                ? {}
                : { 'Content-Type': 'application/json' })
    };
    if (isGoLang) {
        headers['myshell-service-name'] = 'organics-api';
    }
    if (typeof window !== 'undefined' && !allowAnonymous) {
        const token = identityService_1.identityService.getToken();
        if (token && token.trim()) {
            headers.Authorization = `Bearer ${token}`;
        }
        else {
            const nanoAnonymousId = (0, defaultVisitorId_1.defaultVisitorId)();
            let visitorId;
            const randomVisitorId = ((0, common_helper_1.isClient)() && identityService_1.identityService.getRandomVisitorId()) ?? '';
            if (randomVisitorId) {
                visitorId = randomVisitorId;
            }
            else {
                visitorId = (0, common_helper_1.generateUUID)();
            }
            if (visitorId && visitorId.trim()) {
                headers['visitor-id'] = visitorId;
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
                headers['sc-device-id'] = scDeviceId;
            }
            else if (scDeviceId && scDeviceId.trim()) {
                headers['sc-cookie-id'] = scDeviceId;
            }
        }
    }
    if (typeof window !== 'undefined' && withMyShellSecurityToken) {
        try {
            const neteaseEngineToken = await (0, initNeteaseVisitorId_1.getNeteaseRequestToken)();
            headers['myshell-security-token'] = neteaseEngineToken;
        }
        catch (e) {
        }
    }
    headers.platform = 'web';
    headers.version = '1.0.0';
    const lang = (typeof window !== 'undefined'
        ? identityService_1.identityService.getLanguage()
        : serverContext?.locale || (0, parseLocaleFromHeaders_1.parseLocaleFromHeaders)(serverContext.headers)) || 'en';
    headers['Accept-Language'] = exports.LangMap[lang];
    if (typeof window === 'undefined') {
        headers['x-call-from'] = 'myshell-ssr';
        if (!headers.Authorization) {
            const token = serverContext?.cookies?.get('token')?.value;
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
        }
        if (!headers.Authorization) {
            if (!headers['sc-device-id']) {
                headers['sc-device-id'] = 'node-server';
            }
            if (!headers['visitor-id']) {
                headers['visitor-id'] = 'node-server';
            }
        }
    }
    headers['myshell-client-version'] = 'v1.6.4';
    headers.timestamp = (0, computeChecksum1226_1.computeChecksum1226)(new Date().getTime());
    const delay = timeout || (typeof window !== 'undefined' ? 15000 : 5000);
    const controller = new AbortController();
    const finalSignal = request?.signal || (delay ? controller.signal : undefined);
    let response;
    try {
        if (delay) {
            setTimeout(() => controller.abort(), delay);
        }
        response = await fetch(requestUrl, {
            ...requestBody,
            ...rest,
            headers,
            credentials: 'include',
            signal: finalSignal,
            cache: 'no-store'
        });
        const contentType = response.headers.get('content-type');
        const contentDisposition = response.headers.get('content-disposition');
        const result = contentType && (contentType.indexOf('application/json') !== -1 || contentType.indexOf('text/plain') !== -1)
            ? await response.json()
            : contentDisposition?.indexOf('attachment') !== -1
                ? await response.blob()
                : response;
        if (response.status >= 200 && response.status < 300) {
            if (typeof window !== 'undefined') {
                const token = identityService_1.identityService.getToken();
                const resToken = response.headers.get('refreshed-auth-token');
                if (resToken && resToken !== token) {
                    identityService_1.identityService.setToken(resToken);
                }
            }
            const data = typeof adapter === 'function' ? adapter(result, { lang }) : result;
            return { success: true, data };
        }
        if (response.status === 400 && result.reason === 'ERROR_REASON_SAFETY_NEED_VERIFY_CAPTCHA') {
            await new Promise(resolve => (0, modal_1.openModal)({ open: true, onOk: () => resolve(), triggerScene: constants_1.CaptchaTriggerMap[url] }));
            return await handleFetch(url, request);
        }
        if (response.status === 400 && !hideErrorToast) {
            useNotification_1.Message.error({
                content: result.message,
                translateInToast: true,
                id: 'request-400'
            });
            throw { status: response.status, data: { ...result, reason: 'request-400' }, message: result.message };
        }
        else {
            if (response.status === 429) {
                useNotification_1.Message.error({
                    content: 'request.error.rateLimit',
                    translateInToast: true,
                    id: 'request-429'
                });
            }
            if (response.status === 403) {
                const cfMitigated = response.headers.get('cf-mitigated');
                (0, CfMitigatedHandler_1.default)(cfMitigated);
            }
            throw { status: response.status, data: result };
        }
    }
    catch (error) {
        const err = JSON.stringify({
            url: requestUrl,
            message: error?.message ? error?.message : error,
            requestId: response?.headers?.get('X-Request-Id'),
            headers
        });
        console.error(err);
        if (typeof window !== 'undefined') {
            handleError(error, { url: requestUrl, ...request });
        }
        let msg = error?.message || error;
        if (error?.data) {
            if (Array.isArray(error?.data.message)) {
                msg = error.data.message.join('; ');
            }
            else {
                msg = error.data.message;
            }
        }
        return {
            success: false,
            msg,
            reason: error?.data?.reason || error?.data?.message,
            metadata: error?.data?.metadata
        };
    }
};
exports.APIFetch = {
    get: async (url, request) => {
        return handleFetch(url, { ...request, method: 'GET' });
    },
    post: async (url, request) => {
        return handleFetch(url, { ...request, method: 'POST' });
    },
    put: async (url, request) => {
        return handleFetch(url, { ...request, method: 'PUT' });
    },
    patch: async (url, request) => {
        return handleFetch(url, { ...request, method: 'PATCH' });
    },
    delete: async (url, request) => {
        return handleFetch(url, { ...request, method: 'DELETE' });
    }
};
