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
exports.rxUpload = exports.rxDelete = exports.rxPost = exports.axiosClient = exports.wsBaseURL = exports.baseURL = exports.LangMap = void 0;
exports.rxGet = rxGet;
const axios_1 = __importStar(require("axios"));
const rxjs_1 = require("rxjs");
const identityService_1 = require("../../common/services/identityService.js");
const common_helper_1 = require("../../common/utils/common-helper.js");
const computeChecksum1226_1 = require("../../common/utils/computeChecksum1226.js");
const defaultVisitorId_1 = require("../../common/utils/defaultVisitorId.js");
exports.LangMap = {
    en: 'en',
    zh: 'zh-CN',
    'zh-tw': 'zh-TW',
    es: 'es',
    jp: 'ja',
    ru: 'ru',
    ko: 'ko'
};
const CfMitigatedHandler_1 = __importDefault(require("../../core/request/CfMitigatedHandler.js"));
const EventEmitter_1 = __importDefault(require("./EventEmitter.js"));
const initNeteaseVisitorId_1 = require("./initNeteaseVisitorId.js");
const runtime_config_1 = require("./runtime-config.js");
exports.baseURL = `${runtime_config_1.API_URL}`;
exports.wsBaseURL = `${runtime_config_1.WS_API_URL}`;
exports.axiosClient = axios_1.default.create({
    baseURL: exports.baseURL
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
        const token = identityService_1.identityService.getToken();
        if (token && token.trim()) {
            mergedConfig.headers.Authorization = `Bearer ${identityService_1.identityService.getToken()}`;
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
                mergedConfig.headers['visitor-id'] = visitorId;
            }
            else {
                mergedConfig.headers['my-visitor-id'] = visitorId;
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
            const neteaseEngineToken = await (0, initNeteaseVisitorId_1.getNeteaseRequestToken)();
            mergedConfig.headers['myshell-security-token'] = neteaseEngineToken;
        }
        catch (e) {
        }
    }
    mergedConfig.headers.platform = 'web';
    mergedConfig.headers.version = '1.0.0';
    mergedConfig.headers['Accept-Language'] = exports.LangMap[identityService_1.identityService.getLanguage() || 'en'];
    mergedConfig.headers['myshell-client-version'] = 'v1.6.4';
    mergedConfig.headers.timestamp = (0, computeChecksum1226_1.computeChecksum1226)(new Date().getTime());
    return mergedConfig;
}
function rxGet(url, params, config) {
    const query = [];
    if (params) {
        for (const key of Object.keys(params)) {
            query.push(`${key}=${params[key]}`);
        }
    }
    const source = axios_1.default.CancelToken.source();
    return (0, rxjs_1.from)(getConfig(config)).pipe((0, rxjs_1.mergeMap)(mergedConfig => createObservable(exports.axiosClient.get(`${url}${query.length ? `?${query.join('&')}` : ''}`, {
        cancelToken: source.token,
        ...mergedConfig
    }), source, config)));
}
const rxPost = (url, data, config) => {
    const source = axios_1.default.CancelToken.source();
    const production = config?.production;
    const requestUrl = production ? `https://api.myshell.ai${url}` : url;
    return (0, rxjs_1.from)(getConfig(config)).pipe((0, rxjs_1.mergeMap)(mergedConfig => createObservable(exports.axiosClient.post(`${requestUrl}`, data, {
        cancelToken: source.token,
        ...mergedConfig
    }), source, config)));
};
exports.rxPost = rxPost;
const rxDelete = (url, data, config) => {
    const source = axios_1.default.CancelToken.source();
    return (0, rxjs_1.from)(getConfig(config)).pipe((0, rxjs_1.mergeMap)(mergedConfig => createObservable((0, exports.axiosClient)({
        method: 'DELETE',
        url: `${url}`,
        data,
        cancelToken: source.token,
        ...mergedConfig
    }), source, config)));
};
exports.rxDelete = rxDelete;
const rxUpload = (url, form, config) => {
    const source = axios_1.default.CancelToken.source();
    const mergedConfig = {
        timeout: config?.timeout || 30000,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    if (!config?.allowAnonymous) {
        mergedConfig.headers.Authorization = `Bearer ${identityService_1.identityService.getToken()}`;
    }
    mergedConfig.headers['myshell-client-version'] = 'v1.6.4';
    mergedConfig.headers.timestamp = (0, computeChecksum1226_1.computeChecksum1226)(new Date().getTime());
    return createObservable(exports.axiosClient.post(`${url}`, form, {
        cancelToken: source.token,
        ...mergedConfig
    }), source, config);
};
exports.rxUpload = rxUpload;
const createObservable = (prom, source, config) => {
    return new rxjs_1.Observable(subscriber => {
        prom
            .then(req => {
            subscriber.next(req);
        })
            .catch(err => {
            if (axios_1.default.isCancel(err)) {
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
    }).pipe((0, rxjs_1.mergeMap)(res => {
        return handleResponse(res, config);
    }), (0, rxjs_1.catchError)((err) => handleError(err, config)));
};
const handleResponse = (res, config) => {
    if (config?.skipHandlingResponse) {
        return (0, rxjs_1.of)(res);
    }
    if (res.status >= axios_1.HttpStatusCode.Ok && res.status < axios_1.HttpStatusCode.MultipleChoices) {
        const token = identityService_1.identityService.getToken();
        const resToken = res?.headers?.['refreshed-auth-token'];
        resToken && resToken !== token && identityService_1.identityService.setToken(resToken);
        return (0, rxjs_1.of)(res.data);
    }
    return (0, rxjs_1.throwError)(() => res);
};
const handleError = (err, config) => {
    err.message = JSON.stringify({
        url: err?.config?.url,
        message: err?.message,
        headers: err?.config.headers,
        response: err?.response
    });
    if (config?.skipHandlingResponse) {
        return (0, rxjs_1.throwError)(() => err);
    }
    let msg = 'request.error.common';
    let translateInToast = true;
    if (err?.response?.status) {
        const { status, headers } = err.response;
        const { data } = err.response;
        if (status < axios_1.HttpStatusCode.Ok) {
            msg = 'request.error.network';
        }
        else if (status === axios_1.HttpStatusCode.Ok) {
            msg = data?.message;
        }
        else if (status > axios_1.HttpStatusCode.Ok && status < axios_1.HttpStatusCode.MultipleChoices) {
            msg = 'request.error.common';
        }
        else if (status === axios_1.HttpStatusCode.BadRequest) {
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
        else if (status === axios_1.HttpStatusCode.Unauthorized) {
            if (!config?.noRedirectToLogin) {
                EventEmitter_1.default.dispatch('Unauthorized', null);
            }
        }
        else if (status > axios_1.HttpStatusCode.BadRequest && status < axios_1.HttpStatusCode.InternalServerError) {
            if (status === axios_1.HttpStatusCode.TooManyRequests) {
                msg = 'request.error.429';
            }
            else if (status === axios_1.HttpStatusCode.Forbidden) {
                const cfMitigated = headers['cf-mitigated'];
                (0, CfMitigatedHandler_1.default)(cfMitigated);
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
        if (!(0, common_helper_1.isString)(msg)) {
            msg = 'request.error.common';
        }
    }
    return (0, rxjs_1.throwError)(() => err);
};
