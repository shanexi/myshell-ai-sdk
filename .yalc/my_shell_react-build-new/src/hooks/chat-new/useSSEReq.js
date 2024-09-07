"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeaders = void 0;
exports.default = useSSEReq;
const react_1 = require("react");
const useNeteaseEngineToken_1 = __importDefault(require("../../common/hooks/useNeteaseEngineToken.js"));
const identityService_1 = require("../../common/services/identityService.js");
const common_helper_1 = require("../../common/utils/common-helper.js");
const defaultVisitorId_1 = require("../../common/utils/defaultVisitorId.js");
const runtime_config_1 = require("../../common/utils/runtime-config.js");
const APIFetch_1 = require("../../core/request/APIFetch.js");
const fetch_event_source_1 = require("../../core/request/fetch-event-source/index.js");
const sseMessageHandler_1 = __importDefault(require("./sseMessageHandler.js"));
const getHeaders = async () => {
    const token = identityService_1.identityService.getToken();
    const language = identityService_1.identityService.getLanguage() || 'en';
    const commonHeaders = {
        platform: 'web',
        version: '1.0.0',
        'Accept-Language': APIFetch_1.LangMap[language]
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
function useSSEReq(params) {
    const { type, id, userId, setEnergyInfo, addMessage, updateMessage, addTextStream, addAudioStream, replaceDraftMessage, audioAutoplay, enQueue, partialUpdateMessage } = params;
    const sseMessageHandler = (0, sseMessageHandler_1.default)({
        type,
        userId,
        setEnergyInfo,
        addMessage,
        updateMessage,
        addTextStream,
        addAudioStream,
        replaceDraftMessage,
        audioAutoplay,
        enQueue,
        partialUpdateMessage
    });
    const url = `${runtime_config_1.API_URL}/v1/${type === 'widget' ? 'widget' : 'bot'}/chat/send_message`;
    const ctrl = (0, react_1.useRef)();
    const { getRequestNeteaseToken } = (0, useNeteaseEngineToken_1.default)();
    const onSendSSEReq = async (body) => {
        let headers;
        let neteaseEngineToken;
        const yidunValidate = identityService_1.identityService.getYidunValidate();
        try {
            headers = await (0, exports.getHeaders)();
        }
        catch (e) {
            console.error(e);
            return;
        }
        try {
            neteaseEngineToken = await getRequestNeteaseToken();
        }
        catch (e) {
            console.error(e);
        }
        const reqBody = {
            ...(type === 'widget' ? { widgetId: id } : { botId: id }),
            ...body,
            ...(yidunValidate && { checkIsRobotValidate: yidunValidate })
        };
        ctrl.current = new AbortController();
        (0, fetch_event_source_1.fetchEventSource)(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                ...headers,
                'myshell-service-name': 'organics-api',
                'myshell-security-token': neteaseEngineToken
            },
            body: JSON.stringify(reqBody),
            signal: ctrl.current?.signal,
            openWhenHidden: true,
            async onopen(response) {
                if (response.ok) {
                }
                else if (response.status === 401) {
                }
                else if (response.status >= 400 && response.status < 500) {
                    if (response.status === 429) {
                        return;
                    }
                    const json = await response.json();
                    if (json.reason === 'ERROR_REASON_CHAT_NEED_VERIFY_CAPTCHA') {
                        return;
                    }
                    if (json.reason === 'ERROR_REASON_USER_NOT_ENOUGH_ENERGY') {
                        return;
                    }
                    if (json.reason === 'ERROR_REASON_INTERNAL_SERVER_ERROR') {
                        return;
                    }
                    if (json.reason === 'ERROR_REASON_CHAT_SYSTEM_MESSAGE') {
                    }
                }
                else {
                    const json = await response.json();
                }
            },
            onmessage(msg) {
                sseMessageHandler(msg);
            },
            onerror(err) {
                console.error(err);
            },
            onclose() {
                ctrl.current = undefined;
            }
        }).catch(e => {
            console.error(e);
        });
    };
    const terminateSSEReq = () => {
        ctrl.current?.abort();
    };
    return {
        onSendSSEReq,
        terminate: terminateSSEReq
    };
}
