"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useVoiceMessageSender;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const enums_1 = require("../../../chat/model/enums.js");
const interfaces_1 = require("../../../chat/model/interfaces.js");
const bot_1 = require("../../../common/constants/interfaces/bot.js");
const identityService_1 = require("../../../common/services/identityService.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const runtime_config_1 = require("../../../common/utils/runtime-config.js");
const fetch_event_source_1 = require("../../../core/request/fetch-event-source/index.js");
const useCalcGetChatListFn_1 = __importDefault(require("../../../entity/hooks/useCalcGetChatListFn.js"));
const useGetEnergyInfo_1 = __importDefault(require("../../../hooks/user/useGetEnergyInfo.js"));
const sensors_1 = require("../../../lib/sensors/index.js");
const store_1 = require("../../../services/store/index.js");
const useNeteaseEngineToken_1 = __importDefault(require("../../../common/hooks/useNeteaseEngineToken.js"));
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const useTextMessageSender_1 = require("./useTextMessageSender.js");
function useVoiceMessageSender({ audioType, clearRecord, botInfo }) {
    const botId = (0, react_1.useMemo)(() => {
        return botInfo?.id ?? '';
    }, [botInfo]);
    const multiBotMap = (0, store_1.useChatStore)(state => state.multiBotMap);
    const setSending = (0, store_1.useChatStore)(state => state.setSending);
    const pushMsgIdtoList = (0, store_1.useChatStore)(state => state.pushMsgIdtoList);
    const pushErrorChatRecord = (0, store_1.useChatStore)(state => state.pushErrorChatRecord);
    const sending = (0, store_1.useChatStore)(state => state.sending);
    const addSSeTextStream = (0, store_1.useChatStore)(state => state.addSSeTextStream);
    const receiveVoiceUrlFromSSe = (0, store_1.useChatStore)(state => state.receiveVoiceUrlFromSSe);
    const pushChatRecord = (0, store_1.useChatStore)(state => state.pushChatRecord);
    const addSSeAudioStream = (0, store_1.useChatStore)(state => state.addSSeAudioStream);
    const addSSEImageStream = (0, store_1.useChatStore)(state => state.addSSEImageStream);
    const setEnergyInfo = (0, store_1.useUserStore)(state => state.setEnergyInfo);
    const pushAudioIdToQueue = (0, store_1.useChatStore)(state => state.pushAudioIdToQueue);
    const setLoginPopVisible = (0, store_1.useChatStore)(state => state.setLoginPopVisible);
    const setBotLastMessage = (0, store_1.useBotStore)(state => state.setBotLastMessage);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const updateMessage = (0, store_1.useChatStore)(state => state.updateMessage);
    const botChatSettingMap = (0, store_1.useBotStore)(state => state.botChatSettingMap);
    const setSSECtrl = (0, store_1.useBotStore)(state => state.setSSECtrl);
    const setStartJobIds = (0, store_1.useChatStore)(state => state.setStartJobIds);
    const pollingChatMsg = (0, store_1.useChatStore)(state => state.pollingChatMsg);
    const setDriverChatId = (0, store_1.useChatStore)(state => state.setDriverChatId);
    const showChatBotRecommend = (0, store_1.useGlobalStore)(state => state.showChatBotRecommend);
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const sensors = (0, sensors_1.useSensors)();
    const { error, warning } = (0, useNotification_1.useNotification)();
    const errorT = (0, next_intl_1.useTranslations)('request.error');
    const { getRequestNeteaseToken } = (0, useNeteaseEngineToken_1.default)();
    const getChatList = (0, useCalcGetChatListFn_1.default)('bot');
    const chatList = (0, react_1.useMemo)(() => {
        return multiBotMap[botId]?.chatList ?? [];
    }, [botId, multiBotMap]);
    const botChatSetting = (0, react_1.useMemo)(() => {
        return botChatSettingMap.get(botId) ?? store_1.defaultChatSetting;
    }, [botChatSettingMap, botId]);
    const { botSetting, botGenType } = (botInfo || {});
    const lastChatId = chatList.length > 0 ? chatList[chatList.length - 1].id : '0';
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
    const pushErrorChatRecordHandle = (blob, recordState, localId) => {
        setSending(false);
        clearRecord();
        const lastChat = chatList.length > 0 ? chatList[chatList.length - 1] : { id: 0 };
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
            pushErrorChatRecord(errChat, botId);
        };
        reader.readAsDataURL(blob);
        if (localId) {
            const localMsgs = [
                {
                    status: enums_1.MessageStatusEnum.PROCESSING,
                    type: 'VOICE',
                    voiceUrl: URL.createObjectURL(blob),
                    botId,
                    duration: recordState.duration,
                    userId,
                    localId: String(BigInt(localId)),
                    deleteId: String(BigInt(localId))
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
            pushChatRecord(localMsgs);
        }
    };
    const sseRequest = async ({ retryText = '', callback = () => null, recordState } = {}) => {
        if (sending) {
            return;
        }
        let retryBlob = null;
        return new Promise(async (resolve) => {
            const ctrl = new AbortController();
            setSSECtrl(ctrl);
            let audioStreamIndex = 0;
            const blob = recordState?.recordBlob;
            setSending(true);
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
            let secenario;
            let SSEBody;
            if (botGenType === 'BOT_GEN_TYPE_IMAGE') {
                secenario = bot_1.ConversationScenario.CONVERSATION_SCENARIO_BOT_GENERATION;
                SSEBody = {
                    conversation_scenario: secenario,
                    imageGenMessage: {
                        genType: bot_1.ImageGenMessageType.IMAGE_GEN_MESSAGE_TYPE_SIMPLE_MESSAGE
                    }
                };
            }
            else if (botSetting?.openUseSse) {
                secenario = bot_1.ConversationScenario.CONVERSATION_SCENARIO_IMMERSION_WEB_CHAT;
                SSEBody = {
                    conversation_scenario: secenario
                };
            }
            else {
                secenario = bot_1.ConversationScenario.CONVERSATION_SCENARIO_WEB_CHAT_NORMAL;
                SSEBody = {
                    conversation_scenario: secenario
                };
            }
            const localId = String(BigInt(lastChatId) + BigInt(1));
            const intervalId = {};
            const localMsgs = [
                {
                    status: enums_1.MessageStatusEnum.PROCESSING,
                    type: 'VOICE',
                    voiceUrl: URL.createObjectURL((retryText && retryBlob) || blob),
                    botId,
                    duration: recordState.duration,
                    userId,
                    localId: String(BigInt(localId)),
                    isLocalSend: true
                },
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
            pushChatRecord(localMsgs);
            const headers = await (0, useTextMessageSender_1.getHeaders)();
            const isLlmModerationRequest = false;
            let sentMsg;
            let neteaseEngineToken;
            try {
                neteaseEngineToken = await getRequestNeteaseToken();
            }
            catch (e) {
            }
            (0, fetch_event_source_1.fetchEventSource)(`${runtime_config_1.API_URL}/v1/bot/chat/send_message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                    ...headers,
                    'myshell-service-name': 'organics-api',
                    'myshell-security-token': neteaseEngineToken
                },
                body: JSON.stringify({
                    botId,
                    voiceBytes: Buffer.from(await (retryBlob || blob).arrayBuffer()).toString('base64'),
                    audioType,
                    messageType: 2,
                    ...SSEBody,
                    ...(yidunValidate && { checkIsRobotValidate: yidunValidate })
                }),
                signal: ctrl?.signal,
                openWhenHidden: true,
                async onopen(response) {
                    if (response.status === 500) {
                        setSending(false);
                        ctrl?.abort();
                        pushErrorChatRecordHandle((retryText && retryBlob) || blob, recordState, localId);
                        return;
                    }
                    setSending(false);
                    resolve(true);
                    typeof clearRecord === 'function' && clearRecord();
                    if (response.ok) {
                        typeof callback === 'function' && callback();
                    }
                    else if (response.status == 401) {
                        ctrl?.abort();
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
                            ctrl?.abort();
                            return;
                        }
                        warning({
                            content: json.message
                        });
                        ctrl?.abort();
                    }
                    else {
                        ctrl?.abort();
                    }
                },
                onmessage(msg) {
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
                            sentMsg = data.message;
                            pushChatRecord({ ...data.message, replaceLocalSend: true, status: enums_1.MessageStatusEnum.DONE });
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_REPLYING:
                            replyMsg = { ...data.message, replaceLocalReply: true };
                            pushChatRecord(replyMsg);
                            pushMsgIdtoList(replyMsg.id);
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
                        case interfaces_1.SSEEvents.MESSAGE_CONSUME_ENERGY:
                            data.userEnergyInfo && setEnergyInfo(data.userEnergyInfo);
                            break;
                        case interfaces_1.SSEEvents.DURATION_CALCULATED:
                            break;
                        case interfaces_1.SSEEvents.IMAGE_GEN_PROCESSING:
                            const jobId = data.imageGenMessageResponse?.jobId ?? '';
                            addSSEImageStream({
                                imageGenMessageResponse: data.imageGenMessageResponse,
                                replyMessage: replyMsg,
                                genStatus: interfaces_1.ImageStatus.PROCESSING
                            });
                            if (jobId) {
                                const msg = {
                                    ...replyMsg,
                                    imageGenMessageResponse: data.imageGenMessageResponse
                                };
                                startPolling(msg, intervalId);
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
                        case interfaces_1.SSEEvents.MESSAGE_REPLIED:
                            const lastMsg = chatList.length > 0 ? chatList[chatList.length - 1] : { id: 0 };
                            if (lastMsg.type === enums_1.MessageTypeEnum.LLM_MODERATION_REQUEST) {
                                return;
                            }
                            setSending(false);
                            const msg = {
                                ...data.message,
                                status: enums_1.MessageStatusEnum.DONE,
                                createdDate: new Date()
                            };
                            pushChatRecord(msg);
                            setBotLastMessage(String(msg.botId), msg);
                            break;
                        case interfaces_1.SSEEvents.MESSAGE_INTERNAL_ERROR:
                            setSending(false);
                            if (isLlmModerationRequest) {
                                const msg = {
                                    ...data.message,
                                    text: sentMsg.text,
                                    type: enums_1.MessageTypeEnum.LLM_MODERATION_REQUEST,
                                    status: enums_1.MessageStatusEnum.DONE,
                                    createdDate: new Date(),
                                    userSentMsg: sentMsg
                                };
                                pushChatRecord(msg);
                            }
                            else {
                                pushErrorChatRecordHandle((retryText && retryBlob) || blob, recordState, localId);
                            }
                            break;
                        case interfaces_1.SSEEvents.LLM_MODERATION_REQUEST:
                            const llmModerationRequestMsg = {
                                ...data.message,
                                tye: enums_1.MessageTypeEnum.LLM_MODERATION_REQUEST,
                                userSentMsg: sentMsg,
                                text: sentMsg.text
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
                    pushErrorChatRecordHandle((retryText && retryBlob) || blob, recordState, localId);
                    setSending(false);
                    console.error(err);
                    ctrl?.abort();
                },
                onclose() {
                    setSSECtrl();
                    setSending(false);
                }
            }).catch(e => {
                pushErrorChatRecordHandle((retryText && retryBlob) || blob, recordState, localId);
                ctrl?.abort();
            });
        });
    };
    const sendVoiceMessage = sseRequest;
    return {
        sendVoiceMessage
    };
}
