import { Message } from '../../common/hooks/useNotification.js';
import { identityService } from '../../common/services/identityService.js';
import { generateUUID, isClient, isString } from '../../common/utils/common-helper.js';
import { computeChecksum1226 } from '../../common/utils/computeChecksum1226.js';
import { defaultVisitorId } from '../../common/utils/defaultVisitorId.js';
import { parseLocaleFromHeaders } from '../../common/utils/parseLocaleFromHeaders.js';
import { openModal } from '../../services/store/modal.js';
import { CaptchaTriggerMap } from '../../common/constants/constants.js';
import EventEmitter from '../../common/utils/EventEmitter.js';
import { getNeteaseRequestToken } from '../../common/utils/initNeteaseVisitorId.js';
import { API_URL, WS_API_URL } from '../../common/utils/runtime-config.js';
import CfMitigatedHandler from './CfMitigatedHandler.js';
export const LangMap = {
    en: 'en',
    zh: 'zh-CN',
    'zh-tw': 'zh-TW',
    es: 'es',
    jp: 'ja',
    ru: 'ru',
    ko: 'ko'
};
export const baseURL = `${API_URL}`;
export const wsBaseURL = `${WS_API_URL}`;
const handleError = async (err, config) => {
    let msg = 'request.error.common';
    let translateInToast = true;
    if (err?.status === 401) {
        EventEmitter.dispatch('Unauthorized', null);
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
        if (!isString(msg)) {
            msg = 'request.error.common';
        }
        const { Message } = await import('../../common/hooks/useNotification.js');
        Message.error({ content: msg, id: msg, translateInToast });
    }
};
const handleFetch = async (url, request) => {
    const urlBody = request?.production ? `https://api.myshell.ai${url}` : `${baseURL}${url}`;
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
        const token = identityService.getToken();
        if (token && token.trim()) {
            headers.Authorization = `Bearer ${token}`;
        }
        else {
            const nanoAnonymousId = defaultVisitorId();
            let visitorId;
            const randomVisitorId = (isClient() && identityService.getRandomVisitorId()) ?? '';
            if (randomVisitorId) {
                visitorId = randomVisitorId;
            }
            else {
                visitorId = generateUUID();
            }
            if (visitorId && visitorId.trim()) {
                headers['visitor-id'] = visitorId;
            }
            let scDeviceId = identityService.getSCDeviceId();
            if (!scDeviceId) {
                const anonymousId = identityService.getAnonymousId();
                if (anonymousId) {
                    scDeviceId = anonymousId;
                }
                else {
                    identityService.setAnonymousId(nanoAnonymousId);
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
            const neteaseEngineToken = await getNeteaseRequestToken();
            headers['myshell-security-token'] = neteaseEngineToken;
        }
        catch (e) {
        }
    }
    headers.platform = 'web';
    headers.version = '1.0.0';
    const lang = (typeof window !== 'undefined'
        ? identityService.getLanguage()
        : serverContext?.locale || parseLocaleFromHeaders(serverContext.headers)) || 'en';
    headers['Accept-Language'] = LangMap[lang];
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
    headers.timestamp = computeChecksum1226(new Date().getTime());
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
                const token = identityService.getToken();
                const resToken = response.headers.get('refreshed-auth-token');
                if (resToken && resToken !== token) {
                    identityService.setToken(resToken);
                }
            }
            const data = typeof adapter === 'function' ? adapter(result, { lang }) : result;
            return { success: true, data };
        }
        if (response.status === 400 && result.reason === 'ERROR_REASON_SAFETY_NEED_VERIFY_CAPTCHA') {
            await new Promise(resolve => openModal({ open: true, onOk: () => resolve(), triggerScene: CaptchaTriggerMap[url] }));
            return await handleFetch(url, request);
        }
        if (response.status === 400 && !hideErrorToast) {
            Message.error({
                content: result.message,
                translateInToast: true,
                id: 'request-400'
            });
            throw { status: response.status, data: { ...result, reason: 'request-400' }, message: result.message };
        }
        else {
            if (response.status === 429) {
                Message.error({
                    content: 'request.error.rateLimit',
                    translateInToast: true,
                    id: 'request-429'
                });
            }
            if (response.status === 403) {
                const cfMitigated = response.headers.get('cf-mitigated');
                CfMitigatedHandler(cfMitigated);
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
export const APIFetch = {
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
