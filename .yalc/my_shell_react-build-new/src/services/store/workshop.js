import { enableMapSet } from 'immer';
import { create } from 'zustand';
import computed from 'zustand-computed';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { getBotJobInfo } from '../../apis/bot.js';
import { Scenario, uploadFileToS3WithProgress } from '../../apis/common.js';
import { MessageStatusEnum, MessageTypeEnum, ModelStatusEnum } from '../../chat/model/enums.js';
import { ImageStatus } from '../../chat/model/interfaces.js';
import { TTS_EXAMPLE_DEFAULT_TEXT_MAP, TTS_SUCCESS_EXAMPLE_DEFAULT_TEXT_MAP } from '../../common/constants/constants.js';
import { VoiceStatus } from '../../common/constants/enums/bot.js';
import { isObjEmpty } from '../../common/utils/common-helper.js';
import { isSameSet } from '../../common/utils/isSameSet.js';
import { limitQueue } from '../../common/utils/limitQueue.js';
import { identityService } from '../../common/services/identityService.js';
import widgetChatIdbService from '../widgetChatIdbService.js';
import { useUserStore } from './user.js';
enableMapSet();
const fileQueue = limitQueue(1);
const DEFAULT_STATE = {
    languageList: [],
    ttsList: [],
    myVoiceList: [],
    noCodeCheckPassed: false,
    pendingVoiceIds: new Set(),
    uncheckedSet: new Set(),
    selectedTTSId: '',
    oriForm: null,
    currentForm: null,
    editNotSave: false,
    ttsContentMap: new Map(),
    widgetList: [],
    cardWidgetList: [],
    widgetFilters: [],
    widgetName: '',
    filterValues: {},
    widgetPageToken: '0',
    widgetDataPush: false,
    gettingChatWidgetList: false,
    chatWidgetHasMore: false,
    chatWidgetPageToken: '0',
    sidebarWidgetList: null,
    gettingChatBotList: false,
    sidebarMyBotList: null,
    sidebarToolboxList: null,
    draftBotIds: new Set(),
    widgetStateMap: {},
    fileUpload: { uploading: null, filesMap: {}, deletedList: [], alert: {}, dragModal: false },
    widgetErrorChatRecordList: [],
    widgetInputType: 'text',
    lastWidgetInputType: 'text',
    widgetSending: false,
    selectedWidgetDeleteChatList: [],
    sentWidgetMsgIdList: new Set(),
    widgetTextInputMap: {},
    childTagsObj: {},
    initializeScrolled: false,
    poped: false,
    newlyAdded: false,
    widgetLastMessageMap: new Map(),
    widgetDriverChatId: '',
    widgetStartJobIds: [],
    recommend: { banners: [], list: [] },
    tagFilters: [],
    searchList: [],
    computed: {
        get currentUserId() {
            return useUserStore.getState().userId;
        }
    }
};
const createWorkshopSlice = (set, get) => {
    return {
        ...DEFAULT_STATE,
        setNoCodeCheckPassed(noCodeCheckPassed) {
            set({ noCodeCheckPassed }, false, 'setNoCodeCheckPassed');
        },
        setRecommend(recommend) {
            set({ recommend }, false, 'setRecommend');
        },
        setTagFilters(tagFilters) {
            set({ tagFilters }, false, 'setTagFilters');
        },
        setSearchList(searchList) {
            set({ searchList }, false, 'setSearchList');
        },
        setCardWidgetList(cardWidgets) {
            set({ cardWidgetList: cardWidgets }, false, 'setCardWidgetList');
        },
        setWidgetSearchList(widgets) {
            set({ widgetList: widgets }, false, 'setWidgetSearchList');
        },
        setWidgetFilters(widgetFilters) {
            set({ widgetFilters }, false, 'setWidgetFilters');
        },
        setWidgetName(widgetName) {
            set({ widgetName }, false, 'setWidgetName');
        },
        setFilterValues(filterValues) {
            set(state => {
                state.filterValues = filterValues;
                identityService.setFilterValues(filterValues);
            }, false, 'setFilterValues');
        },
        getFilterValues() {
            return isObjEmpty(get().filterValues) ? identityService.getFilterValues() : get().filterValues;
        },
        setChildTagsObj(childTagsObj) {
            set(state => {
                state.childTagsObj = childTagsObj;
                identityService.setChildTagsObj(childTagsObj);
            }, false, 'setFilterValues');
        },
        getChildTagsObj() {
            return isObjEmpty(get().childTagsObj) ? identityService.getChildTagsObj() : get().childTagsObj;
        },
        setWidgetPageToken(widgetPageToken) {
            set({ widgetPageToken }, false, 'setWidgetPageToken');
        },
        setWidgetDataPush(widgetDataPush) {
            set({ widgetDataPush }, false, 'setWidgetDataPush');
        },
        setLanguageList(list) {
            set({ languageList: list }, false, 'setLanguageList');
        },
        setTTSList(list) {
            set({ ttsList: list }, false, 'setTTSList');
        },
        setMyVoiceList(list) {
            set(state => {
                state.myVoiceList = list;
                list.forEach(voice => {
                    const id = `${voice.id}`;
                    if (voice.status === VoiceStatus.Pending || voice.status === VoiceStatus.Processing) {
                        if (!state.pendingVoiceIds.has(id)) {
                            state.pendingVoiceIds.add(id);
                        }
                    }
                    else if (state.pendingVoiceIds.has(id)) {
                        state.pendingVoiceIds.delete(id);
                        if (voice.status === VoiceStatus.Done) {
                            state.uncheckedSet.add(id);
                        }
                    }
                });
            }, false, 'setMyVoiceList');
        },
        removeItemFromUncheckedSet(id) {
            set(state => {
                state.uncheckedSet.delete(id);
            }, false, 'removeItemFromUncheckedSet');
        },
        clearUncheckedSet() {
            set(state => {
                state.uncheckedSet.clear();
            }, false, 'clearUncheckedSet');
        },
        removeDeletedVoiceIdFromSet(id) {
            set(state => {
                state.pendingVoiceIds.delete(id);
                state.uncheckedSet.delete(id);
            }, false, 'removeDeletedVoiceIdFromSet');
        },
        setSelectedTTSId(ttsId) {
            set({ selectedTTSId: ttsId || '' }, false, '`setSelected`TTSId');
        },
        setOriForm(oriForm) {
            set({ oriForm: oriForm || null }, false, 'setOriForm');
        },
        setCurrentForm(currentForm) {
            set({ currentForm: currentForm || null }, false, 'setCurrentForm');
        },
        setCurrentFormItem(key, value) {
            set(state => {
                state.currentForm[key] = value;
            }, false, 'setCurrentFormItem');
        },
        setEditNotSave() {
            set(state => {
                const oriForm = state.oriForm || {};
                const currentForm = state.currentForm || {};
                const compareKeys = Object.keys(oriForm) || [];
                if (compareKeys.length <= 0)
                    return false;
                state.editNotSave = !compareKeys.every(key => {
                    const oriValue = typeof oriForm?.[key] === 'string'
                        ? oriForm?.[key]?.replaceAll('\r', '')?.replaceAll('\n', '')
                        : oriForm?.[key];
                    const curValue = typeof currentForm?.[key] === 'string'
                        ? currentForm?.[key]?.replaceAll('\r', '')?.replaceAll('\n', '')
                        : currentForm?.[key];
                    return oriValue == curValue;
                });
            }, false, 'setEditNotSave');
        },
        getEditNotSave(keys) {
            const oriForm = get().oriForm || {};
            const currentForm = get().currentForm || {};
            const compareKeys = keys || Object.keys(oriForm) || [];
            if (compareKeys.length <= 0)
                return false;
            return !compareKeys.every(key => {
                const oriValue = typeof oriForm?.[key] === 'string'
                    ? oriForm?.[key]?.replaceAll('\r', '')?.replaceAll('\n', '')
                    : oriForm?.[key];
                const curValue = typeof currentForm?.[key] === 'string'
                    ? currentForm?.[key]?.replaceAll('\r', '')?.replaceAll('\n', '')
                    : currentForm?.[key];
                return oriValue == curValue;
            });
        },
        recordTtsContent(ttsId, content, voiceUrl) {
            set(state => {
                const curVoices = state.ttsContentMap.get(ttsId) || [];
                let next = [...curVoices];
                const defaultContent = next.filter(({ content }) => Object.values(TTS_EXAMPLE_DEFAULT_TEXT_MAP).includes(content) ||
                    Object.values(TTS_SUCCESS_EXAMPLE_DEFAULT_TEXT_MAP).includes(content));
                if (defaultContent.length > 0) {
                    next = [...defaultContent, { content, voiceUrl }];
                }
                else {
                    next.shift();
                    next.push({ content, voiceUrl });
                }
                state.ttsContentMap.set(ttsId, next);
            }, false, 'recordTtsContent');
        },
        getTtsContent(ttsId, content) {
            const ttsVocies = get().ttsContentMap.get(`${ttsId}`);
            if (Array.isArray(ttsVocies)) {
                const matchedVoice = ttsVocies.find(voice => voice.content === content);
                if (matchedVoice) {
                    return matchedVoice.voiceUrl;
                }
            }
        },
        getLatestVoice(ttsId) {
            const ttsVocies = get().ttsContentMap.get(ttsId);
            if (Array.isArray(ttsVocies)) {
                return ttsVocies[1] ?? ttsVocies[0];
            }
        },
        resetTtsContent() {
            set(state => {
                state.ttsContentMap.clear();
            }, false, 'resetTtsContent');
        },
        generateWidgetStateMap(widgetList) {
            set(state => {
                for (const widget of widgetList) {
                    if (!state.widgetStateMap[widget.id]) {
                        state.widgetStateMap[widget.id] = {
                            chatList: [],
                            chatDic: new Map()
                        };
                    }
                }
            }, false, 'generatewidgetStateMap');
        },
        appendSidebarWidgetList(widgetList) {
            set(state => {
                const newList = [...(state.sidebarWidgetList ?? []), ...widgetList];
                state.sidebarWidgetList = newList;
                state.generateWidgetStateMap(newList);
            }, false, 'appendSidebarWidgetList');
        },
        setSidebarWidgetList(widgetList) {
            set(state => {
                state.sidebarWidgetList = widgetList;
                state.generateWidgetStateMap(widgetList);
            }, false, 'setSidebarWidgetList');
        },
        setSidebarMyBotList(botList) {
            set(state => {
                state.sidebarMyBotList = botList;
            }, false, 'setSidebarMyBotList');
        },
        setDraftBotIds(botIds) {
            const oldBotIds = get().draftBotIds;
            const newBotIds = typeof botIds === 'function' ? botIds(oldBotIds) : botIds;
            if (!isSameSet(oldBotIds, newBotIds)) {
                set(state => {
                    state.draftBotIds = newBotIds;
                });
            }
        },
        updateBot(botInfo) {
            set(state => {
                const { sidebarMyBotList } = state;
                if (!sidebarMyBotList) {
                    return;
                }
                const index = sidebarMyBotList.findIndex(o => o.id === botInfo.id);
                if (index < 0) {
                    return;
                }
                sidebarMyBotList[index] = { ...botInfo };
            });
        },
        setSidebarToolboxList(botList) {
            set(state => {
                state.sidebarToolboxList = botList;
            }, false, 'setSidebarToolboxList');
        },
        async widgetUploadFiles(widgetId, files, retry) {
            set(state => {
                const botFiles = state.fileUpload.filesMap[widgetId] || [];
                if (retry) {
                    const newFiles = botFiles.map(file => {
                        if (file.id === files[0].id) {
                            return files[0];
                        }
                        return file;
                    });
                    state.fileUpload.filesMap[widgetId] = [...newFiles];
                }
                else {
                    state.fileUpload.filesMap[widgetId] = [...botFiles, ...files];
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
                                const botFiles = state.fileUpload.filesMap[widgetId] || [];
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
                                state.fileUpload.filesMap[widgetId] = newBotFiles;
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
                        const botFiles = state.fileUpload.filesMap[widgetId] || [];
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
                        state.fileUpload.filesMap[widgetId] = newFiles;
                    });
                });
            }
        },
        deleteWidgetUploadFiles(widgetId, id) {
            set(state => {
                const widgetFiles = state.fileUpload.filesMap[widgetId] || [];
                if (id) {
                    state.fileUpload.filesMap[widgetId] = widgetFiles.filter(file => file.id !== id);
                    const deleteFile = widgetFiles.filter(file => file.id === id)[0];
                    if (deleteFile.cancelToken.cancel) {
                        deleteFile.cancelToken.cancel();
                    }
                    state.fileUpload.deletedList = [...state.fileUpload.deletedList, id];
                }
                else {
                    state.fileUpload.filesMap[widgetId] = [];
                }
            });
        },
        updateWidgetMessage(message) {
            get().widgetAddHistoryRecord(message);
        },
        widgetAddHistoryRecord(messages) {
            const map = new Map();
            const msgArr = Array.isArray(messages) ? messages : [messages];
            const includedWidgets = new Set(msgArr.map(msg => msg.widgetId));
            for (const msg of msgArr) {
                if (!map.has(msg.widgetId)) {
                    map.set(msg.widgetId, []);
                }
                map.get(msg.widgetId).push(msg);
            }
            set(state => {
                for (const widgetId of [...map.keys()]) {
                    if (!state.widgetStateMap[widgetId]) {
                        state.widgetStateMap[widgetId] = {
                            chatList: [],
                            chatDic: new Map()
                        };
                    }
                    const widgetMsgs = state.widgetStateMap[widgetId];
                    const newMessages = map.get(widgetId);
                    for (const msg of newMessages) {
                        if (msg.replaceLocalSend) {
                            const msgs = [...widgetMsgs.chatDic.values()];
                            const matchedMsg = msgs.find(msg => msg.isLocalSend);
                            if (matchedMsg) {
                                widgetMsgs.chatDic.delete(matchedMsg.localId);
                            }
                        }
                        if (msg.replaceLocalReply) {
                            const msgs = [...widgetMsgs.chatDic.values()];
                            const matchedMsg = msgs.find(msg => msg.isLocalReply);
                            if (matchedMsg) {
                                widgetMsgs.chatDic.delete(matchedMsg.localId);
                            }
                        }
                        if (msg.deleteId) {
                            widgetMsgs.chatDic.delete(msg.deleteId);
                        }
                        if (!msg.deleteId) {
                            const oldMsg = widgetMsgs.chatDic.get(msg.id);
                            state.widgetStateMap[widgetId].chatDic.set(msg.localId || msg.id, {
                                ...msg,
                                audioStream: oldMsg?.audioStream ? oldMsg?.audioStream : msg.audioStream,
                                textStream: oldMsg?.textStream ? oldMsg?.textStream : msg.textStream,
                                imageGenMessageResponse: oldMsg?.imageGenMessageResponse
                                    ? oldMsg?.imageGenMessageResponse
                                    : msg.imageGenMessageResponse,
                                translationStream: oldMsg?.translationStream ? oldMsg?.translationStream : msg.translationStream
                            });
                        }
                        const allMsgs = [...state.widgetStateMap[widgetId].chatDic.values()].filter(chat => chat.userId == state.computed.currentUserId);
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
                        state.widgetStateMap[widgetId].chatList = newChatList;
                        if (includedWidgets.has(widgetId)) {
                            if (state.computed.currentUserId) {
                                widgetChatIdbService.storeChat(state.computed.currentUserId, widgetId, newChatList.slice(-10));
                            }
                        }
                    }
                }
            }, false, 'widgetAddHistoryRecord');
        },
        widgetClearAndAddHistoryRecords(widgetId, messages) {
            set(state => {
                const sortedChatList = messages
                    .filter(chat => chat.userId == state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
                if (state.widgetStateMap[widgetId]) {
                    state.widgetStateMap[widgetId].chatList = sortedChatList;
                    state.widgetStateMap[widgetId].chatDic.clear();
                    sortedChatList.forEach(chat => {
                        state.widgetStateMap[widgetId].chatDic.set(chat.id, chat);
                    });
                }
                if (state.computed.currentUserId) {
                    widgetChatIdbService.storeChat(state.computed.currentUserId, widgetId, sortedChatList.slice(-10));
                }
            });
        },
        setWidgetInputType(type) {
            set(state => {
                const t1 = ['audio', 'text'];
                const t2 = ['share', 'delete'];
                if (t2.includes(type) && t1.includes(state.widgetInputType)) {
                    state.lastWidgetInputType = state.widgetInputType;
                }
                else {
                    state.lastWidgetInputType = type;
                }
                state.widgetInputType = type;
            }, false, 'setWidgetInputType');
        },
        setWidgetSending(sending) {
            set(state => {
                state.widgetSending = sending;
            }, false, 'setWidgetSending');
        },
        addWidgetDeleteChat(chat) {
            if (get().selectedWidgetDeleteChatList.some(c => c.id === chat.id)) {
                return;
            }
            set(state => {
                state.selectedWidgetDeleteChatList.push(chat);
            }, false, 'addWidgetDeleteChat');
        },
        clearWidgetDeleteChat() {
            set(state => {
                state.selectedWidgetDeleteChatList = [];
            }, false, 'clearWidgetDeleteChat');
        },
        removeWidgetHistoryRecord(messages) {
            const map = new Map();
            const msgArr = Array.isArray(messages) ? messages : [messages];
            const includedWidgets = new Set(msgArr.map(msg => msg.widgetId));
            for (const msg of msgArr) {
                if (!map.has(msg.widgetId)) {
                    map.set(msg.widgetId, []);
                }
                map.get(msg.widgetId).push(msg);
            }
            set(state => {
                for (const widgetId of [...map.keys()]) {
                    if (!state.widgetStateMap[widgetId]) {
                        state.widgetStateMap[widgetId] = {
                            chatList: [],
                            chatDic: new Map()
                        };
                    }
                    const newMessages = map.get(widgetId);
                    for (const msg of newMessages) {
                        state.widgetStateMap[widgetId].chatDic.delete(msg.id);
                        const sortedChatList = [...state.widgetStateMap[widgetId].chatDic.values()]
                            .filter(chat => chat.userId == state.computed.currentUserId)
                            .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
                        state.widgetStateMap[widgetId].chatList = sortedChatList;
                        if (includedWidgets.has(widgetId)) {
                            if (state.computed.currentUserId) {
                                widgetChatIdbService.storeChat(state.computed.currentUserId, widgetId, sortedChatList.slice(-10));
                            }
                        }
                    }
                }
            }, false, 'removeWidgetHistoryRecord');
        },
        removeHistoryRecordExceptSpecifiedMessages(widgetId, messageIds) {
            set(state => {
                if (!state.widgetStateMap[widgetId]) {
                    return;
                }
                const keepedChatList = state.widgetStateMap[widgetId].chatList.filter(chat => messageIds.some(c => c === chat.id));
                const sortedChatList = keepedChatList
                    .filter(chat => chat.userId == state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
                state.widgetStateMap[widgetId].chatList = [...sortedChatList];
                if (state.computed.currentUserId) {
                    widgetChatIdbService.storeChat(state.computed.currentUserId, widgetId, sortedChatList.slice(-10));
                }
                state.widgetStateMap[widgetId].chatDic.clear();
                for (const msg of keepedChatList) {
                    state.widgetStateMap[widgetId].chatDic.set(msg.id, msg);
                }
            }, false, 'removeHistoryRecordExceptSpecifiedMessages');
        },
        getWidgetLastValidInteractionMessage(widgetId) {
            const { chatList } = get().widgetStateMap[widgetId];
            const validInteractionChatList = chatList.filter(chat => (chat.type === MessageTypeEnum.REPLY ||
                chat.type === MessageTypeEnum.TEXT ||
                chat.type === MessageTypeEnum.VOICE) &&
                chat.status === MessageStatusEnum.DONE);
            const validChatLen = validInteractionChatList.length;
            return validInteractionChatList[validChatLen - 1];
        },
        setWidgetLastMessage(widgetId, lastMessage) {
            set(state => {
                if (lastMessage) {
                    const msg = { ...lastMessage, createdDate: new Date(lastMessage.createdDate).getTime() };
                    state.widgetLastMessageMap.set(widgetId, msg);
                }
                else {
                    state.widgetLastMessageMap.delete(widgetId);
                }
            }, false, 'setWidgetLastMessage');
        },
        removeWidgetDeleteChat(chat) {
            set(state => {
                state.selectedWidgetDeleteChatList = state.selectedWidgetDeleteChatList.filter(c => c.id !== chat.id);
            }, false, 'removeWidgetDeleteChat');
        },
        toggleWidgetAllDeleteChat(widgetId, isPanelImageBot) {
            set(state => {
                const currentWidget = state.widgetStateMap[widgetId];
                if (isPanelImageBot) {
                    const chatList = currentWidget.chatList
                        .filter(c => c.status === MessageStatusEnum.DONE || c.status === MessageStatusEnum.ERROR)
                        .filter(chat => chat.type === MessageTypeEnum.REPLY ||
                        chat.type === MessageTypeEnum.VOICE_CALL_REPLY ||
                        chat.type === MessageTypeEnum.GREETING);
                    if (chatList.length === state.selectedWidgetDeleteChatList.length) {
                        state.selectedWidgetDeleteChatList = [];
                    }
                    else {
                        state.selectedWidgetDeleteChatList = chatList;
                    }
                }
                else if (currentWidget.chatList.filter(c => c.status === MessageStatusEnum.DONE || c.status === MessageStatusEnum.ERROR).length === state.selectedWidgetDeleteChatList.length) {
                    state.selectedWidgetDeleteChatList = [];
                }
                else {
                    state.selectedWidgetDeleteChatList = currentWidget.chatList.filter(c => c.status === MessageStatusEnum.DONE || c.status === MessageStatusEnum.ERROR);
                }
            }, false, 'toggleWidgetAllDeleteChat');
        },
        setWidgetTranslatedText(message) {
            set(state => {
                const msg = state.widgetStateMap[message.widgetId].chatDic.get(message.id);
                msg.translation = message.translation;
                state.widgetStateMap[message.widgetId].chatDic.set(message.id, { ...msg });
            }, false, 'setWidgetTranslatedText');
        },
        pushWidgetChatRecord(message) {
            get().widgetAddHistoryRecord(message);
        },
        pushWidgetMsgIdToList(msgId) {
            if (get().sentWidgetMsgIdList.has(msgId)) {
                return;
            }
            set(state => {
                state.sentWidgetMsgIdList.add(msgId);
            }, false, 'pushWidgetMsgIdToList');
        },
        setWidgetTextInput(widgetId, text) {
            set(state => {
                state.widgetTextInputMap[widgetId] = text;
                identityService.setWidgetTextInputMap(state.widgetTextInputMap);
            }, false, 'setTextInput');
        },
        pushWidgetErrorChatRecord(chat, widgetId) {
            const userId = get().computed.currentUserId;
            const storageKey = `widgetErrChatRecord-${widgetId}-${userId}`;
            const widgetErrChatRecord = localStorage.getItem(storageKey)
                ? JSON.parse(localStorage.getItem(storageKey))
                : [];
            widgetErrChatRecord.push({
                ...chat,
                userId
            });
            localStorage.setItem(storageKey, JSON.stringify(widgetErrChatRecord));
            set(state => {
                state.widgetErrorChatRecordList = widgetErrChatRecord || [];
            }, false, 'pushWidgetErrorChatRecord');
        },
        removeWidgetErrorChatRecord(chatId, widgetId) {
            const userId = get().computed.currentUserId;
            const storageKey = `widgetErrChatRecord-${widgetId}-${userId}`;
            const errChatRecord = localStorage.getItem(storageKey)
                ? JSON.parse(localStorage.getItem(storageKey))
                : [];
            const filteredErrChatRecord = errChatRecord.filter((err) => err.id !== chatId);
            localStorage.setItem(storageKey, JSON.stringify(filteredErrChatRecord));
            set(state => {
                state.widgetErrorChatRecordList = filteredErrChatRecord;
            }, false, 'removeWidgetErrorChatRecord');
        },
        addWidgetSSETextStream(text) {
            set(state => {
                const msg = state.widgetStateMap[text.replyMessage.widgetId].chatDic.get(text.replyMessage.id);
                if (text?.isJob) {
                    msg.text = text.text;
                }
                else {
                    msg.text += text.text;
                }
                msg.asyncJobInfo = {
                    ...(text?.replyMessage?.asyncJobInfo || {}),
                    status: text.modelStatus ?? ''
                };
                msg.embedObjs = text?.replyMessage?.embedObjs || [];
                state.widgetStateMap[text.replyMessage.widgetId].chatDic.set(text.replyMessage.id, { ...msg });
                state.widgetStateMap[text.replyMessage.widgetId].chatList = [
                    ...state.widgetStateMap[text.replyMessage.widgetId].chatDic.values()
                ]
                    .filter(chat => chat.userId == state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
            }, false, 'addWidgetSSETextStream');
        },
        addWidgetSSEAudioStream(audio) {
            set(state => {
                const msg = state.widgetStateMap[audio.replyMessage.widgetId].chatDic.get(audio.replyMessage.id);
                msg.audioStream = [...(msg.audioStream ?? []), audio];
                state.widgetStateMap[audio.replyMessage.widgetId].chatDic.set(audio.replyMessage.id, { ...msg });
            }, false, 'addWidgetSSEAudioStream');
        },
        addWidgetSSEImageStream(data) {
            set(state => {
                const msg = state.widgetStateMap[data.replyMessage.widgetId].chatDic.get(data.replyMessage.id);
                msg.imageGenMessageResponse = {
                    ...(msg?.imageGenMessageResponse ?? {}),
                    ...(data?.imageGenMessageResponse || {}),
                    metadata: msg?.imageGenMessageResponse?.metadata || data.imageGenMessageResponse?.metadata,
                    genStatus: data.genStatus
                };
                state.widgetStateMap[data.replyMessage.widgetId].chatDic.set(data.replyMessage.id, {
                    ...msg
                });
                state.widgetStateMap[data.replyMessage.widgetId].chatList = [
                    ...state.widgetStateMap[data.replyMessage.widgetId].chatDic.values()
                ]
                    .filter(chat => chat.userId == state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
            }, false, 'addWidgetSSEImageStream');
        },
        receiveWidgetVoiceUrlFromSSe(voiceUrl, msgId, widgetId) {
            set(state => {
                const msg = state.widgetStateMap[widgetId].chatDic.get(msgId);
                msg.voiceUrl = voiceUrl;
                msg.audioStream = [];
                state.widgetStateMap[widgetId].chatDic.set(msgId, { ...msg });
                state.widgetStateMap[widgetId].chatList = [...state.widgetStateMap[widgetId].chatDic.values()]
                    .filter(chat => chat.userId == state.computed.currentUserId)
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1));
            }, false, 'receiveWidgetVoiceUrlFromSSe');
        },
        async pollingWidgetChatMsg(message) {
            const { imageGenMessageResponse, asyncJobInfo } = message;
            const jobId = imageGenMessageResponse?.jobId || asyncJobInfo?.jobId || '';
            if (!jobId || jobId === '0') {
                return true;
            }
            try {
                const res = await getBotJobInfo(jobId);
                const data = res?.data;
                const dataMessage = data?.data?.message || {};
                const resJobInfo = dataMessage.asyncJobInfo;
                if (data && resJobInfo?.jobId) {
                    get().addWidgetSSETextStream({
                        index: 0,
                        isFinal: false,
                        text: dataMessage?.text ?? '',
                        replyMessage: dataMessage,
                        modelStatus: resJobInfo?.status,
                        isJob: true
                    });
                    if (resJobInfo?.status === ModelStatusEnum.EMBED_OBJ_STATUS_DONE ||
                        resJobInfo?.status === ModelStatusEnum.EMBED_OBJ_STATUS_ERROR) {
                        get().setWidgetSending(false);
                        if (data?.data?.message) {
                            get().updateWidgetMessage(data.data.message);
                        }
                        return true;
                    }
                    return false;
                }
                if (res.success && data?.status === 'JOB_STATUS_FAILED') {
                    get().setWidgetSending(false);
                    return true;
                }
                if (res.success && data?.status === 'JOB_STATUS_DONE') {
                    const { imageGenMessageResponse } = data?.data;
                    get().addWidgetSSEImageStream({
                        imageGenMessageResponse,
                        replyMessage: message,
                        genStatus: ImageStatus.DONE
                    });
                    get().setWidgetSending(false);
                    return true;
                }
                if (!res.success) {
                    get().addWidgetSSETextStream({
                        index: 0,
                        isFinal: false,
                        text: dataMessage?.text ?? '',
                        replyMessage: dataMessage,
                        modelStatus: ModelStatusEnum.EMBED_OBJ_STATUS_ERROR
                    });
                    get().setWidgetSending(false);
                    return true;
                }
                return false;
            }
            catch {
                get().addWidgetSSETextStream({
                    index: 0,
                    isFinal: false,
                    text: '',
                    replyMessage: message,
                    modelStatus: ModelStatusEnum.EMBED_OBJ_STATUS_ERROR
                });
                get().setWidgetSending(false);
                return true;
            }
        },
        setGettingChatWidgetList(status) {
            set(state => {
                state.gettingChatWidgetList = status;
            }, false, 'setGettingChatWidgetList');
        },
        setGettingChatBotList(status) {
            set(state => {
                state.gettingChatBotList = status;
            }, false, 'setGettingChatBotList');
        },
        setChatWidgetHasMore(status) {
            set(state => {
                state.chatWidgetHasMore = status;
            }, false, 'setChatWidgetHasMore');
        },
        setChatWidgetPageToken(pageToken) {
            set(state => {
                state.chatWidgetPageToken = pageToken;
            }, false, 'setChatWidgetPageToken');
        },
        markPromptWidgetAsUnlocked(widgetId) {
            set(state => {
                const matchedWidget = (state.sidebarWidgetList ?? [])?.find(widget => widget.id === widgetId);
                if (matchedWidget) {
                    matchedWidget.hasUnlocked = true;
                }
            }, false, 'markPromptWidgetAsUnlocked');
        },
        setInitializeScrolled(initializeScrolled) {
            set(state => {
                state.initializeScrolled = initializeScrolled;
            }, false, 'setInitializeScrolled');
        },
        popWidgetToTop(widgetId) {
            set(state => {
                const idx = (state.sidebarWidgetList ?? []).findIndex(widget => widget.id === widgetId);
                if (idx !== -1) {
                    const widget = state.sidebarWidgetList?.splice(idx, 1)?.[0];
                    const index = (state.sidebarWidgetList ?? []).findIndex((item) => item.pinned === widget?.pinned);
                    if (widget) {
                        if (index >= 0) {
                            state.sidebarWidgetList?.splice(index, 0, widget);
                        }
                        else {
                            state.sidebarWidgetList?.splice(0, 0, widget);
                        }
                    }
                    get().setPoped(true);
                }
            }, false, 'popWidgetToTop');
        },
        setPoped(status) {
            set(state => {
                state.poped = status;
            }, false, 'setPoped');
        },
        setNewlyAdded(status) {
            set(state => {
                state.newlyAdded = status;
            }, false, 'setNewlyAdded');
        },
        setWidgetDriverChatId(chatId) {
            set(state => {
                state.widgetDriverChatId = chatId;
            }, false, 'setWidgetDriverChatId');
        },
        setWidgetStartJobIds(jobId, isAdd) {
            set(state => {
                state.widgetStartJobIds = isAdd
                    ? [...(state.widgetStartJobIds || []), jobId]
                    : state.widgetStartJobIds.filter(item => item != jobId);
            }, false, 'setWidgetStartJobIds');
        },
        setWidgetFileAlert(data) {
            set(state => {
                state.fileUpload.alert = data;
            });
        },
        showWidgetDragModal(val) {
            set(state => {
                state.fileUpload.dragModal = val;
            });
        }
    };
};
const computeState = (state) => ({
    hasUncheckedVoice: state.uncheckedSet.size !== 0,
    hasErrorVoice: state.myVoiceList.some(voice => voice.status === VoiceStatus.Failed),
    hasPendingVoice: state.pendingVoiceIds.size !== 0,
    selectedMyVoiceItem: state.myVoiceList.find(voice => `${voice.id}` === state.selectedTTSId) || null,
    workshopListInitialized: state.sidebarMyBotList != null && state.sidebarWidgetList != null
});
export const useWorkshopStore = create()(computed(immer(devtools(createWorkshopSlice, { store: 'workshop' })), computeState));
