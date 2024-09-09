import { enableMapSet } from 'immer';
import { last } from 'lodash-es';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getBotJobInfo } from '../../apis/bot.js';
import { Scenario, uploadFileToS3WithProgress } from '../../apis/common.js';
import { getImageParams } from '../../chat/model/api.js';
import { MessageStatusEnum, MessageTypeEnum, ModelStatusEnum } from '../../chat/model/enums.js';
import { ImageStatus } from '../../chat/model/interfaces.js';
import { generateWidgetRunningText } from '../../common/utils/chat.js';
import { limitQueue } from '../../common/utils/limitQueue.js';
import { useUserStore } from '../../services/store/user.js';
import { useBotStore } from './bot.js';
import chatIdbService from '../../chat/model/chatIdbService.js';
import { identityService } from '../../common/services/identityService.js';
import { createChatCommonSlice } from '../../chat-new/services/chatCommonSlice.js';
enableMapSet();
const fileQueue = limitQueue(1);
const DEFAULT_STATE = {
    multiPublishMap: {},
    selectedDeleteChatList: [],
    playingAudio: null,
    audioQueue: [],
    sending: false,
    startJobIds: [],
    lastInputMethod: 'DirectInput',
    sentMsgIdList: [],
    textInputMap: {},
    driverChatId: '',
    isChatDriving: false,
    isOpenContextmenu: false,
    copyText: '',
    loginPopVisible: false,
    chatBodyType: '',
    isKol: false,
    transactionDisplaySet: new Set(),
    imageParams: {},
    imagePanelParams: {},
    fileUpload: { uploading: null, filesMap: {}, deletedList: [], alert: {}, dragModal: false },
    reEditTriggerred: false,
    errorMsgList: {},
    computed: {
        get currentUserId() {
            return useUserStore.getState().userId;
        }
    },
    errorChatRecordList: [],
    hasUnRead: false
};
const initTransactionDisplaySet = () => {
    if (typeof window !== 'undefined') {
        return identityService.getTransactionDisplaySet();
    }
    return new Set();
};
const initTextInputMap = () => {
    if (typeof window !== 'undefined') {
        return identityService.getTextInputMap();
    }
    return {};
};
const createChatSlice = (set, get) => {
    return {
        ...DEFAULT_STATE,
        textInputMap: initTextInputMap(),
        transactionDisplaySet: initTransactionDisplaySet(),
        generateMultiBotMap(botList) {
            set(state => {
                for (const bot of botList) {
                    if (!state.multiBotMap[String(bot.id)]) {
                        state.multiBotMap[String(bot.id)] = {
                            chatList: [],
                            chatDic: new Map()
                        };
                    }
                }
                useBotStore.getState().batchSetBotLastMessage(botList);
            }, false, 'generateMultiBotMap');
        },
        setMultiPublishMap(image, item) {
            set(state => {
                if (state.multiPublishMap[image]) {
                    delete state.multiPublishMap[image];
                }
                else {
                    state.multiPublishMap[image] = item;
                }
            }, false, 'setMultiPublishMap');
        },
        clearMultiPublishMap() {
            set(state => {
                state.multiPublishMap = {};
            }, false, 'clearMultiPublishMap');
        },
        removeBotMap(botId) {
            set(state => {
                if (state.multiBotMap[botId]) {
                    delete state.multiBotMap[botId];
                }
            }, false, 'removeBotMap');
        },
        clearChatRecord() {
            set(state => {
                state.multiBotMap = {};
            }, false, 'clearChatRecord');
        },
        setLastInputMethod(lastInputMethod) {
            set({ lastInputMethod }, false, 'setLastInputMethod');
        },
        setSending(sending) {
            set(state => {
                state.sending = sending;
            }, false, 'setSending');
        },
        setStartJobIds(jobId, isAdd) {
            set(state => {
                state.startJobIds = isAdd
                    ? [...(state.startJobIds || []), jobId]
                    : state.startJobIds.filter(item => item != jobId);
            }, false, 'setStartJobIds');
        },
        pushAudioIdToQueue(audioId) {
            set(state => {
                state.audioQueue.push(audioId);
                state.audioQueue = Array.from(new Set(state.audioQueue));
            }, false, 'pushAudioIdToQueue');
        },
        setErrorMsg(chatId, msg) {
            set(state => {
                if (!state.errorMsgList) {
                    state.errorMsgList = {};
                }
                state.errorMsgList[chatId] = msg;
            }, true, 'setErrorMsg');
        },
        removePlayedAudio(id) {
            set(state => {
                state.audioQueue = state.audioQueue.filter(audioId => audioId !== id);
            }, false, 'removePlayedAudio');
        },
        clearAudioQueue() {
            set(state => {
                state.audioQueue = [];
                state.playingAudio = null;
                state.sentMsgIdList = [];
            }, false, 'clearAudioQueue');
        },
        changePlayingAudio(audioId) {
            set(state => {
                state.playingAudio = audioId ?? null;
            }, false, 'changePlayingAudio');
        },
        addTextStream(text) {
            const botMsgs = get().multiBotMap[String(text.replyMessage.botId)];
            if (!botMsgs || !botMsgs?.chatDic?.has(text.replyMessage.id)) {
                get().addHistoryRecord(text.replyMessage);
            }
            set(state => {
                const msg = state.multiBotMap[String(text.replyMessage.botId)].chatDic.get(text.replyMessage.id);
                msg.textStream = msg.textStream ?? [];
                msg.textStream.push(text);
                msg.text = msg.textStream
                    .sort((a, b) => (a.index > b.index ? 1 : -1))
                    .map(t => t.text)
                    .join('');
                state.multiBotMap[String(text.replyMessage.botId)].chatDic.set(text.replyMessage.id, { ...msg });
                state.multiBotMap[String(text.replyMessage.botId)].chatList = [
                    ...state.multiBotMap[String(text.replyMessage.botId)].chatDic.values()
                ]
                    .filter(chat => chat.userId == state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
            }, false, 'addTextStream');
        },
        replaceRegeneratedVoice(msg, voiceUrl, voiceFileDurationSeconds, audioSpeed) {
            set(state => {
                state.multiBotMap[String(msg.botId)].chatDic.set(msg.id, {
                    ...msg,
                    voiceUrl,
                    voiceFileDurationSeconds,
                    audioSpeed
                });
                state.multiBotMap[String(msg.botId)].chatList = [...state.multiBotMap[String(msg.botId)].chatDic.values()]
                    .filter(chat => chat.userId == state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
            });
        },
        addSSeTextStream(detail) {
            set(state => {
                const msg = state.multiBotMap[String(detail.replyMessage.botId)].chatDic.get(detail.replyMessage.id);
                if (msg.status === MessageStatusEnum.CANCELING || msg.status === MessageStatusEnum.CANCELED)
                    return;
                if (detail.isJob) {
                    msg.text = detail.text;
                }
                else {
                    msg.text += detail.text;
                }
                msg.asyncJobInfo = {
                    ...(detail?.replyMessage?.asyncJobInfo || {}),
                    status: detail.modelStatus ?? ''
                };
                msg.embedObjs = detail?.replyMessage?.embedObjs || [];
                msg.extraInfo = detail?.replyMessage?.extraInfo || {};
                msg.runningError = detail?.replyMessage?.runningError;
                msg.componentContainer = detail?.replyMessage?.componentContainer;
                state.multiBotMap[String(detail.replyMessage.botId)].chatDic.set(detail.replyMessage.id, {
                    ...msg,
                    inputSetting: detail?.replyMessage?.inputSetting
                });
                state.multiBotMap[String(detail.replyMessage.botId)].chatList = [
                    ...state.multiBotMap[String(detail.replyMessage.botId)].chatDic.values()
                ]
                    .filter(chat => chat.userId == state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
            }, false, 'addSSeTextStream');
        },
        receiveVoiceUrlFromSSe(voiceUrl, msgUid, botId) {
            set(state => {
                const msg = state.multiBotMap[botId].chatDic.get(msgUid);
                msg.voiceUrl = voiceUrl;
                msg.audioStream = [];
                state.multiBotMap[botId].chatDic.set(msgUid, { ...msg });
                state.multiBotMap[botId].chatList = [...state.multiBotMap[botId].chatDic.values()]
                    .filter(chat => chat.userId == state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
            }, false, 'receiveVoiceUrlFromSSe');
        },
        addSSeAudioStream(audio) {
            set(state => {
                const msg = state.multiBotMap[String(audio.replyMessage.botId)].chatDic.get(audio.replyMessage.id);
                if (msg.status === MessageStatusEnum.CANCELING || msg.status === MessageStatusEnum.CANCELED)
                    return;
                msg.audioStream = [...(msg.audioStream ?? []), audio];
                state.multiBotMap[String(audio.replyMessage.botId)].chatDic.set(audio.replyMessage.id, { ...msg });
            }, false, 'addSSeAudioStream');
        },
        addSSEImageStream(data) {
            set(state => {
                const msg = state.multiBotMap[String(data.replyMessage.botId)].chatDic.get(data.replyMessage.id);
                if (msg.status === MessageStatusEnum.CANCELING || msg.status === MessageStatusEnum.CANCELED)
                    return;
                msg.imageGenMessageResponse = {
                    ...(msg?.imageGenMessageResponse ?? {}),
                    ...(data?.imageGenMessageResponse || {}),
                    metadata: msg?.imageGenMessageResponse?.metadata || data.imageGenMessageResponse?.metadata,
                    genStatus: data.genStatus
                };
                state.multiBotMap[String(data.replyMessage.botId)].chatDic.set(data.replyMessage.id, {
                    ...msg
                });
                state.multiBotMap[String(data.replyMessage.botId)].chatList = [
                    ...state.multiBotMap[String(data.replyMessage.botId)].chatDic.values()
                ]
                    .filter(chat => chat.userId == state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
            }, false, 'addSSeAudioStream');
        },
        addTranslationStreamNew(message, content) {
            const botMsgs = get().multiBotMap[message.botId];
            if (!botMsgs || !botMsgs?.chatDic?.has(message.id)) {
                get().addHistoryRecord(message);
            }
            set(state => {
                const msg = state.multiBotMap[message.botId].chatDic.get(message.id);
                msg.translation += content;
                state.multiBotMap[message.botId].chatDic.set(message.id, { ...msg });
                state.multiBotMap[message.botId].chatList = [...state.multiBotMap[message.botId].chatDic.values()]
                    .filter(chat => chat.userId === state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
            }, false, 'addTranslationStreamNew');
        },
        addTranslationStream(translation) {
            if (translation.isFinal) {
                return;
            }
            const botMsgs = get().multiBotMap[String(translation.message.botId)];
            if (!botMsgs.chatDic.has(translation.message.id)) {
                get().addHistoryRecord(translation.message);
            }
            set(state => {
                const msg = state.multiBotMap[String(translation.message.botId)].chatDic.get(translation.message.id);
                msg.translationStream = msg.translationStream || [];
                msg.translationStream.push(translation);
                msg.translation = msg.translationStream
                    .sort((a, b) => (a.index > b.index ? 1 : -1))
                    .map(t => t.text)
                    .join('');
                state.multiBotMap[String(translation.message.botId)].chatDic.set(translation.message.id, { ...msg });
                state.multiBotMap[String(translation.message.botId)].chatList = [
                    ...state.multiBotMap[String(translation.message.botId)].chatDic.values()
                ]
                    .filter(chat => chat.userId == state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
            }, false, 'addTranslationStream');
        },
        setTranslatedText(message) {
            set(state => {
                const msg = state.multiBotMap[String(message.botId)].chatDic.get(message.id);
                msg.translation = message.translation;
                state.multiBotMap[String(message.botId)].chatDic.set(message.id, { ...msg });
            }, false, 'setTranslatedText');
        },
        updateMessage(message) {
            get().addHistoryRecord(message);
        },
        pushChatRecord(message) {
            get().addHistoryRecord(message);
        },
        addHistoryRecord(messages) {
            const map = new Map();
            const msgArr = Array.isArray(messages) ? messages : [messages];
            const includedBots = new Set(msgArr.map(msg => String(msg.botId)));
            for (const msg of msgArr) {
                if (!map.has(String(msg.botId))) {
                    map.set(String(msg.botId), []);
                }
                map.get(String(msg.botId)).push(msg);
            }
            set(state => {
                for (const botId of [...map.keys()]) {
                    if (!state.multiBotMap[botId]) {
                        state.multiBotMap[botId] = {
                            chatList: [],
                            chatDic: new Map()
                        };
                    }
                    const botMsgs = state.multiBotMap[botId];
                    const newMessages = map.get(botId);
                    for (const msg of newMessages) {
                        if (msg.replaceLocalSend) {
                            const msgs = [...botMsgs.chatDic.values()];
                            const matchedMsg = msgs.find(msg => msg.isLocalSend);
                            if (matchedMsg) {
                                botMsgs.chatDic.delete(matchedMsg.localId);
                            }
                        }
                        if (msg.replaceLocalReply) {
                            const msgs = [...botMsgs.chatDic.values()];
                            const matchedMsg = msgs.find(msg => msg.isLocalReply);
                            if (matchedMsg) {
                                if (msg.status === MessageStatusEnum.CANCELING || msg.status === MessageStatusEnum.CANCELED) {
                                    botMsgs.chatDic.set(matchedMsg.localId, { ...matchedMsg, status: msg.status });
                                }
                                else {
                                    botMsgs.chatDic.delete(matchedMsg.localId);
                                }
                            }
                        }
                        if (msg.deleteId) {
                            botMsgs.chatDic.delete(msg.deleteId);
                        }
                        if (!msg.deleteId) {
                            const oldMsg = botMsgs.chatDic.get(msg.id);
                            if (oldMsg?.status === 'CANCELED' || (oldMsg?.status === 'CANCELING' && msg.status !== 'CANCELED'))
                                return;
                            state.multiBotMap[botId].chatDic.set(msg.localId || msg.id, {
                                ...msg,
                                audioStream: oldMsg?.audioStream ? oldMsg?.audioStream : msg.audioStream,
                                textStream: oldMsg?.textStream ? oldMsg?.textStream : msg.textStream,
                                imageGenMessageResponse: oldMsg?.imageGenMessageResponse
                                    ? oldMsg?.imageGenMessageResponse
                                    : msg.imageGenMessageResponse,
                                translationStream: oldMsg?.translationStream ? oldMsg?.translationStream : msg.translationStream
                            });
                        }
                        const allMsgs = [...state.multiBotMap[botId].chatDic.values()].filter(chat => chat.userId == state.computed.currentUserId);
                        const localMsgs = allMsgs
                            .filter(msg => msg.isLocalSend || msg.isLocalReply)
                            .sort((a, b) => {
                            if (a.isLocalSend && !b.isLocalSend) {
                                return -1;
                            }
                            if (b.localReply && !a.localReply) {
                                return -1;
                            }
                            return 0;
                        });
                        const oldMsgs = allMsgs
                            .filter(msg => !msg.isLocalSend && !msg.isLocalReply)
                            .sort((a, b) => (BigInt(a.id || a.localId || 0) - BigInt(b.id || b.localId || 0) >= 0 ? 1 : -1));
                        const newChatList = [...oldMsgs, ...localMsgs];
                        state.multiBotMap[botId].chatList = newChatList;
                        if (includedBots.has(botId)) {
                            if (state.computed.currentUserId) {
                                chatIdbService.storeChat(Number(state.computed.currentUserId), botId, newChatList.slice(-10));
                            }
                        }
                    }
                }
            }, false, 'addHistoryRecord');
        },
        clearAndAddHistoryRecords(botId, messages) {
            set(state => {
                const sortedChatList = messages
                    .filter(chat => chat.userId == state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
                if (state.multiBotMap[botId]) {
                    state.multiBotMap[botId].chatList = sortedChatList;
                    state.multiBotMap[botId].chatDic.clear();
                    sortedChatList.forEach(chat => {
                        state.multiBotMap[botId].chatDic.set(chat.id, chat);
                    });
                }
                if (state.computed.currentUserId) {
                    chatIdbService.storeChat(Number(state.computed.currentUserId), botId, sortedChatList.slice(-10));
                }
            });
        },
        removeHistoryRecord(messages) {
            const map = new Map();
            const msgArr = Array.isArray(messages) ? messages : [messages];
            const includedBots = new Set(msgArr.map(msg => String(msg.botId)));
            for (const msg of msgArr) {
                if (!map.has(String(msg.botId))) {
                    map.set(String(msg.botId), []);
                }
                map.get(String(msg.botId)).push(msg);
            }
            set(state => {
                for (const botId of [...map.keys()]) {
                    if (!state.multiBotMap[botId]) {
                        state.multiBotMap[botId] = {
                            chatList: [],
                            chatDic: new Map()
                        };
                    }
                    const newMessages = map.get(botId);
                    for (const msg of newMessages) {
                        state.multiBotMap[botId].chatDic.delete(msg.id);
                        const sortedChatList = [...state.multiBotMap[botId].chatDic.values()]
                            .filter(chat => chat.userId == state.computed.currentUserId)
                            .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
                        state.multiBotMap[botId].chatList = sortedChatList;
                        if (includedBots.has(botId)) {
                            if (state.computed.currentUserId) {
                                chatIdbService.storeChat(Number(state.computed.currentUserId), botId, sortedChatList.slice(-10));
                            }
                        }
                    }
                }
            }, false, 'removeHistoryRecord');
        },
        removeHistoryRecordExceptSpecifiedMessages(botId, messageIds) {
            set(state => {
                if (!state.multiBotMap[botId]) {
                    return;
                }
                const keepedChatList = state.multiBotMap[botId].chatList.filter(chat => messageIds.some(c => c === chat.id));
                const sortedChatList = keepedChatList
                    .filter(chat => chat.userId == state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
                state.multiBotMap[botId].chatList = [...sortedChatList];
                if (state.computed.currentUserId) {
                    chatIdbService.storeChat(Number(state.computed.currentUserId), botId, sortedChatList.slice(-10));
                }
                state.multiBotMap[botId].chatDic.clear();
                for (const msg of keepedChatList) {
                    state.multiBotMap[botId].chatDic.set(msg.id, msg);
                }
            }, false, 'removeHistoryRecordExceptSpecifiedMessages');
        },
        getBotLastValidInteractionMessage(botId) {
            const chatList = get().multiBotMap[botId]?.chatList ?? [];
            const validInteractionChatList = chatList.filter(chat => (chat.type === MessageTypeEnum.REPLY ||
                chat.type === MessageTypeEnum.TEXT ||
                chat.type === MessageTypeEnum.VOICE) &&
                chat.status === MessageStatusEnum.DONE);
            const validChatLen = validInteractionChatList.length;
            return validInteractionChatList[validChatLen - 1];
        },
        addDeleteChat(chat) {
            if (get().selectedDeleteChatList.some(c => c.id === chat.id)) {
                return;
            }
            set(state => {
                state.selectedDeleteChatList.push(chat);
            }, false, 'addDeleteChat');
        },
        removeDeleteChat(chat) {
            set(state => {
                state.selectedDeleteChatList = state.selectedDeleteChatList.filter(c => c.id !== chat.id);
            }, false, 'removeDeleteChat');
        },
        toggleAllDeleteChat(botId, isPanelImageBot) {
            set(state => {
                const currentBot = state.multiBotMap[botId];
                if (isPanelImageBot) {
                    const chatList = currentBot.chatList
                        .filter(c => c.status === MessageStatusEnum.DONE || c.status === MessageStatusEnum.ERROR)
                        .filter(chat => chat.type === MessageTypeEnum.REPLY ||
                        chat.type === MessageTypeEnum.VOICE_CALL_REPLY ||
                        chat.type === MessageTypeEnum.GREETING);
                    if (chatList.length === state.selectedDeleteChatList.length) {
                        state.selectedDeleteChatList = [];
                    }
                    else {
                        state.selectedDeleteChatList = chatList;
                    }
                }
                else if (currentBot.chatList.filter(c => c.status === MessageStatusEnum.DONE || c.status === MessageStatusEnum.ERROR)
                    .length === state.selectedDeleteChatList.length) {
                    state.selectedDeleteChatList = [];
                }
                else {
                    state.selectedDeleteChatList = currentBot.chatList.filter(c => c.status === MessageStatusEnum.DONE || c.status === MessageStatusEnum.ERROR);
                }
            }, false, 'toggleAllDeleteChat');
        },
        clearDeleteChat() {
            set(state => {
                state.selectedDeleteChatList = [];
            }, false, 'clearDeleteChat');
        },
        pushErrorChatRecord(chat, botId) {
            const userId = get().computed.currentUserId;
            const storageKey = `errChatRecord-${botId}-${userId}`;
            const errChatRecord = localStorage.getItem(storageKey)
                ? JSON.parse(localStorage.getItem(storageKey))
                : [];
            errChatRecord.push({
                ...chat,
                userId
            });
            localStorage.setItem(storageKey, JSON.stringify(errChatRecord));
            set(state => {
                state.errorChatRecordList = errChatRecord || [];
            }, false, 'pushErrorChatRecord');
        },
        removeErrorChatRecord(chatId, botId) {
            const userId = get().computed.currentUserId;
            const storageKey = `errChatRecord-${botId}-${userId}`;
            const errChatRecord = localStorage.getItem(storageKey)
                ? JSON.parse(localStorage.getItem(storageKey))
                : [];
            const filteredErrChatRecord = errChatRecord.filter((err) => err.id !== chatId);
            localStorage.setItem(storageKey, JSON.stringify(filteredErrChatRecord));
            set(state => {
                state.errorChatRecordList = filteredErrChatRecord;
            }, false, 'removeErrorChatRecord');
        },
        replaceStreamWithNormalMessage(currentBotId, refreshAll = false) {
            set(state => {
                for (const botId in state.multiBotMap) {
                    if (refreshAll) {
                        state.multiBotMap[botId].chatList = state.multiBotMap[botId].chatList.map(chat => {
                            if ((chat.type === MessageTypeEnum.REPLY || chat.type === MessageTypeEnum.GREETING) &&
                                ((chat.audioStream && chat.audioStream.length !== 0) ||
                                    (chat.textStream && chat.textStream.length !== 0))) {
                                if (chat.status === MessageStatusEnum.DONE || chat.status === MessageStatusEnum.ERROR) {
                                    chat.audioStream = [];
                                    chat.textStream = [];
                                }
                            }
                            return chat;
                        });
                    }
                    else if (botId !== currentBotId) {
                        state.multiBotMap[botId].chatList = state.multiBotMap[botId].chatList.map(chat => {
                            if ((chat.type === MessageTypeEnum.REPLY || chat.type === MessageTypeEnum.GREETING) &&
                                ((chat.audioStream && chat.audioStream.length !== 0) ||
                                    (chat.textStream && chat.textStream.length !== 0))) {
                                if (chat.status === MessageStatusEnum.DONE || chat.status === MessageStatusEnum.ERROR) {
                                    chat.audioStream = [];
                                    chat.textStream = [];
                                }
                            }
                            return chat;
                        });
                    }
                }
            }, false, 'replaceStreamWithNormalMessage');
        },
        pushMsgIdtoList(msgId) {
            if (get().sentMsgIdList.includes(msgId)) {
                return;
            }
            set(state => {
                state.sentMsgIdList.push(msgId);
            }, false, 'pushMsgIdtoList');
        },
        setTextInput(botId, text) {
            set(state => {
                state.textInputMap[botId] = text;
                identityService.setTextInputMap(state.textInputMap);
            }, false, 'setTextInput');
        },
        setDriverChatId(chatId) {
            set(state => {
                state.driverChatId = chatId;
            }, false, 'setDriverChatId');
        },
        setIsChatDriving(isChatDriving) {
            set(state => {
                state.isChatDriving = isChatDriving;
            }, false, 'setIsChatDriving');
        },
        clearTextInput() {
            set(state => {
                state.textInputMap = {};
                identityService.removeTextInputMap();
            }, false, 'clearTextInput');
        },
        openContextmenu() {
            set(state => {
                state.isOpenContextmenu = true;
            }, false, 'openContextmenu');
        },
        closeContextmenu() {
            set(state => {
                state.isOpenContextmenu = false;
            }, false, 'closeContextmenu');
        },
        setCopyText(text) {
            set(state => {
                state.copyText = text;
            }, false, 'setCopyText');
        },
        setLoginPopVisible(visible) {
            set(state => {
                state.loginPopVisible = visible;
            }, false, 'setLoginPopVisible');
        },
        setChatBodyType(val) {
            set(state => {
                state.chatBodyType = val;
            }, false, 'setChatBodyType');
        },
        setIsKol(val) {
            set(state => {
                state.isKol = val;
            }, false, 'setIsKol');
        },
        setHasUnRead(val) {
            set(state => {
                state.hasUnRead = val;
            }, false, 'setHasUnRead');
        },
        setTransactionDisplayItem(messageId) {
            set(state => {
                state.transactionDisplaySet.add(messageId);
                identityService.setTransactionDisplaySet(state.transactionDisplaySet);
            }, false, 'setTransactionDisplayItem');
        },
        async pollingChatMsg(message) {
            const storedMessage = get().multiBotMap[String(message.botId)].chatDic.get(message.id);
            if (storedMessage?.status === MessageStatusEnum.CANCELING ||
                storedMessage?.status === MessageStatusEnum.CANCELED ||
                message.asyncJobInfo?.status === 'JOB_STATUS_CANCELED') {
                return true;
            }
            const { imageGenMessageResponse, asyncJobInfo } = message;
            const jobId = imageGenMessageResponse?.jobId || asyncJobInfo?.jobId || '';
            if (!jobId || jobId === '0') {
                return true;
            }
            try {
                get().setSending(true);
                const res = await getBotJobInfo(jobId);
                const data = res?.data;
                const dataMessage = data?.data?.message || {};
                const resJobInfo = dataMessage.asyncJobInfo;
                if (data && resJobInfo?.jobId) {
                    const { imageGenMessageResponse, message: msg } = data?.data;
                    if (!imageGenMessageResponse) {
                        const info = last(msg?.extraInfo?.runningWidgetInfo) || {};
                        if (data?.status === 'JOB_STATUS_DOING' && info.widgetName) {
                            msg.text = generateWidgetRunningText(info);
                        }
                        useBotStore.getState().setBotLastMessage(msg.botId, msg);
                    }
                    get().addSSeTextStream({
                        index: 0,
                        isFinal: false,
                        text: dataMessage?.text ?? '',
                        replyMessage: dataMessage,
                        modelStatus: resJobInfo?.status,
                        isJob: true
                    });
                    if (resJobInfo?.status === ModelStatusEnum.EMBED_OBJ_STATUS_DONE ||
                        resJobInfo?.status === ModelStatusEnum.EMBED_OBJ_STATUS_ERROR) {
                        get().setSending(false);
                        return true;
                    }
                    return false;
                }
                if (res.success && data?.status === 'JOB_STATUS_FAILED') {
                    get().setSending(false);
                    return true;
                }
                if (res.success && data?.status === 'JOB_STATUS_DONE') {
                    const { imageGenMessageResponse, message: msg } = data?.data;
                    if (!imageGenMessageResponse) {
                        useBotStore.getState().setBotLastMessage(msg.botId, msg);
                    }
                    else {
                        get().addSSEImageStream({
                            imageGenMessageResponse,
                            replyMessage: message,
                            genStatus: ImageStatus.DONE
                        });
                    }
                    return true;
                }
                if (!res.success) {
                    get().addSSeTextStream({
                        index: 0,
                        isFinal: false,
                        text: dataMessage?.text ?? '',
                        replyMessage: dataMessage,
                        modelStatus: ModelStatusEnum.EMBED_OBJ_STATUS_ERROR
                    });
                    get().setSending(false);
                    return true;
                }
                return false;
            }
            catch {
                get().setSending(false);
                return true;
            }
        },
        async getImageFormParamsAsync() {
            if (Object.keys(get().imageParams || {}).length === 0) {
                const res = await getImageParams();
                if (res.success) {
                    set(state => {
                        state.imageParams = res.data;
                    });
                }
            }
        },
        toggleImagePanelOpen(value) {
            set(state => {
                state.imagePanelParams = value;
            });
        },
        async uploadFiles(botId, files, retry) {
            set(state => {
                const botFiles = state.fileUpload.filesMap[botId] || [];
                if (retry) {
                    const newFiles = botFiles.map(file => {
                        if (file.id === files[0].id) {
                            return files[0];
                        }
                        return file;
                    });
                    state.fileUpload.filesMap[botId] = [...newFiles];
                }
                else {
                    state.fileUpload.filesMap[botId] = [...botFiles, ...files];
                }
            });
            for (const file of files) {
                fileQueue(async () => {
                    const { deletedList } = get().fileUpload;
                    if (deletedList.includes(file.id)) {
                        set(state => {
                            state.fileUpload.deletedList = state.fileUpload.deletedList.filter(id => id !== file.id);
                        });
                        return;
                    }
                    set(state => {
                        state.fileUpload.uploading = file;
                    });
                    const res = await uploadFileToS3WithProgress({
                        scenario: Scenario.SCENARIO_IM_CHAT,
                        contentType: file.uiData.contentType,
                        onProgress: value => {
                            set(state => {
                                state.fileUpload.uploading = { ...file, progress: value };
                            });
                        },
                        file: file.file,
                        cancelToken: (cancel) => {
                            set(state => {
                                const botFiles = state.fileUpload.filesMap[botId] || [];
                                const newBotFiles = botFiles.map(botFile => {
                                    if (botFile.id === file.id) {
                                        return {
                                            ...botFile,
                                            cancelToken: {
                                                cancel
                                            }
                                        };
                                    }
                                    return botFile;
                                });
                                state.fileUpload.filesMap[botId] = newBotFiles;
                            });
                        }
                    });
                    const deletedListAfter = get().fileUpload.deletedList;
                    if (deletedListAfter.includes(file.id)) {
                        set(state => {
                            state.fileUpload.deletedList = state.fileUpload.deletedList.filter(id => id !== file.id);
                            state.fileUpload.uploading = null;
                        });
                        return;
                    }
                    set(state => {
                        if (fileQueue.pendingCount === 0) {
                            state.fileUpload.uploading = null;
                        }
                        const { deletedList } = state.fileUpload;
                        if (deletedList.includes(file.id)) {
                            state.fileUpload.uploading = null;
                        }
                        const botFiles = state.fileUpload.filesMap[botId] || [];
                        const newFiles = botFiles.map(f => {
                            if (f.id === file.id) {
                                return {
                                    ...f,
                                    status: res?.objectAccessUrl ? 'completed' : 'error',
                                    url: res?.objectAccessUrl
                                };
                            }
                            return f;
                        });
                        state.fileUpload.filesMap[botId] = newFiles;
                    });
                });
            }
        },
        deleteUploadFiles(botId, id) {
            set(state => {
                const botFiles = state.fileUpload.filesMap[botId] || [];
                if (id) {
                    state.fileUpload.filesMap[botId] = botFiles.filter(file => file.id !== id);
                    const deleteFile = botFiles.filter(file => file.id === id)[0];
                    if (deleteFile.cancelToken.cancel) {
                        deleteFile.cancelToken.cancel();
                    }
                    state.fileUpload.deletedList = [...state.fileUpload.deletedList, id];
                }
                else {
                    state.fileUpload.filesMap[botId] = [];
                }
            });
        },
        setFileAlert(data) {
            set(state => {
                console.log(data);
                state.fileUpload.alert = data;
            });
        },
        showDragModal(val) {
            set(state => {
                state.fileUpload.dragModal = val;
            });
        },
        setReEditTriggerred(val) {
            set(state => {
                state.reEditTriggerred = val;
            }),
                false,
                ' setReEditTriggerred';
        },
        setNetworkError(botId, val) {
            set(state => {
                state.multiBotMap[botId].networkError = val;
            });
        }
    };
};
export const useChatStore = create()(immer(devtools((...a) => ({
    ...createChatSlice(...a),
    ...createChatCommonSlice(...a)
}), { store: 'chat' })));
