"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeaders = exports.LangMap = void 0;
exports.default = useTextMessageSender;
const next_intl_1 = require("next-intl");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_use_1 = require("react-use");
const enums_1 = require("../../../chat/model/enums.js");
const interfaces_1 = require("../../../chat/model/interfaces.js");
const bot_1 = require("../../../common/constants/interfaces/bot.js");
const identityService_1 = require("../../../common/services/identityService.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const defaultVisitorId_1 = require("../../../common/utils/defaultVisitorId.js");
const dom_1 = require("../../../common/utils/dom.js");
const runtime_config_1 = require("../../../common/utils/runtime-config.js");
const tokenizer2_1 = require("../../../common/utils/tokenizer2.js");
const fetch_event_source_1 = require("../../../core/request/fetch-event-source/index.js");
const useCalcGetChatListFn_1 = __importDefault(require("../../../entity/hooks/useCalcGetChatListFn.js"));
const useGetEnergyInfo_1 = __importDefault(require("../../../hooks/user/useGetEnergyInfo.js"));
const sensors_1 = require("../../../lib/sensors/index.js");
const store_1 = require("../../../services/store/index.js");
const useNeteaseEngineToken_1 = __importDefault(require("../../../common/hooks/useNeteaseEngineToken.js"));
const useNotification_1 = require("../../../common/hooks/useNotification.js");
exports.LangMap = {
    en: 'en',
    zh: 'zh-CN',
    'zh-tw': 'zh-TW',
    es: 'es',
    jp: 'ja',
    ru: 'ru',
    ko: 'ko'
};
function useTextMessageSender(botInfo) {
    const botId = (0, react_1.useMemo)(() => {
        return botInfo?.id ?? '';
    }, [botInfo]);
    const pathname = (0, navigation_1.usePathname)();
    const sensors = (0, sensors_1.useSensors)();
    const updateMessage = (0, store_1.useChatStore)(state => state.updateMessage);
    const pushChatRecord = (0, store_1.useChatStore)(state => state.pushChatRecord);
    const setSending = (0, store_1.useChatStore)(state => state.setSending);
    const sending = (0, store_1.useChatStore)(state => state.sending);
    const pushMsgIdtoList = (0, store_1.useChatStore)(state => state.pushMsgIdtoList);
    const textInputMap = (0, store_1.useChatStore)(state => state.textInputMap);
    const setTextInput = (0, store_1.useChatStore)(state => state.setTextInput);
    const pushErrorChatRecord = (0, store_1.useChatStore)(state => state.pushErrorChatRecord);
    const multiBotMap = (0, store_1.useChatStore)(state => state.multiBotMap);
    const addSSeTextStream = (0, store_1.useChatStore)(state => state.addSSeTextStream);
    const addSSeAudioStream = (0, store_1.useChatStore)(state => state.addSSeAudioStream);
    const addSSEImageStream = (0, store_1.useChatStore)(state => state.addSSEImageStream);
    const receiveVoiceUrlFromSSe = (0, store_1.useChatStore)(state => state.receiveVoiceUrlFromSSe);
    const setEnergyInfo = (0, store_1.useUserStore)(state => state.setEnergyInfo);
    const pushAudioIdToQueue = (0, store_1.useChatStore)(state => state.pushAudioIdToQueue);
    const setLoginPopVisible = (0, store_1.useChatStore)(state => state.setLoginPopVisible);
    const pollingChatMsg = (0, store_1.useChatStore)(state => state.pollingChatMsg);
    const deleteUploadFiles = (0, store_1.useChatStore)(state => state.deleteUploadFiles);
    const setDriverChatId = (0, store_1.useChatStore)(state => state.setDriverChatId);
    const setStartJobIds = (0, store_1.useChatStore)(state => state.setStartJobIds);
    const setBotLastMessage = (0, store_1.useBotStore)(state => state.setBotLastMessage);
    const setErrorMsg = (0, store_1.useChatStore)(state => state.setErrorMsg);
    const setNetworkError = (0, store_1.useChatStore)(state => state.setNetworkError);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const botChatSettingMap = (0, store_1.useBotStore)(state => state.botChatSettingMap);
    const { warning, error } = (0, useNotification_1.useNotification)();
    const t = (0, next_intl_1.useTranslations)('chat');
    const tRequest = (0, next_intl_1.useTranslations)('request');
    const { getRequestNeteaseToken } = (0, useNeteaseEngineToken_1.default)();
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const setSSECtrl = (0, store_1.useBotStore)(state => state.setSSECtrl);
    const showChatBotRecommend = (0, store_1.useGlobalStore)(state => state.showChatBotRecommend);
    const getChatList = (0, useCalcGetChatListFn_1.default)('bot');
    const chatList = (0, react_1.useMemo)(() => {
        return multiBotMap[botId]?.chatList ?? [];
    }, [botId, multiBotMap]);
    const botChatSetting = (0, react_1.useMemo)(() => {
        return botChatSettingMap.get(botId) ?? store_1.defaultChatSetting;
    }, [botChatSettingMap, botId]);
    const [textMessage, setTextMessage] = (0, react_1.useState)(textInputMap[botId] ?? '');
    const [inputLock, setInputLock] = (0, react_1.useState)(false);
    const sendingRef = (0, react_1.useRef)(sending);
    const textMessageRef = (0, react_1.useRef)(textMessage);
    const currentErrorMsg = (0, react_1.useRef)();
    const hideRetry = (0, react_1.useRef)(false);
    (0, react_1.useMemo)(() => {
        sendingRef.current = sending;
    }, [sending]);
    (0, react_1.useMemo)(() => {
        textMessageRef.current = textMessage;
    }, [textMessage]);
    (0, react_1.useEffect)(() => {
        setTextInput(botId, textMessage);
    }, [textMessage]);
    (0, react_use_1.useEffectOnce)(() => {
        setTextMessage(textInputMap[botId]);
    });
    (0, react_1.useEffect)(() => {
        setTextMessage(textInputMap[botId] ?? '');
    }, [botId]);
    const clearTextMessage = (0, react_1.useCallback)(() => {
        if (botId) {
            setTextMessage('');
            deleteUploadFiles(botId);
        }
    }, [botId]);
    const startPolling = (0, react_1.useCallback)(async (message, intervalId) => {
        const polling = async () => {
            const res = await pollingChatMsg(message);
            if (res) {
                setSending(false);
                setDriverChatId(`${message.id}`);
                clearInterval(intervalId.id);
                intervalId.id = null;
                getEnergyInfo();
            }
            setNetworkError(botId, !navigator.onLine);
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
    }, [pollingChatMsg]);
    const isMessageEmpty = !(textMessage || '').trim();
    const { botSetting, botGenType, isPanelImageBot } = (botInfo || {});
    const lastChatId = chatList.length > 0 ? chatList[chatList.length - 1].id || chatList[chatList.length - 1].localId : '0';
    const isOpenUseSse = botSetting?.openUseSse;
    const pushErrorChatRecordHandle = (0, react_1.useCallback)((text, retryText, localId, embedObjs, params, messageType, buttonId, interactionMsgId, componentInputMessage, imSlashCommandInput, isButtonInteraction, buttonInteractionErrorMessage, isSSEError = false) => {
        const lastChat = chatList.length > 0 ? chatList[chatList.length - 1] : { id: 0 };
        const id = `errChat${new Date().getTime()}`;
        const hideRetryBtn = hideRetry.current ||
            (!(!(isButtonInteraction && !text && !imSlashCommandInput) && !componentInputMessage) && isSSEError);
        setErrorMsg(id, buttonInteractionErrorMessage || '');
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
            pushErrorChatRecord(errChat, botId);
            if (localId) {
                const removeLocalMsgs = [
                    {
                        status: enums_1.MessageStatusEnum.PROCESSING,
                        type: 'TEXT',
                        text,
                        botId,
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
                        botId,
                        userId,
                        localId: String(BigInt(localId) + BigInt(1)),
                        deleteId: String(BigInt(localId) + BigInt(1))
                    }
                ];
                pushChatRecord(removeLocalMsgs);
                setInputLock(false);
                setSending(false);
            }
        }
        else {
            if (isSSEError) {
                pushErrorChatRecord(errChat, botId);
            }
            else {
                !!buttonInteractionErrorMessage &&
                    warning({
                        content: buttonInteractionErrorMessage
                    });
            }
            setInputLock(false);
            setSending(false);
        }
    }, [botId, chatList, userId, currentErrorMsg, hideRetry]);
    const sseRequest = (0, react_1.useCallback)(async ({ retryText = '', requestData = null, callback = () => null, errorCb = () => null, closeCb = () => null } = {}) => {
        return new Promise(async (resolve) => {
            const ctrl = new AbortController();
            setSSECtrl(ctrl);
            let audioStreamIndex = 0;
            if ((!retryText && isMessageEmpty && !requestData) || sendingRef.current) {
                typeof errorCb === 'function' && errorCb();
            }
            const encodeTextMessage = (0, dom_1.escapeHTML)(textMessageRef.current);
            const res = await (0, tokenizer2_1.getTokenCount)(encodeTextMessage);
            const backupSentMsg = encodeTextMessage;
            if (res > (botInfo?.llmModel?.model?.maxChatToken ?? 1500)) {
                warning({
                    content: t('over_text_length')
                });
                return;
            }
            setInputLock(true);
            setSending(true);
            clearTextMessage();
            const yidunValidate = identityService_1.identityService.getYidunValidate();
            let replyMsg;
            let secenario;
            let SSEBody;
            const isImageBot = botGenType === 'BOT_GEN_TYPE_IMAGE' || botGenType === 'BOT_GEN_TYPE_GIF';
            if (isPanelImageBot) {
                SSEBody = {
                    conversation_scenario: bot_1.ConversationScenario.CONVERSATION_SCENARIO_WEB_CHAT_NORMAL,
                    message: '',
                    messageType: 1,
                    componentInputMessage: requestData.params
                };
            }
            else if (isImageBot) {
                secenario = bot_1.ConversationScenario.CONVERSATION_SCENARIO_BOT_GENERATION;
                if (requestData) {
                    SSEBody = {
                        conversation_scenario: secenario,
                        message: requestData.text,
                        messageType: 1,
                        imageGenMessage: requestData.imageGenMessage
                    };
                }
                else {
                    let genType = bot_1.ImageGenMessageType.IMAGE_GEN_MESSAGE_TYPE_SIMPLE_MESSAGE;
                    if (botGenType === 'BOT_GEN_TYPE_GIF') {
                        genType = bot_1.ImageGenMessageType.IMAGE_GEN_MESSAGE_TYPE_SIMPLE_MESSAGE;
                    }
                    SSEBody = {
                        conversation_scenario: secenario,
                        message: retryText || backupSentMsg,
                        messageType: 1,
                        imageGenMessage: {
                            genType
                        }
                    };
                }
            }
            else if (isOpenUseSse) {
                if (requestData?.isButtonInteraction) {
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
            }
            else {
                secenario = bot_1.ConversationScenario.CONVERSATION_SCENARIO_WEB_CHAT_NORMAL;
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
            const localId = (BigInt(lastChatId || 0) +
                BigInt(1) +
                BigInt(requestData?.imageNumber || 0)).toString();
            const localMsgs = [
                {
                    status: enums_1.MessageStatusEnum.PROCESSING,
                    type: 'REPLY',
                    text: '',
                    botId,
                    userId,
                    localId: String(BigInt(localId) + BigInt(1)),
                    isLocalReply: true
                }
            ];
            if (!isPanelImageBot) {
                localMsgs.unshift({
                    status: enums_1.MessageStatusEnum.PROCESSING,
                    type: 'TEXT',
                    text: SSEBody.message,
                    botId,
                    userId,
                    localId: String(BigInt(localId)),
                    imSlashCommandInput: requestData?.imSlashCommandInput,
                    isLocalSend: true
                });
            }
            if (isImageBot && requestData) {
                localMsgs[0].imageGenMessageResponse = {
                    genParam: {
                        sdParam: { ...(requestData?.imageGenMessage?.panelMessage ?? null), model: requestData?.model },
                        batchCount: requestData.count,
                        batchNumber: requestData.batchNumber,
                        imageNumber: requestData.imageNumber
                    },
                    metadata: {
                        genType: requestData.genType
                    },
                    genStatus: 'DONE'
                };
            }
            if (requestData && requestData.embedObjs) {
                localMsgs[0].embedObjs = requestData.localObjs || requestData.embedObjs;
            }
            if (!(requestData?.isButtonInteraction && !requestData?.text && !requestData?.imSlashCommandInput) &&
                !requestData?.componentInputMessage) {
                pushChatRecord(localMsgs);
            }
            let isLlmModerationRequest = false;
            let sentMsg;
            const intervalId = {};
            let headers;
            let neteaseEngineToken;
            try {
                headers = await (0, exports.getHeaders)();
            }
            catch (e) {
                !!requestData?.isButtonInteraction && typeof callback === 'function' && callback();
                typeof errorCb === 'function' && errorCb();
                return;
            }
            try {
                neteaseEngineToken = await getRequestNeteaseToken();
            }
            catch (e) {
            }
            const URL = `${runtime_config_1.API_URL}/v1/bot/chat/send_message`;
            const body = {
                botId,
                ...SSEBody,
                conversation_scenario: SSEBody.conversation_scenario,
                ...(yidunValidate && { checkIsRobotValidate: yidunValidate })
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
                body: JSON.stringify(body),
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
                        setSending(false);
                    }
                    else if (response.status >= 400 && response.status < 500) {
                        !!requestData?.isButtonInteraction && typeof callback === 'function' && callback();
                        typeof errorCb === 'function' && errorCb();
                        setInputLock(false);
                        setSending(false);
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
                        !!requestData?.isButtonInteraction && typeof callback === 'function' && callback();
                        typeof errorCb === 'function' && errorCb();
                        setInputLock(false);
                        setSending(false);
                        const json = await response.json();
                        pushErrorChatRecordHandle(backupSentMsg, retryText, localId, requestData && requestData.embedObjs, requestData && requestData.params, requestData?.isButtonInteraction ? 15 : 1, requestData?.buttonId, requestData?.interactionMsgId, requestData?.componentInputMessage, requestData?.imSlashCommandInput, requestData?.isButtonInteraction, json.message);
                        ctrl.abort();
                    }
                },
                onmessage(msg) {
                    console.log(msg.event, (0, common_helper_1.tryJsonParse)(msg.data));
                    setInputLock(false);
                    const data = (0, common_helper_1.tryJsonParse)(msg.data);
                    switch (msg.event) {
                        case interfaces_1.SSEEvents.MESSAGE_REPLY_GENERATION_JOB_CREATED:
                            {
                                replyMsg = data.message;
                                const jobInfo = data.message?.asyncJobInfo;
                                const jobId = jobInfo?.jobId ?? '';
                                addSSeTextStream({
                                    index: 0,
                                    isFinal: false,
                                    text: data.message.text ?? '',
                                    replyMessage: replyMsg,
                                    modelStatus: jobInfo.status,
                                    isJob: true
                                });
                                if (jobId) {
                                    setSending(true);
                                    setStartJobIds(jobId, true);
                                    startPolling(replyMsg, intervalId);
                                }
                            }
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_SENT:
                            {
                                if (isImageBot && requestData) {
                                    (data.message || {}).imageGenMessageResponse = {
                                        genParam: {
                                            sdParam: { ...(requestData?.imageGenMessage?.panelMessage ?? null), model: requestData?.model },
                                            batchCount: requestData.count,
                                            batchNumber: requestData.batchNumber,
                                            imageNumber: requestData.imageNumber
                                        },
                                        metadata: {
                                            genType: requestData.genType
                                        },
                                        genStatus: 'DONE'
                                    };
                                }
                                sentMsg = data.message;
                                pushChatRecord({
                                    ...data.message,
                                    replaceLocalSend: true,
                                    status: enums_1.MessageStatusEnum.DONE
                                });
                            }
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLYING:
                            replyMsg = { ...data.message, replaceLocalReply: true };
                            pushChatRecord(replyMsg);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLY_REFERENCE_SOURCE:
                        case interfaces_1.SSEEvents.MESSAGE_REPLY_RECOMMND_QUESTION:
                            pushChatRecord(data.message);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_IS_TEXT:
                            addSSeTextStream({
                                index: 0,
                                isFinal: false,
                                text: data.content,
                                replyMessage: replyMsg
                            });
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_TEXT_DONE:
                            setSending(false);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_VOICE_BYTE:
                            addSSeAudioStream({
                                index: data.voiceBytesIndex,
                                isFinal: false,
                                audio: Uint8Array.from(atob(data.voiceBytes), c => c.charCodeAt(0)).buffer,
                                replyMessage: replyMsg
                            });
                            audioStreamIndex++;
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_VOICE_RECEIVED:
                            addSSeAudioStream({
                                index: audioStreamIndex,
                                isFinal: true,
                                audio: null,
                                replyMessage: replyMsg
                            });
                            receiveVoiceUrlFromSSe(data.voiceFilePath, replyMsg.id, botId);
                            botChatSetting?.isAudioPlayOn && pushAudioIdToQueue(replyMsg.id);
                            break;
                        case interfaces_1.SSEEvents.DURATION_CALCULATED:
                            break;
                        case interfaces_1.SSEEvents.IMAGE_GEN_PROCESSING:
                            {
                                const jobId = data.imageGenMessageResponse?.jobId ?? '';
                                addSSEImageStream({
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
                            addSSEImageStream({
                                imageGenMessageResponse: data.imageGenMessageResponse,
                                replyMessage: replyMsg,
                                genStatus: interfaces_1.ImageStatus.DONE
                            });
                            break;
                        case interfaces_1.SSEEvents.IMAGE_GEN_ERROR:
                            addSSEImageStream({
                                imageGenMessageResponse: data.imageGenMessageResponse,
                                replyMessage: replyMsg,
                                genStatus: interfaces_1.ImageStatus.ERROR
                            });
                            break;
                        case interfaces_1.SSEEvents.EMBED_OBJ_PUSHED:
                            pushChatRecord(data.message);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_CONSUME_ENERGY:
                            data.userEnergyInfo && setEnergyInfo(data.userEnergyInfo);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLIED:
                            if (!isPanelImageBot && !data.message?.asyncJobInfo?.jobId) {
                                setSending(false);
                            }
                            const finalMsg = {
                                ...data.message,
                                status: enums_1.MessageStatusEnum.DONE
                            };
                            pushChatRecord(finalMsg);
                            setBotLastMessage(String(finalMsg.botId), finalMsg);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_INTERNAL_ERROR:
                            setSending(false);
                            if (isLlmModerationRequest) {
                                const msg = {
                                    ...data.message,
                                    text: backupSentMsg,
                                    type: enums_1.MessageTypeEnum.LLM_MODERATION_REQUEST,
                                    status: enums_1.MessageStatusEnum.DONE,
                                    createdDate: new Date(),
                                    userSentMsg: sentMsg
                                };
                                pushChatRecord(msg);
                            }
                            else {
                                pushErrorChatRecordHandle(backupSentMsg, retryText, localId, requestData && requestData.embedObjs, requestData && requestData.params, requestData?.isButtonInteraction ? 15 : 1, requestData?.buttonId, requestData?.interactionMsgId, requestData?.componentInputMessage, requestData?.imSlashCommandInput, requestData?.isButtonInteraction, data?.status?.message, true);
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
                            updateMessage(llmModerationRequestMsg);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLY_UPDATE_HISTORY_MESSAGE:
                            updateMessage(data.message);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLY_CREATE_WHOLD_MESSAGE:
                            pushChatRecord({
                                ...data.message,
                                replaceLocalReply: true
                            });
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_RECOMMEND_BOT_SUCCESS:
                            const botInfo = JSON.parse(data?.extraInfo || {});
                            if (botInfo) {
                                sensors.track('AddBotToChatList', {
                                    bot_id: botInfo.id,
                                    bot_name: botInfo.name,
                                    recommendation_spot: 'New_User_Recommended',
                                    new_user_recommended_time: botInfo.recommend_bot_num
                                });
                                getChatList();
                            }
                            break;
                    }
                },
                onerror(err) {
                    !!requestData?.isButtonInteraction && typeof callback === 'function' && callback();
                    typeof errorCb === 'function' && errorCb();
                    pushErrorChatRecordHandle(backupSentMsg, retryText, localId, requestData && requestData.embedObjs, requestData && requestData.params, requestData?.isButtonInteraction ? 15 : 1, requestData?.buttonId, requestData?.interactionMsgId, requestData?.componentInputMessage, requestData?.imSlashCommandInput, requestData?.isButtonInteraction);
                    setInputLock(false);
                    setSending(false);
                    console.error(err);
                    ctrl.abort();
                },
                onclose() {
                    setSSECtrl();
                    setInputLock(false);
                    setSending(false);
                    typeof closeCb === 'function' && closeCb();
                }
            }).catch(e => {
                !!requestData?.isButtonInteraction && typeof callback === 'function' && callback();
                typeof errorCb === 'function' && errorCb();
                pushErrorChatRecordHandle(backupSentMsg, retryText, localId, requestData && requestData.embedObjs, requestData && requestData.params, requestData?.isButtonInteraction ? 15 : 1, requestData?.buttonId, requestData?.interactionMsgId, requestData?.componentInputMessage, requestData?.imSlashCommandInput, requestData?.isButtonInteraction, currentErrorMsg.current);
                ctrl.abort();
            });
        });
    }, [
        isOpenUseSse,
        isMessageEmpty,
        botGenType,
        botId,
        chatList.length,
        lastChatId,
        userId,
        botChatSetting,
        startPolling,
        currentErrorMsg
    ]);
    const sendTextMessage = sseRequest;
    return {
        inputLock,
        textMessage: textMessage ?? '',
        setTextMessage,
        clearTextMessage,
        sendTextMessage,
        setTextInput
    };
}
const getHeaders = async () => {
    const token = identityService_1.identityService.getToken();
    const language = identityService_1.identityService.getLanguage() || 'en';
    const commonHeaders = {
        platform: 'web',
        version: '1.0.0',
        'Accept-Language': exports.LangMap[language]
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
