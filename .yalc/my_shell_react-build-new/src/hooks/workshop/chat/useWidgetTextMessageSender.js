"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useWidgetTextMessageSender;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const enums_1 = require("../../../chat/model/enums.js");
const interfaces_1 = require("../../../chat/model/interfaces.js");
const useTextMessageSender_1 = require("../../../chat/views/hooks/useTextMessageSender.js");
const workshop_1 = require("../../../common/constants/enums/workshop.js");
const bot_1 = require("../../../common/constants/interfaces/bot.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const identityService_1 = require("../../../common/services/identityService.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const runtime_config_1 = require("../../../common/utils/runtime-config.js");
const tokenizer2_1 = require("../../../common/utils/tokenizer2.js");
const fetch_event_source_1 = require("../../../core/request/fetch-event-source/index.js");
const useGetEnergyInfo_1 = __importDefault(require("../../../hooks/user/useGetEnergyInfo.js"));
const store_1 = require("../../../services/store/index.js");
function useWidgetTextMessageSender(widgetInfo) {
    const widgetId = (0, react_1.useMemo)(() => {
        return widgetInfo?.id ?? '';
    }, [widgetInfo]);
    const updateWidgetMessage = (0, store_1.useWorkshopStore)(state => state.updateWidgetMessage);
    const pushWidgetChatRecord = (0, store_1.useWorkshopStore)(state => state.pushWidgetChatRecord);
    const setWidgetSending = (0, store_1.useWorkshopStore)(state => state.setWidgetSending);
    const widgetSending = (0, store_1.useWorkshopStore)(state => state.widgetSending);
    const widgetTextInputMap = (0, store_1.useWorkshopStore)(state => state.widgetTextInputMap);
    const setWidgetTextInput = (0, store_1.useWorkshopStore)(state => state.setWidgetTextInput);
    const widgetStateMap = (0, store_1.useWorkshopStore)(state => state.widgetStateMap);
    const pushWidgetErrorChatRecord = (0, store_1.useWorkshopStore)(state => state.pushWidgetErrorChatRecord);
    const addWidgetSSETextStream = (0, store_1.useWorkshopStore)(state => state.addWidgetSSETextStream);
    const addWidgetSSEAudioStream = (0, store_1.useWorkshopStore)(state => state.addWidgetSSEAudioStream);
    const addWidgetSSEImageStream = (0, store_1.useWorkshopStore)(state => state.addWidgetSSEImageStream);
    const receiveWidgetVoiceUrlFromSSe = (0, store_1.useWorkshopStore)(state => state.receiveWidgetVoiceUrlFromSSe);
    const deleteWidgetUploadFiles = (0, store_1.useWorkshopStore)(state => state.deleteWidgetUploadFiles);
    const setErrorMsg = (0, store_1.useChatStore)(state => state.setErrorMsg);
    const setEnergyInfo = (0, store_1.useUserStore)(state => state.setEnergyInfo);
    const pushAudioIdToQueue = (0, store_1.useChatStore)(state => state.pushAudioIdToQueue);
    const setLoginPopVisible = (0, store_1.useChatStore)(state => state.setLoginPopVisible);
    const pollingWidgetChatMsg = (0, store_1.useWorkshopStore)(state => state.pollingWidgetChatMsg);
    const setWidgetDriverChatId = (0, store_1.useWorkshopStore)(state => state.setWidgetDriverChatId);
    const setWidgetStartJobIds = (0, store_1.useWorkshopStore)(state => state.setWidgetStartJobIds);
    const popWidgetToTop = (0, store_1.useWorkshopStore)(state => state.popWidgetToTop);
    const setPoped = (0, store_1.useWorkshopStore)(state => state.setPoped);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const { warning, error } = (0, useNotification_1.useNotification)();
    const t = (0, next_intl_1.useTranslations)('chat');
    const errorT = (0, next_intl_1.useTranslations)('request.error');
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const widgetChatList = (0, react_1.useMemo)(() => {
        return widgetStateMap[widgetInfo?.id ?? '']?.chatList ?? [];
    }, [widgetStateMap, widgetInfo?.id]);
    const [textMessage, setTextMessage] = (0, react_1.useState)(widgetTextInputMap[widgetId] ?? '');
    const [inputLock, setInputLock] = (0, react_1.useState)(false);
    const sendingRef = (0, react_1.useRef)(widgetSending);
    const textMessageRef = (0, react_1.useRef)(textMessage);
    const currentErrorMsg = (0, react_1.useRef)();
    const hideRetry = (0, react_1.useRef)(false);
    (0, react_1.useMemo)(() => {
        sendingRef.current = widgetSending;
    }, [widgetSending]);
    (0, react_1.useMemo)(() => {
        textMessageRef.current = textMessage;
    }, [textMessage]);
    (0, react_1.useEffect)(() => {
        setWidgetTextInput(widgetId, textMessage);
    }, [textMessage]);
    (0, usehooks_ts_1.useEffectOnce)(() => {
        setTextMessage(widgetTextInputMap[widgetId]);
    });
    (0, react_1.useEffect)(() => {
        setTextMessage(widgetTextInputMap[widgetId] ?? '');
    }, [widgetId]);
    const clearTextMessage = (0, react_1.useCallback)(() => {
        if (widgetId) {
            setTextMessage('');
            deleteWidgetUploadFiles(widgetId);
        }
    }, [widgetId]);
    const startPolling = (0, react_1.useCallback)(async (message, intervalId) => {
        const polling = async () => {
            const res = await pollingWidgetChatMsg(message);
            if (res) {
                setWidgetSending(false);
                setWidgetDriverChatId(`${message.id}`);
                clearInterval(intervalId.id);
                intervalId.id = null;
                getEnergyInfo();
            }
        };
        if (intervalId.id) {
            clearInterval(intervalId.id);
            intervalId.id = null;
        }
        else {
            intervalId.id = setInterval(() => {
                polling();
            }, 2 * 1000);
        }
    }, [pollingWidgetChatMsg]);
    const isMessageEmpty = !(textMessage || '').trim();
    const isPanelImageBot = widgetInfo?.chatPanelType === workshop_1.ChatPanelTypeEnum.BOT_CHAT_PANEL_TYPE_COMPONENT;
    const lastChatId = widgetChatList.length > 0
        ? widgetChatList[widgetChatList.length - 1].id || widgetChatList[widgetChatList.length - 1].localId
        : '0';
    const pushErrorChatRecordHandle = (text, retryText, localId, embedObjs, params, messageType, buttonId, interactionMsgId, componentInputMessage, imSlashCommandInput, isButtonInteraction, buttonInteractionErrorMessage) => {
        const lastChat = widgetChatList.length > 0 ? widgetChatList[widgetChatList.length - 1] : { id: 0 };
        const id = `errChat${new Date().getTime()}`;
        setErrorMsg(id, buttonInteractionErrorMessage || '');
        const hideRetryBtn = hideRetry.current;
        const errChat = {
            id,
            prevId: lastChat?.id || 0,
            text: retryText || text,
            type: enums_1.MessageTypeEnum.TEXT,
            status: 'err',
            embedObjs,
            params,
            imSlashCommandInput,
            messageType,
            buttonId,
            interactionMsgId,
            componentInputMessage,
            isButtonInteraction,
            hideRetryBtn
        };
        if (!(isButtonInteraction && !text && !imSlashCommandInput) && !componentInputMessage) {
            pushWidgetErrorChatRecord(errChat, widgetId);
            if (localId) {
                const removeLocalMsgs = [
                    {
                        status: enums_1.MessageStatusEnum.PROCESSING,
                        type: 'TEXT',
                        text: '',
                        widgetId,
                        userId,
                        localId: String(BigInt(localId)),
                        deleteId: String(BigInt(localId)),
                        embedObjs,
                        params,
                        isButtonInteraction,
                        imSlashCommandInput,
                        messageType,
                        buttonId,
                        interactionMsgId
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
                pushWidgetChatRecord(removeLocalMsgs);
                setInputLock(false);
                setWidgetSending(false);
            }
        }
        else {
            !!buttonInteractionErrorMessage &&
                warning({
                    content: buttonInteractionErrorMessage
                });
            setInputLock(false);
            setWidgetSending(false);
        }
    };
    const sseRequest = (0, react_1.useCallback)(async ({ retryText = '', requestData = null, callback = () => null, errorCb = () => null, closeCb = () => null } = {}) => {
        return new Promise(async (resolve) => {
            const ctrl = new AbortController();
            let audioStreamIndex = 0;
            if ((!retryText && isMessageEmpty && !requestData) || sendingRef.current)
                return;
            const res = await (0, tokenizer2_1.getTokenCount)(textMessageRef.current);
            const backupSentMsg = textMessageRef.current;
            if (res > 1500) {
                warning({
                    content: t('over_text_length')
                });
                return;
            }
            setInputLock(true);
            setWidgetSending(true);
            clearTextMessage();
            const yidunValidate = identityService_1.identityService.getYidunValidate();
            let replyMsg;
            let secenario;
            let SSEBody;
            if (isPanelImageBot) {
                SSEBody = {
                    conversation_scenario: bot_1.ConversationScenario.CONVERSATION_SCENARIO_WEB_CHAT_NORMAL,
                    message: '',
                    messageType: 1,
                    componentInputMessage: requestData.params
                };
            }
            else if (requestData?.isButtonInteraction) {
                secenario = bot_1.ConversationScenario.CONVERSATION_SCENARIO_IMMERSION_WEB_CHAT;
                SSEBody = {
                    ...requestData,
                    secenario,
                    message: retryText || backupSentMsg,
                    messageType: 15
                };
            }
            else {
                SSEBody = {
                    conversation_scenario: secenario,
                    message: retryText || backupSentMsg,
                    messageType: 1
                };
            }
            if (requestData && requestData.embedObjs) {
                SSEBody = {
                    ...SSEBody,
                    embedObjs: requestData.embedObjs
                };
            }
            const localId = String(BigInt(lastChatId || 0) + BigInt(1) + BigInt(requestData?.imageNumber || 0));
            const localMsgs = [
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
            !isPanelImageBot &&
                localMsgs.unshift({
                    status: enums_1.MessageStatusEnum.PROCESSING,
                    type: 'TEXT',
                    text: SSEBody.message,
                    widgetId,
                    userId,
                    localId: String(BigInt(localId)),
                    imSlashCommandInput: requestData?.imSlashCommandInput,
                    isLocalSend: true
                });
            if (requestData && requestData.embedObjs) {
                localMsgs[0].embedObjs = requestData.localObjs || requestData.embedObjs;
            }
            if (!(requestData?.isButtonInteraction && !requestData?.text && !requestData?.imSlashCommandInput) &&
                !requestData?.componentInputMessage) {
                pushWidgetChatRecord(localMsgs);
            }
            const headers = await (0, useTextMessageSender_1.getHeaders)();
            const intervalId = {};
            let isLlmModerationRequest = false;
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
                    ...SSEBody,
                    ...(yidunValidate && { checkIsRobotValidate: yidunValidate })
                }),
                signal: ctrl.signal,
                openWhenHidden: true,
                async onopen(response) {
                    sendingRef.current = false;
                    resolve(true);
                    if (response.ok) {
                        setInputLock(false);
                        typeof callback === 'function' && callback();
                    }
                    else if (response.status == 401) {
                        !!requestData?.isButtonInteraction && typeof callback === 'function' && callback();
                        typeof errorCb === 'function' && errorCb();
                        ctrl.abort();
                        setLoginPopVisible(true);
                        identityService_1.identityService.setLoginPopup('1');
                        setInputLock(false);
                        setWidgetSending(false);
                    }
                    else if (response.status >= 400 && response.status < 500) {
                        !!requestData?.isButtonInteraction && typeof callback === 'function' && callback();
                        setInputLock(false);
                        setWidgetSending(false);
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
                            currentErrorMsg.current = json.message;
                            return;
                        }
                        if (json.reason === 'ERROR_REASON_CHAT_SYSTEM_MESSAGE') {
                            currentErrorMsg.current = json.message;
                            hideRetry.current = true;
                            return;
                        }
                        warning({
                            content: json.message
                        });
                        ctrl.abort();
                    }
                    else {
                        !!requestData?.isButtonInteraction && typeof callback === 'function' && callback();
                        typeof errorCb === 'function' && errorCb();
                        setInputLock(false);
                        setWidgetSending(false);
                        const json = await response.json();
                        pushErrorChatRecordHandle(backupSentMsg, retryText, localId, requestData && requestData.embedObjs, requestData && requestData.params, requestData?.isButtonInteraction ? 15 : 1, requestData?.buttonId, requestData?.interactionMsgId, requestData?.componentInputMessage, requestData?.imSlashCommandInput, requestData?.isButtonInteraction, json.message);
                        ctrl.abort();
                    }
                },
                onmessage(msg) {
                    setInputLock(false);
                    const data = (0, common_helper_1.tryJsonParse)(msg.data);
                    switch (msg.event) {
                        case interfaces_1.SSEEvents.MESSAGE_REPLY_GENERATION_JOB_CREATED:
                            {
                                replyMsg = data.message;
                                const jobInfo = data.message?.asyncJobInfo;
                                const jobId = jobInfo?.jobId ?? '';
                                addWidgetSSETextStream({
                                    index: 0,
                                    isFinal: false,
                                    text: data.message.text ?? '',
                                    replyMessage: replyMsg,
                                    modelStatus: jobInfo.status,
                                    isJob: true
                                });
                                if (jobId) {
                                    setWidgetSending(true);
                                    setWidgetStartJobIds(jobId, true);
                                    startPolling(replyMsg, intervalId);
                                }
                            }
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_SENT:
                            {
                                sentMsg = data.message;
                                pushWidgetChatRecord({ ...data.message, replaceLocalSend: true, status: enums_1.MessageStatusEnum.DONE });
                            }
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLYING:
                            replyMsg = { ...data.message, replaceLocalReply: true };
                            pushWidgetChatRecord(replyMsg);
                            popWidgetToTop(replyMsg.widgetId);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLY_REFERENCE_SOURCE:
                        case interfaces_1.SSEEvents.MESSAGE_REPLY_RECOMMND_QUESTION:
                            pushWidgetChatRecord(data.message);
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
                        case interfaces_1.SSEEvents.DURATION_CALCULATED:
                            break;
                        case interfaces_1.SSEEvents.IMAGE_GEN_PROCESSING:
                            {
                                const jobId = data.imageGenMessageResponse?.jobId ?? '';
                                addWidgetSSEImageStream({
                                    imageGenMessageResponse: data.imageGenMessageResponse,
                                    replyMessage: replyMsg,
                                    genStatus: interfaces_1.ImageStatus.PROCESSING
                                });
                                setTextMessage('');
                                if (jobId) {
                                    const msg = {
                                        ...replyMsg,
                                        imageGenMessageResponse: data.imageGenMessageResponse
                                    };
                                    startPolling(msg, intervalId);
                                }
                            }
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
                        case interfaces_1.SSEEvents.EMBED_OBJ_PUSHED:
                            pushWidgetChatRecord(data.message);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_CONSUME_ENERGY:
                            data.userEnergyInfo && setEnergyInfo(data.userEnergyInfo);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLIED:
                            if (!isPanelImageBot && !data.message?.asyncJobInfo?.jobId) {
                                setWidgetSending(false);
                            }
                            const finalMsg = {
                                ...data.message,
                                status: enums_1.MessageStatusEnum.DONE,
                                createdDate: new Date()
                            };
                            pushWidgetChatRecord(finalMsg);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_INTERNAL_ERROR:
                            setWidgetSending(false);
                            if (isLlmModerationRequest) {
                                const msg = {
                                    ...data.message,
                                    text: backupSentMsg,
                                    type: enums_1.MessageTypeEnum.LLM_MODERATION_REQUEST,
                                    status: enums_1.MessageStatusEnum.DONE,
                                    createdDate: new Date(),
                                    userSentMsg: sentMsg
                                };
                                pushWidgetChatRecord(msg);
                            }
                            else {
                                pushErrorChatRecordHandle(backupSentMsg, retryText, localId, requestData && requestData.embedObjs, requestData && requestData.params, requestData?.isButtonInteraction ? 15 : 1, requestData?.buttonId, requestData?.interactionMsgId, requestData?.componentInputMessage, requestData?.imSlashCommandInput, requestData?.isButtonInteraction);
                            }
                            break;
                        case interfaces_1.SSEEvents.LLM_MODERATION_REQUEST:
                            isLlmModerationRequest = true;
                            const llmModerationRequestMsg = {
                                ...data.message,
                                type: enums_1.MessageTypeEnum.LLM_MODERATION_REQUEST,
                                userSentMsg: sentMsg,
                                text: backupSentMsg
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
                    !!requestData?.isButtonInteraction && typeof callback === 'function' && callback();
                    typeof errorCb === 'function' && errorCb();
                    pushErrorChatRecordHandle(backupSentMsg, retryText, localId, requestData && requestData.embedObjs, requestData && requestData.params, requestData?.isButtonInteraction ? 15 : 1, requestData?.buttonId, requestData?.interactionMsgId, requestData?.componentInputMessage, requestData?.imSlashCommandInput, requestData?.isButtonInteraction);
                    setInputLock(false);
                    setWidgetSending(false);
                    console.error(err);
                    ctrl.abort();
                },
                onclose() {
                    typeof closeCb === 'function' && closeCb();
                }
            }).catch(e => {
                !!requestData?.isButtonInteraction && typeof callback === 'function' && callback();
                typeof errorCb === 'function' && errorCb();
                pushErrorChatRecordHandle(backupSentMsg, retryText, localId, requestData && requestData.embedObjs, requestData && requestData.params, requestData?.isButtonInteraction ? 15 : 1, requestData?.buttonId, requestData?.interactionMsgId, requestData?.componentInputMessage, requestData?.imSlashCommandInput, requestData?.isButtonInteraction, currentErrorMsg.current);
                ctrl.abort();
            });
        });
    }, [isMessageEmpty, widgetId, widgetChatList.length, lastChatId, userId, startPolling, currentErrorMsg]);
    const sendTextMessage = sseRequest;
    return {
        inputLock,
        textMessage: textMessage ?? '',
        setTextMessage,
        clearTextMessage,
        sendTextMessage
    };
}
