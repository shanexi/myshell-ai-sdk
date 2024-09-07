"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useTranslate;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const interfaces_1 = require("../../../../chat/model/interfaces.js");
const useNeteaseEngineToken_1 = __importDefault(require("../../../../common/hooks/useNeteaseEngineToken.js"));
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const identityService_1 = require("../../../../common/services/identityService.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const runtime_config_1 = require("../../../../common/utils/runtime-config.js");
const fetch_event_source_1 = require("../../../../core/request/fetch-event-source/index.js");
const store_1 = require("../../../../services/store/index.js");
const util_1 = require("./util.js");
function useTranslate(message) {
    const { getRequestNeteaseToken } = (0, useNeteaseEngineToken_1.default)();
    const { warning, error } = (0, useNotification_1.useNotification)();
    const tRequest = (0, next_intl_1.useTranslations)('request');
    const currentErrorMsg = (0, react_1.useRef)();
    const hideRetry = (0, react_1.useRef)(false);
    const setLoginPopVisible = (0, store_1.useChatStore)(state => state.setLoginPopVisible);
    const addTranslationStreamNew = (0, store_1.useChatStore)(state => state.addTranslationStreamNew);
    const URL = `${runtime_config_1.API_URL}/v1/bot/chat/translate`;
    const translate = (0, react_1.useCallback)(async () => {
        return new Promise(async (resolve, reject) => {
            const ctrl = new AbortController();
            let headers;
            let neteaseEngineToken;
            try {
                headers = await (0, util_1.getHeaders)();
            }
            catch (e) {
                return;
            }
            try {
                neteaseEngineToken = await getRequestNeteaseToken();
            }
            catch (e) {
            }
            (0, fetch_event_source_1.fetchEventSource)(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                    ...headers,
                    'myshell-service-name': 'organics-api',
                    'myshell-security-token': neteaseEngineToken
                },
                body: JSON.stringify({
                    msgId: message.id
                }),
                signal: ctrl.signal,
                openWhenHidden: true,
                async onopen(response) {
                    resolve(true);
                    if (response.ok) {
                    }
                    else if (response.status === 401) {
                        ctrl.abort();
                        setLoginPopVisible(true);
                        identityService_1.identityService.setLoginPopup('1');
                    }
                    else if (response.status >= 400 && response.status < 500) {
                        if (response.status === 429) {
                            warning({
                                content: tRequest('error.429')
                            });
                            return;
                        }
                        const json = await response.json();
                        if (json.reason === 'ERROR_REASON_CHAT_NEED_VERIFY_CAPTCHA') {
                            return;
                        }
                        if (json.reason === 'ERROR_REASON_USER_NOT_ENOUGH_ENERGY') {
                            error({
                                content: 'request.error.chat_no_enough_energy',
                                translateInToast: true,
                                id: json.reason
                            });
                            return;
                        }
                        if (json.reason === 'ERROR_REASON_INTERNAL_SERVER_ERROR') {
                            currentErrorMsg.current = json.message;
                            return;
                        }
                        if (json.reason === 'ERROR_REASON_CHAT_SYSTEM_MESSAGE') {
                            currentErrorMsg.current = json.message;
                            hideRetry.current = true;
                            return;
                        }
                        warning({
                            content: json.message || json.reason
                        });
                        ctrl.abort();
                    }
                    else {
                        ctrl.abort();
                        throw new Error();
                    }
                },
                onmessage(msg) {
                    const data = (0, common_helper_1.tryJsonParse)(msg.data);
                    console.log(msg.event, data);
                    switch (msg.event) {
                        case interfaces_1.SSEEvents.MESSAGE_IS_TEXT:
                            addTranslationStreamNew(message, data.content);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_TEXT_DONE:
                            break;
                        default:
                            break;
                    }
                },
                onerror(err) {
                    console.error(err);
                    ctrl.abort();
                    throw new Error();
                },
                onclose() { }
            }).catch(e => {
                ctrl.abort();
                reject();
            });
        }).catch(e => {
            throw new Error();
        });
    }, [URL, addTranslationStreamNew, error, getRequestNeteaseToken, message, setLoginPopVisible, tRequest, warning]);
    return {
        translate
    };
}
