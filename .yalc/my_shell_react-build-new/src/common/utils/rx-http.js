import axios, { HttpStatusCode } from 'axios';
import { catchError, from, mergeMap, Observable, of, throwError } from 'rxjs';
import { identityService } from '../../common/services/identityService.js';
import { generateUUID, isClient, isString } from '../../common/utils/common-helper.js';
import { computeChecksum1226 } from '../../common/utils/computeChecksum1226.js';
import { defaultVisitorId } from '../../common/utils/defaultVisitorId.js';
export const LangMap = {
    en: 'en',
    zh: 'zh-CN',
    'zh-tw': 'zh-TW',
    es: 'es',
    jp: 'ja',
    ru: 'ru',
    ko: 'ko'
};
import CfMitigatedHandler from '../../core/request/CfMitigatedHandler.js';
import EventEmitter from './EventEmitter.js';
import { getNeteaseRequestToken } from './initNeteaseVisitorId.js';
import { API_URL, WS_API_URL } from './runtime-config.js';
export const baseURL = `${API_URL}`;
export const wsBaseURL = `${WS_API_URL}`;
export const axiosClient = axios.create({
    baseURL
});
async function getConfig(config) {
    const mergedConfig = {
        timeout: config?.timeout || 15000,
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    };
    if (config?.isGoLang) {
        mergedConfig.headers['myshell-service-name'] = 'organics-api';
    }
    if (!config?.allowAnonymous) {
        const token = identityService.getToken();
        if (token && token.trim()) {
            mergedConfig.headers.Authorization = `Bearer ${identityService.getToken()}`;
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
                mergedConfig.headers['visitor-id'] = visitorId;
            }
            else {
                mergedConfig.headers['my-visitor-id'] = visitorId;
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
                if (scDeviceId && scDeviceId.trim()) {
                    mergedConfig.headers['sc-device-id'] = scDeviceId;
                }
            }
            else if (scDeviceId && scDeviceId.trim()) {
                mergedConfig.headers['sc-cookie-id'] = scDeviceId;
            }
        }
    }
    if (config?.withMyShellSecurityToken) {
        try {
            const neteaseEngineToken = await getNeteaseRequestToken();
            mergedConfig.headers['myshell-security-token'] = neteaseEngineToken;
        }
        catch (e) {
        }
    }
    mergedConfig.headers.platform = 'web';
    mergedConfig.headers.version = '1.0.0';
    mergedConfig.headers['Accept-Language'] = LangMap[identityService.getLanguage() || 'en'];
    mergedConfig.headers['myshell-client-version'] = 'v1.6.4';
    mergedConfig.headers.timestamp = computeChecksum1226(new Date().getTime());
    return mergedConfig;
}
export function rxGet(url, params, config) {
    const query = [];
    if (params) {
        for (const key of Object.keys(params)) {
            query.push(`${key}=${params[key]}`);
        }
    }
    const source = axios.CancelToken.source();
    return from(getConfig(config)).pipe(mergeMap(mergedConfig => createObservable(axiosClient.get(`${url}${query.length ? `?${query.join('&')}` : ''}`, {
        cancelToken: source.token,
        ...mergedConfig
    }), source, config)));
}
export const rxPost = (url, data, config) => {
    const source = axios.CancelToken.source();
    const production = config?.production;
    const requestUrl = production ? `https://api.myshell.ai${url}` : url;
    return from(getConfig(config)).pipe(mergeMap(mergedConfig => createObservable(axiosClient.post(`${requestUrl}`, data, {
        cancelToken: source.token,
        ...mergedConfig
    }), source, config)));
};
export const rxDelete = (url, data, config) => {
    const source = axios.CancelToken.source();
    return from(getConfig(config)).pipe(mergeMap(mergedConfig => createObservable(axiosClient({
        method: 'DELETE',
        url: `${url}`,
        data,
        cancelToken: source.token,
        ...mergedConfig
    }), source, config)));
};
export const rxUpload = (url, form, config) => {
    const source = axios.CancelToken.source();
    const mergedConfig = {
        timeout: config?.timeout || 30000,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    if (!config?.allowAnonymous) {
        mergedConfig.headers.Authorization = `Bearer ${identityService.getToken()}`;
    }
    mergedConfig.headers['myshell-client-version'] = 'v1.6.4';
    mergedConfig.headers.timestamp = computeChecksum1226(new Date().getTime());
    return createObservable(axiosClient.post(`${url}`, form, {
        cancelToken: source.token,
        ...mergedConfig
    }), source, config);
};
const createObservable = (prom, source, config) => {
    return new Observable(subscriber => {
        prom
            .then(req => {
            subscriber.next(req);
        })
            .catch(err => {
            if (axios.isCancel(err)) {
            }
            else {
                subscriber.error(err);
            }
        })
            .finally(() => {
            subscriber.complete();
        });
        return () => {
            source.cancel();
        };
    }).pipe(mergeMap(res => {
        return handleResponse(res, config);
    }), catchError((err) => handleError(err, config)));
};
const handleResponse = (res, config) => {
    if (config?.skipHandlingResponse) {
        return of(res);
    }
    if (res.status >= HttpStatusCode.Ok && res.status < HttpStatusCode.MultipleChoices) {
        const token = identityService.getToken();
        const resToken = res?.headers?.['refreshed-auth-token'];
        resToken && resToken !== token && identityService.setToken(resToken);
        return of(res.data);
    }
    return throwError(() => res);
};
const handleError = (err, config) => {
    err.message = JSON.stringify({
        url: err?.config?.url,
        message: err?.message,
        headers: err?.config.headers,
        response: err?.response
    });
    if (config?.skipHandlingResponse) {
        return throwError(() => err);
    }
    let msg = 'request.error.common';
    let translateInToast = true;
    if (err?.response?.status) {
        const { status, headers } = err.response;
        const { data } = err.response;
        if (status < HttpStatusCode.Ok) {
            msg = 'request.error.network';
        }
        else if (status === HttpStatusCode.Ok) {
            msg = data?.message;
        }
        else if (status > HttpStatusCode.Ok && status < HttpStatusCode.MultipleChoices) {
            msg = 'request.error.common';
        }
        else if (status === HttpStatusCode.BadRequest) {
            console.log(data);
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
        else if (status === HttpStatusCode.Unauthorized) {
            if (!config?.noRedirectToLogin) {
                EventEmitter.dispatch('Unauthorized', null);
            }
        }
        else if (status > HttpStatusCode.BadRequest && status < HttpStatusCode.InternalServerError) {
            if (status === HttpStatusCode.TooManyRequests) {
                msg = 'request.error.429';
            }
            else if (status === HttpStatusCode.Forbidden) {
                const cfMitigated = headers['cf-mitigated'];
                CfMitigatedHandler(cfMitigated);
                msg = 'request.error.common';
            }
            else {
                msg = 'request.error.common';
            }
        }
        else {
            msg = 'request.error.common';
        }
    }
    if (!config?.noPopupError) {
        if (!isString(msg)) {
            msg = 'request.error.common';
        }
    }
    return throwError(() => err);
};
