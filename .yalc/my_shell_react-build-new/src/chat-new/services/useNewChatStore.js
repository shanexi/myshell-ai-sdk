"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNewChatStore = void 0;
const immer_1 = require("immer");
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const immer_2 = require("zustand/middleware/immer");
const common_1 = require("../../apis/common.js");
const limitQueue_1 = require("../../common/utils/limitQueue.js");
const util_1 = require("../util.js");
(0, immer_1.enableMapSet)();
const fileQueue = (0, limitQueue_1.limitQueue)(1);
const DEFAULT_STATE = {
    messageIdListMap: new Map(),
    lastMsgIdMap: new Map(),
    lastUserInteractionMsgIdMap: new Map(),
    draftReplyMessageMap: new Map(),
    messageMap: new Map(),
    localDraftMessageMap: {},
    exceptionsForTextDisplay: {},
    fileUpload: { uploading: null, filesMap: {}, deletedList: [], alert: {}, dragModal: false }
};
const createChatSlice = (set, get) => {
    return {
        ...DEFAULT_STATE,
        sendDraftMessage: (type, id, message) => {
            set(state => {
                const mapKey = `${type}-${id}`;
                if (!state.lastUserInteractionMsgIdMap.has(mapKey)) {
                    state.lastUserInteractionMsgIdMap.set(mapKey, '0');
                }
                if (!state.messageMap.has(mapKey)) {
                    state.messageMap.set(mapKey, new Map());
                }
                if (!state.lastMsgIdMap.has(mapKey)) {
                    state.lastMsgIdMap.set(mapKey, '');
                }
                state.lastUserInteractionMsgIdMap.set(mapKey, message.id);
                const parsedMessage = (0, util_1.draftOrLocalMessageParser)(message);
                state.messageMap.get(mapKey).set(parsedMessage.id, parsedMessage);
                const newMsgIdList = Array.from(state.messageMap.get(mapKey).values())
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1))
                    .map(item => item.id);
                state.messageIdListMap.set(mapKey, Array.from(new Set(newMsgIdList)));
                state.lastMsgIdMap.set(mapKey, newMsgIdList.at(-1) ?? '0');
            });
        },
        replaceDraftMessage: (type, id, message) => {
            set(state => {
                const mapKey = `${type}-${id}`;
                const lastUserInteractionMsgId = state.lastUserInteractionMsgIdMap.get(mapKey);
                if (!lastUserInteractionMsgId) {
                    if (!state.messageMap.has(mapKey)) {
                        state.messageMap.set(mapKey, new Map());
                    }
                    if (!state.lastMsgIdMap.has(mapKey)) {
                        state.lastMsgIdMap.set(mapKey, '');
                    }
                    let parsedMessage;
                    if (message.status === 'LOCAL_ERROR') {
                        parsedMessage = (0, util_1.draftOrLocalMessageParser)(message);
                    }
                    else {
                        parsedMessage = message;
                    }
                    state.messageMap.get(mapKey)?.set(parsedMessage.id, parsedMessage);
                    const newMsgIdList = Array.from(state.messageMap.get(mapKey).values())
                        .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1))
                        .map(item => item.id);
                    state.messageIdListMap.set(mapKey, Array.from(new Set(newMsgIdList)));
                    state.lastMsgIdMap.set(mapKey, newMsgIdList.at(-1) ?? '0');
                }
                else {
                    let parsedMessage;
                    if (message.status === 'DRAFT' || message.status === 'LOCAL_ERROR') {
                        parsedMessage = (0, util_1.draftOrLocalMessageParser)(message);
                    }
                    else {
                        parsedMessage = message;
                    }
                    state.messageMap.get(mapKey)?.delete(lastUserInteractionMsgId);
                    state.messageMap.get(mapKey)?.set(message.id, parsedMessage);
                    const msgIdxInList = (state.messageIdListMap.get(mapKey) ?? []).indexOf(lastUserInteractionMsgId);
                    if (msgIdxInList >= 0) {
                        state.messageIdListMap.get(mapKey)?.splice(msgIdxInList, 1, message.id);
                        state.lastMsgIdMap.set(mapKey, message.id);
                        state.lastUserInteractionMsgIdMap.set(mapKey, message.id);
                    }
                    else {
                    }
                }
            });
        },
        addMessage: (type, id, messages) => {
            set(state => {
                const mapKey = `${type}-${id}`;
                if (!state.messageMap.has(mapKey)) {
                    state.messageMap.set(mapKey, new Map());
                }
                if (!state.lastMsgIdMap.has(mapKey)) {
                    state.lastMsgIdMap.set(mapKey, '');
                }
                if (!state.draftReplyMessageMap.has(mapKey)) {
                    state.draftReplyMessageMap.set(mapKey, '');
                }
                const messageList = Array.isArray(messages) ? messages : [messages];
                const noDraftReply = messageList.every(message => message.type !== 'PENDING_FOR_RESPONSE');
                messageList.forEach(message => {
                    let parsedMessage;
                    if (message.type === 'PENDING_FOR_RESPONSE') {
                        state.draftReplyMessageMap.set(mapKey, message.id);
                    }
                    if (message.status === 'DRAFT' || message.status === 'LOCAL_ERROR') {
                        parsedMessage = (0, util_1.draftOrLocalMessageParser)(message);
                    }
                    else {
                        parsedMessage = message;
                    }
                    state.messageMap.get(mapKey)?.set(parsedMessage.id, parsedMessage);
                });
                if (noDraftReply) {
                    const draftReplyMsgId = state.draftReplyMessageMap.get(mapKey);
                    if (draftReplyMsgId) {
                        state.messageMap.get(mapKey).delete(draftReplyMsgId);
                    }
                }
                const newMsgIdList = Array.from(state.messageMap.get(mapKey).values())
                    .sort((a, b) => (BigInt(a.id) - BigInt(b.id) >= 0 ? 1 : -1))
                    .map(item => item.id);
                state.messageIdListMap.set(mapKey, Array.from(new Set(newMsgIdList)));
                state.lastMsgIdMap.set(mapKey, newMsgIdList.at(-1) ?? '0');
            });
        },
        addTextStream(type, id, messageId, content) {
            set(state => {
                const mapKey = `${type}-${id}`;
                const newMessageMap = new Map(state.messageMap);
                const messages = new Map(newMessageMap.get(mapKey) || []);
                const messageDetail = (messages.get(messageId) || {});
                const newDetail = {
                    ...messageDetail,
                    text: (messageDetail.text || '') + content
                };
                messages.set(messageId, newDetail);
                newMessageMap.set(mapKey, messages);
                return {
                    messageMap: newMessageMap
                };
            });
        },
        addAudioStream(type, id, messageId, audioChunk) {
            set(state => {
                const mapKey = `${type}-${id}`;
                const newMessageMap = new Map(state.messageMap);
                const messages = new Map(newMessageMap.get(mapKey) || []);
                const messageDetail = (messages.get(messageId) || {});
                const newDetail = {
                    ...messageDetail,
                    audioBuffer: messageDetail.audioBuffer ? [...messageDetail.audioBuffer, audioChunk] : [audioChunk]
                };
                messages.set(messageId, newDetail);
                newMessageMap.set(mapKey, messages);
                return {
                    messageMap: newMessageMap
                };
            });
        },
        addTranslationStream(type, id, messageId, translation) {
            set(state => {
                const mapKey = `${type}-${id}`;
                const newMessageMap = new Map(state.messageMap);
                const messages = new Map(newMessageMap.get(mapKey) || []);
                const messageDetail = (messages.get(messageId) || {});
                const newDetail = {
                    ...messageDetail,
                    translation: (messageDetail.translation || '') + translation
                };
                messages.set(messageId, newDetail);
                newMessageMap.set(mapKey, messages);
                return {
                    messageMap: newMessageMap
                };
            });
        },
        updateMessage: (type, id, message) => {
            set(state => {
                const mapKey = `${type}-${id}`;
                if (!state.messageMap.has(mapKey)) {
                    state.messageMap.set(mapKey, new Map());
                }
                const originMessage = state.messageMap.get(mapKey)?.get(message.id);
                let parsedMessage;
                if (message.status === 'LOCAL_ERROR') {
                    parsedMessage = (0, util_1.draftOrLocalMessageParser)(message);
                }
                else {
                    parsedMessage = message;
                }
                state.messageMap.get(mapKey)?.set(message.id, {
                    ...originMessage,
                    ...parsedMessage,
                    imageGenMessageResponse: parsedMessage?.imageGenMessageResponse ?? originMessage?.imageGenMessageResponse
                });
            });
        },
        partialUpdateMessage(type, id, messageId, partialDetail) {
            set(state => {
                const mapKey = `${type}-${id}`;
                const messages = new Map(state.messageMap.get(mapKey) || []);
                const message = messages.get(messageId);
                if (message) {
                    messages.set(messageId, {
                        ...message,
                        ...partialDetail
                    });
                }
                state.messageMap.set(mapKey, messages);
            });
        },
        setLocalDraftMessage(type, id, localDraft) {
            set(state => {
                const mapKey = `${type}-${id}`;
                return {
                    localDraftMessageMap: {
                        ...state.localDraftMessageMap,
                        ...(localDraft ? { [mapKey]: localDraft } : { [mapKey]: undefined })
                    }
                };
            });
        },
        deleteSpecifiedMessage(type, id, msgId) {
            set(state => {
                const mapKey = `${type}-${id}`;
                const newMessageIdListMap = new Map(state.messageIdListMap);
                let messageIds = state.messageIdListMap.get(mapKey) || [];
                const newMessageMap = new Map(state.messageMap);
                const messages = new Map(state.messageMap.get(mapKey) || []);
                const newLastMsgIdMap = new Map(state.lastMsgIdMap);
                if (!msgId) {
                    messageIds = [];
                    messages.clear();
                }
                else {
                    messageIds = messageIds.filter(id => id !== msgId);
                    messages.delete(msgId);
                }
                newMessageIdListMap.set(mapKey, messageIds);
                newMessageMap.set(mapKey, messages);
                newLastMsgIdMap.set(mapKey, messageIds.at(-1) ?? '');
                return {
                    messageIdListMap: newMessageIdListMap,
                    messageMap: newMessageMap,
                    lastMsgIdMap: newLastMsgIdMap
                };
            });
        },
        addTextDisplayException(type, id, msgId) {
            set(state => {
                const mapKey = `${type}-${id}`;
                const exceptions = state.exceptionsForTextDisplay[mapKey] ?? [];
                const newExceptions = [...exceptions, msgId];
                return {
                    exceptionsForTextDisplay: {
                        ...state.exceptionsForTextDisplay,
                        [mapKey]: newExceptions
                    }
                };
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
                    const res = await (0, common_1.uploadFileToS3WithProgress)({
                        scenario: common_1.Scenario.SCENARIO_IM_CHAT,
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
        }
    };
};
const persistConfig = {
    name: 'new-chat-storage',
    storage: (0, middleware_1.createJSONStorage)(() => localStorage),
    partialize: state => ({
        localDraftMessageMap: state.localDraftMessageMap,
        exceptionsForTextDisplay: state.exceptionsForTextDisplay
    }),
    merge: (persistedState, currentState) => ({
        ...currentState,
        localDraftMessageMap: {
            ...currentState.localDraftMessageMap,
            ...persistedState.localDraftMessageMap
        },
        exceptionsForTextDisplay: {
            ...currentState.exceptionsForTextDisplay,
            ...persistedState.exceptionsForTextDisplay
        }
    })
};
exports.useNewChatStore = (0, zustand_1.create)()((0, immer_2.immer)((0, middleware_1.devtools)((0, middleware_1.persist)(createChatSlice, persistConfig), { store: 'new-chat' })));
