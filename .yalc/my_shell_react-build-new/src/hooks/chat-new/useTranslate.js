"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useTranslate;
const react_1 = require("react");
const useNeteaseEngineToken_1 = __importDefault(require("../../common/hooks/useNeteaseEngineToken.js"));
const common_helper_1 = require("../../common/utils/common-helper.js");
const runtime_config_1 = require("../../common/utils/runtime-config.js");
const fetch_event_source_1 = require("../../core/request/fetch-event-source/index.js");
const sseMessageHandler_1 = require("./sseMessageHandler.js");
const useSSEReq_1 = require("./useSSEReq.js");
function useTranslate(type, id, addTranslationStream) {
    const { getRequestNeteaseToken } = (0, useNeteaseEngineToken_1.default)();
    const ctrl = (0, react_1.useRef)();
    const [translationStatus, setTranslationStatus] = (0, react_1.useState)();
    const URL = `${runtime_config_1.API_URL}/v1/bot/chat/translate`;
    const translate = async (messageId) => {
        setTranslationStatus('TRANSLATING');
        let headers;
        let neteaseEngineToken;
        try {
            headers = await (0, useSSEReq_1.getHeaders)();
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
            msgId: messageId
        };
        (0, fetch_event_source_1.fetchEventSource)(URL, {
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
                const { event, data } = msg;
                const sseMsg = (0, common_helper_1.tryJsonParse)(data);
                switch (event) {
                    case sseMessageHandler_1.SSEEvents.TEXT_STREAM:
                        addTranslationStream(messageId, sseMsg.content);
                        break;
                    case sseMessageHandler_1.SSEEvents.TEXT_STREAM_FINISHED:
                        break;
                    default:
                        break;
                }
            },
            onerror(err) {
                console.error(err);
                setTranslationStatus('ERROR');
            },
            onclose() {
                ctrl.current = undefined;
            }
        }).catch(e => {
            console.error(e);
        });
    };
    return {
        translationStatus,
        translate
    };
}
