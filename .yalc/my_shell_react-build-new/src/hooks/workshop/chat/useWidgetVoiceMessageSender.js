"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useWidgetVoiceMessageSender;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const enums_1 = require("../../../chat/model/enums.js");
const interfaces_1 = require("../../../chat/model/interfaces.js");
const useTextMessageSender_1 = require("../../../chat/views/hooks/useTextMessageSender.js");
const bot_1 = require("../../../common/constants/interfaces/bot.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const identityService_1 = require("../../../common/services/identityService.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const runtime_config_1 = require("../../../common/utils/runtime-config.js");
const fetch_event_source_1 = require("../../../core/request/fetch-event-source/index.js");
const store_1 = require("../../../services/store/index.js");
function useWidgetVoiceMessageSender({ audioType, clearRecord, widgetInfo }) {
    const widgetId = (0, react_1.useMemo)(() => {
        return widgetInfo?.id ?? '';
    }, [widgetInfo]);
    const widgetStateMap = (0, store_1.useWorkshopStore)(state => state.widgetStateMap);
    const setWidgetSending = (0, store_1.useWorkshopStore)(state => state.setWidgetSending);
    const pushWidgetMsgIdToList = (0, store_1.useWorkshopStore)(state => state.pushWidgetMsgIdToList);
    const pushWidgetErrorChatRecord = (0, store_1.useWorkshopStore)(state => state.pushWidgetErrorChatRecord);
    const widgetSending = (0, store_1.useWorkshopStore)(state => state.widgetSending);
    const addWidgetSSETextStream = (0, store_1.useWorkshopStore)(state => state.addWidgetSSETextStream);
    const receiveWidgetVoiceUrlFromSSe = (0, store_1.useWorkshopStore)(state => state.receiveWidgetVoiceUrlFromSSe);
    const pushWidgetChatRecord = (0, store_1.useWorkshopStore)(state => state.pushWidgetChatRecord);
    const addWidgetSSEAudioStream = (0, store_1.useWorkshopStore)(state => state.addWidgetSSEAudioStream);
    const addWidgetSSEImageStream = (0, store_1.useWorkshopStore)(state => state.addWidgetSSEImageStream);
    const setEnergyInfo = (0, store_1.useUserStore)(state => state.setEnergyInfo);
    const pushAudioIdToQueue = (0, store_1.useChatStore)(state => state.pushAudioIdToQueue);
    const setLoginPopVisible = (0, store_1.useChatStore)(state => state.setLoginPopVisible);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const updateWidgetMessage = (0, store_1.useWorkshopStore)(state => state.updateWidgetMessage);
    const widgetChatList = (0, react_1.useMemo)(() => {
        return widgetStateMap[widgetInfo?.id ?? '']?.chatList ?? [];
    }, [widgetStateMap, widgetInfo?.id]);
    const { error, warning } = (0, useNotification_1.useNotification)();
    const errorT = (0, next_intl_1.useTranslations)('request.error');
    const lastChatId = widgetChatList.length > 0 ? widgetChatList[widgetChatList.length - 1].id : '0';
    const pushErrorChatRecordHandle = (blob, recordState, localId) => {
        setWidgetSending(false);
        clearRecord();
        const lastChat = widgetChatList.length > 0 ? widgetChatList[widgetChatList.length - 1] : { id: 0 };
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            const errChat = {
                id: `errChat${new Date().getTime()}`,
                prevId: lastChat?.id || 0,
                base64: base64String,
                type: enums_1.MessageTypeEnum.VOICE,
                status: 'err'
            };
            pushWidgetErrorChatRecord(errChat, widgetId);
        };
        reader.readAsDataURL(blob);
        if (localId) {
            const localMsgs = [
                {
                    status: enums_1.MessageStatusEnum.PROCESSING,
                    type: 'VOICE',
                    voiceUrl: URL.createObjectURL(blob),
                    widgetId,
                    duration: recordState.duration,
                    userId,
                    localId: String(BigInt(localId)),
                    deleteId: String(BigInt(localId))
                },
                {
                    status: enums_1.MessageStatusEnum.PROCESSING,
                    type: 'REPLY',
                    text: '',
                    widgetId,
                    userId,
                    localId: String(BigInt(localId) + BigInt(1)),
                    deleteId: String(BigInt(localId) + BigInt(1))
                }
            ];
            pushWidgetChatRecord(localMsgs);
        }
    };
    const sseRequest = async ({ retryText = '', callback = () => null, recordState } = {}) => {
        if (widgetSending) {
            return;
        }
        let retryBlob = null;
        return new Promise(async (resolve) => {
            const ctrl = new AbortController();
            let audioStreamIndex = 0;
            const blob = recordState?.recordBlob;
            setWidgetSending(true);
            if (retryText) {
                const base64String = retryText.split(',')[1];
                const byteCharacters = Buffer.from(base64String, 'base64').toString('binary');
                const byteNumbers = new Uint8Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = byteNumbers.buffer;
                retryBlob = new Blob([byteArray], { type: 'audio/webm' });
            }
            const yidunValidate = identityService_1.identityService.getYidunValidate();
            let replyMsg;
            const secenario = bot_1.ConversationScenario.CONVERSATION_SCENARIO_IMMERSION_WEB_CHAT;
            const SSEBody = {
                conversation_scenario: secenario
            };
            const localId = String(BigInt(lastChatId) + BigInt(1));
            const localMsgs = [
                {
                    status: enums_1.MessageStatusEnum.PROCESSING,
                    type: 'VOICE',
                    voiceUrl: URL.createObjectURL((retryText && retryBlob) || blob),
                    widgetId,
                    duration: recordState.duration,
                    userId,
                    localId: String(BigInt(localId)),
                    isLocalSend: true
                },
                {
                    status: enums_1.MessageStatusEnum.PROCESSING,
                    type: 'REPLY',
                    text: '',
                    widgetId,
                    userId,
                    localId: String(BigInt(localId) + BigInt(1)),
                    isLocalReply: true
                }
            ];
            pushWidgetChatRecord(localMsgs);
            const headers = await (0, useTextMessageSender_1.getHeaders)();
            const isLlmModerationRequest = false;
            let sentMsg;
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
                    voiceBytes: Buffer.from(await (retryBlob || blob).arrayBuffer()).toString('base64'),
                    audioType,
                    messageType: 2,
                    ...SSEBody,
                    ...(yidunValidate && { checkIsRobotValidate: yidunValidate })
                }),
                signal: ctrl.signal,
                openWhenHidden: true,
                async onopen(response) {
                    if (response.status === 500) {
                        setWidgetSending(false);
                        ctrl.abort();
                        pushErrorChatRecordHandle((retryText && retryBlob) || blob, recordState, localId);
                        return;
                    }
                    setWidgetSending(false);
                    resolve(true);
                    typeof clearRecord === 'function' && clearRecord();
                    if (response.ok) {
                        typeof callback === 'function' && callback();
                    }
                    else if (response.status == 401) {
                        ctrl.abort();
                        setLoginPopVisible(true);
                        identityService_1.identityService.setLoginPopup('1');
                    }
                    else if (response.status >= 400 && response.status < 500) {
                        if (response.status === 429) {
                            warning({
                                content: errorT('429')
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
                            pushErrorChatRecordHandle((retryText && retryBlob) || blob, recordState, localId);
                            ctrl.abort();
                            return;
                        }
                        warning({
                            content: json.message
                        });
                        ctrl.abort();
                    }
                    else {
                        ctrl.abort();
                    }
                },
                onmessage(msg) {
                    const data = (0, common_helper_1.tryJsonParse)(msg.data);
                    switch (msg.event) {
                        case interfaces_1.SSEEvents.MESSAGE_SENT:
                            sentMsg = data.message;
                            pushWidgetChatRecord({ ...data.message, replaceLocalSend: true, status: enums_1.MessageStatusEnum.DONE });
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLYING:
                            replyMsg = { ...data.message, replaceLocalReply: true };
                            pushWidgetChatRecord(replyMsg);
                            pushWidgetMsgIdToList(replyMsg.id);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_IS_TEXT:
                            addWidgetSSETextStream({
                                index: 0,
                                isFinal: false,
                                text: data.content,
                                replyMessage: replyMsg
                            });
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_TEXT_DONE:
                            setWidgetSending(false);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_VOICE_BYTE:
                            addWidgetSSEAudioStream({
                                index: data.voiceBytesIndex,
                                isFinal: false,
                                audio: Uint8Array.from(atob(data.voiceBytes), c => c.charCodeAt(0)).buffer,
                                replyMessage: replyMsg
                            });
                            audioStreamIndex++;
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_VOICE_RECEIVED:
                            addWidgetSSEAudioStream({
                                index: audioStreamIndex,
                                isFinal: true,
                                audio: null,
                                replyMessage: replyMsg
                            });
                            receiveWidgetVoiceUrlFromSSe(data.voiceFilePath, replyMsg.id, widgetId);
                            pushAudioIdToQueue(replyMsg.id);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_CONSUME_ENERGY:
                            data.userEnergyInfo && setEnergyInfo(data.userEnergyInfo);
                            break;
                        case interfaces_1.SSEEvents.DURATION_CALCULATED:
                            break;
                        case interfaces_1.SSEEvents.IMAGE_GEN_PROCESSING:
                            addWidgetSSEImageStream({
                                imageGenMessageResponse: data.imageGenMessageResponse,
                                replyMessage: replyMsg,
                                genStatus: interfaces_1.ImageStatus.PROCESSING
                            });
                            break;
                        case interfaces_1.SSEEvents.IMAGE_GEN_DONE:
                            addWidgetSSEImageStream({
                                imageGenMessageResponse: data.imageGenMessageResponse,
                                replyMessage: replyMsg,
                                genStatus: interfaces_1.ImageStatus.DONE
                            });
                            break;
                        case interfaces_1.SSEEvents.IMAGE_GEN_ERROR:
                            addWidgetSSEImageStream({
                                imageGenMessageResponse: data.imageGenMessageResponse,
                                replyMessage: replyMsg,
                                genStatus: interfaces_1.ImageStatus.ERROR
                            });
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLIED:
                            const lastMsg = widgetChatList.length > 0 ? widgetChatList[widgetChatList.length - 1] : { id: 0 };
                            if (lastMsg.type === enums_1.MessageTypeEnum.LLM_MODERATION_REQUEST) {
                                return;
                            }
                            setWidgetSending(false);
                            const msg = {
                                ...data.message,
                                status: enums_1.MessageStatusEnum.DONE,
                                createdDate: new Date()
                            };
                            pushWidgetChatRecord(msg);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLY_REFERENCE_SOURCE:
                        case interfaces_1.SSEEvents.MESSAGE_REPLY_RECOMMND_QUESTION:
                            pushWidgetChatRecord(data.message);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_INTERNAL_ERROR:
                            setWidgetSending(false);
                            if (isLlmModerationRequest) {
                                const msg = {
                                    ...data.message,
                                    text: sentMsg.text,
                                    type: enums_1.MessageTypeEnum.LLM_MODERATION_REQUEST,
                                    status: enums_1.MessageStatusEnum.DONE,
                                    createdDate: new Date(),
                                    userSentMsg: sentMsg
                                };
                                pushWidgetChatRecord(msg);
                            }
                            else {
                                pushErrorChatRecordHandle((retryText && retryBlob) || blob, recordState, localId);
                            }
                            break;
                        case interfaces_1.SSEEvents.LLM_MODERATION_REQUEST:
                            const llmModerationRequestMsg = {
                                ...data.message,
                                type: enums_1.MessageTypeEnum.LLM_MODERATION_REQUEST,
                                userSentMsg: sentMsg,
                                text: sentMsg.text
                            };
                            updateWidgetMessage(llmModerationRequestMsg);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLY_UPDATE_HISTORY_MESSAGE:
                            updateWidgetMessage(data.message);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLY_CREATE_WHOLD_MESSAGE:
                            pushWidgetChatRecord({
                                ...data.message,
                                replaceLocalReply: true
                            });
                            break;
                    }
                },
                onerror(err) {
                    pushErrorChatRecordHandle((retryText && retryBlob) || blob, recordState, localId);
                    setWidgetSending(false);
                    console.error(err);
                    ctrl.abort();
                }
            }).catch(e => {
                pushErrorChatRecordHandle((retryText && retryBlob) || blob, recordState, localId);
                ctrl.abort();
            });
        });
    };
    const sendVoiceMessage = sseRequest;
    return {
        sendVoiceMessage
    };
}
