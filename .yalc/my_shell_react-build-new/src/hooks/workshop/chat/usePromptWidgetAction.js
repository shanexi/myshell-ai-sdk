"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = usePromptWidgetAction;
const react_1 = require("react");
const interfaces_1 = require("../../../chat/model/interfaces.js");
const useTextMessageSender_1 = require("../../../chat/views/hooks/useTextMessageSender.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const identityService_1 = require("../../../common/services/identityService.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const runtime_config_1 = require("../../../common/utils/runtime-config.js");
const fetch_event_source_1 = require("../../../core/request/fetch-event-source/index.js");
const store_1 = require("../../../services/store/index.js");
function usePromptWidgetAction(widgetInfo) {
    const widgetId = (0, react_1.useMemo)(() => {
        return widgetInfo?.id ?? '';
    }, [widgetInfo]);
    const pushWidgetChatRecord = (0, store_1.useWorkshopStore)(state => state.pushWidgetChatRecord);
    const setWidgetSending = (0, store_1.useWorkshopStore)(state => state.setWidgetSending);
    const widgetSending = (0, store_1.useWorkshopStore)(state => state.widgetSending);
    const widgetStateMap = (0, store_1.useWorkshopStore)(state => state.widgetStateMap);
    const widgetChatList = (0, react_1.useMemo)(() => {
        return widgetStateMap[widgetInfo?.id ?? '']?.chatList ?? [];
    }, [widgetStateMap, widgetInfo?.id]);
    const setEnergyInfo = (0, store_1.useUserStore)(state => state.setEnergyInfo);
    const setLoginPopVisible = (0, store_1.useChatStore)(state => state.setLoginPopVisible);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const { warning, error } = (0, useNotification_1.useNotification)();
    const [inputLock, setInputLock] = (0, react_1.useState)(false);
    const [acting, setActing] = (0, react_1.useState)(widgetSending);
    (0, react_1.useMemo)(() => {
        setActing(widgetSending);
    }, [widgetSending]);
    const promptAction = (0, react_1.useCallback)(async ({ type, callback }) => {
        return new Promise(async (resolve) => {
            const ctrl = new AbortController();
            setInputLock(true);
            setWidgetSending(true);
            const yidunValidate = identityService_1.identityService.getYidunValidate();
            let replyMsg;
            const SSEBody = type === 'unlock'
                ? {
                    messageType: 'BUTTON_INTERACTION',
                    button_id: 'unlock_prompt_widget'
                }
                : {
                    messageType: 'BUTTON_INTERACTION',
                    button_id: 'unlock_prompt_widget'
                };
            const headers = await (0, useTextMessageSender_1.getHeaders)();
            (0, fetch_event_source_1.fetchEventSource)(`${runtime_config_1.API_URL}/v1/widget/chat/send_message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                    ...headers,
                    'myshell-service-name': 'organics-api'
                },
                body: JSON.stringify({
                    widgetId,
                    ...SSEBody,
                    ...(yidunValidate && { checkIsRobotValidate: yidunValidate })
                }),
                signal: ctrl.signal,
                openWhenHidden: true,
                async onopen(response) {
                    setActing(false);
                    resolve(true);
                    if (response.ok) {
                        setInputLock(false);
                        typeof callback === 'function' && callback();
                    }
                    else if (response.status == 401) {
                        ctrl.abort();
                        setLoginPopVisible(true);
                        identityService_1.identityService.setLoginPopup('1');
                        setInputLock(false);
                        setWidgetSending(false);
                    }
                    else if (response.status >= 400 && response.status < 500) {
                        ctrl.abort();
                        setInputLock(false);
                        setWidgetSending(false);
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
                            return;
                        }
                        warning({
                            content: json.message
                        });
                    }
                    else {
                        ctrl.abort();
                        setInputLock(false);
                        setWidgetSending(false);
                    }
                },
                onmessage(msg) {
                    setInputLock(false);
                    const data = (0, common_helper_1.tryJsonParse)(msg.data);
                    switch (msg.event) {
                        case interfaces_1.SSEEvents.MESSAGE_SENT:
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLYING:
                            replyMsg = { ...data.message };
                            pushWidgetChatRecord(replyMsg);
                            setWidgetSending(false);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_IS_TEXT:
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_CONSUME_ENERGY:
                            data.userEnergyInfo && setEnergyInfo(data.userEnergyInfo);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_INTERNAL_ERROR:
                            setWidgetSending(false);
                            break;
                    }
                },
                onerror(err) {
                    setInputLock(false);
                    setWidgetSending(false);
                    console.error(err);
                    ctrl.abort();
                }
            }).catch(e => {
                setInputLock(false);
                setWidgetSending(false);
                console.error(e);
                ctrl.abort();
            });
        });
    }, [widgetId, widgetChatList.length, userId]);
    return {
        inputLock,
        acting,
        promptAction
    };
}
