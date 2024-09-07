"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useMessageParams;
const react_1 = require("react");
const react_use_1 = require("react-use");
const common_helper_1 = require("../../common/utils/common-helper.js");
const store_1 = require("../../services/store/index.js");
const useAudioQueue_1 = __importDefault(require("./useAudioQueue.js"));
const definitions_1 = require("../model/definitions.js");
const useNewChatStore_1 = require("../services/useNewChatStore.js");
function useMessageParams(type, id, entityId, showMockReply = false) {
    const mapKey = `${type}-${id}`;
    const scrollToBottomRef = (0, react_1.useRef)(Date.now());
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const messageMap = (0, useNewChatStore_1.useNewChatStore)(state => state.messageMap);
    const messageIdListMap = (0, useNewChatStore_1.useNewChatStore)(state => state.messageIdListMap);
    const localDraftMessageMap = (0, useNewChatStore_1.useNewChatStore)(state => state.localDraftMessageMap);
    const lastMsgIdMap = (0, useNewChatStore_1.useNewChatStore)(state => state.lastMsgIdMap);
    const lastUserInteractionMsgIdMap = (0, useNewChatStore_1.useNewChatStore)(state => state.lastUserInteractionMsgIdMap);
    const exceptionsForTextDisplay = (0, useNewChatStore_1.useNewChatStore)(state => state.exceptionsForTextDisplay);
    const addTextDisplayException = (0, useNewChatStore_1.useNewChatStore)(state => state.addTextDisplayException);
    const setLocalDraftMessage = (0, useNewChatStore_1.useNewChatStore)(state => state.setLocalDraftMessage);
    const sendDraftMessage = (0, useNewChatStore_1.useNewChatStore)(state => state.sendDraftMessage);
    const replaceDraftMessage = (0, useNewChatStore_1.useNewChatStore)(state => state.replaceDraftMessage);
    const addMessage = (0, useNewChatStore_1.useNewChatStore)(state => state.addMessage);
    const updateMessage = (0, useNewChatStore_1.useNewChatStore)(state => state.updateMessage);
    const addTextStream = (0, useNewChatStore_1.useNewChatStore)(state => state.addTextStream);
    const addAudioStream = (0, useNewChatStore_1.useNewChatStore)(state => state.addAudioStream);
    const addTranslationStream = (0, useNewChatStore_1.useNewChatStore)(state => state.addTranslationStream);
    const deleteSpecifiedMessage = (0, useNewChatStore_1.useNewChatStore)(state => state.deleteSpecifiedMessage);
    const partialUpdateMessage = (0, useNewChatStore_1.useNewChatStore)(state => state.partialUpdateMessage);
    const messageIdList = (0, react_1.useMemo)(() => messageIdListMap.get(mapKey) ?? [], [mapKey, messageIdListMap]);
    const messageDetailMap = (0, react_1.useMemo)(() => {
        return messageMap.get(mapKey);
    }, [mapKey, messageMap]);
    const localDraftMessage = (0, react_1.useMemo)(() => localDraftMessageMap[mapKey], [localDraftMessageMap, mapKey]);
    const lastMsgId = (0, react_1.useMemo)(() => lastMsgIdMap.get(mapKey) ?? '', [lastMsgIdMap, mapKey]);
    const lastUserInteractionMsgId = (0, react_1.useMemo)(() => lastUserInteractionMsgIdMap.get(mapKey) ?? '', [lastUserInteractionMsgIdMap, mapKey]);
    const lastMessageInfo = (0, react_1.useMemo)(() => {
        return messageDetailMap?.get(lastMsgId);
    }, [lastMsgId, messageDetailMap]);
    const sending = (0, react_1.useMemo)(() => {
        return lastMessageInfo?.status === 'DRAFT';
    }, [lastMessageInfo?.status]);
    const interacting = (0, react_1.useMemo)(() => {
        return (sending ||
            lastMessageInfo?.status === 'PENDING' ||
            lastMessageInfo?.status === 'PROCESSING' ||
            lastMessageInfo?.asyncJobInfo?.status === definitions_1.EmbedObjStatus.PENDING ||
            lastMessageInfo?.asyncJobInfo?.status === definitions_1.EmbedObjStatus.PROCESSING ||
            lastMessageInfo?.asyncJobInfo?.status === definitions_1.EmbedObjStatus.QUEUEING);
    }, [lastMessageInfo?.asyncJobInfo?.status, lastMessageInfo?.status, sending]);
    const { playingAudio, autoPlayIdQueue, enQueue, clearQueue, playNext } = (0, useAudioQueue_1.default)();
    const setDraft = (0, react_1.useCallback)((localDraftMsg) => {
        setLocalDraftMessage(type, id, localDraftMsg);
    }, [id, setLocalDraftMessage, type]);
    const sendMessage = (0, react_1.useCallback)((draft) => {
        sendDraftMessage(type, id, draft);
        if (showMockReply) {
            const draftReplyMessage = {
                id: (0, common_helper_1.generateUUID)(),
                userId: userId ?? '',
                entityId: entityId || id,
                type: 'PENDING_FOR_RESPONSE',
                status: 'PENDING',
                createdDateUnix: Date.now().toString(),
                updatedDateUnix: Date.now().toString()
            };
            addMessage(type, id, draftReplyMessage);
        }
        scrollToBottomRef.current = Date.now();
    }, [sendDraftMessage, type, id, showMockReply, userId, entityId, addMessage]);
    const sendTextMessage = (0, react_1.useCallback)((text) => {
        const draftMessage = {
            id: (0, common_helper_1.generateUUID)(),
            entityId: entityId || id,
            text,
            userId: userId ?? '',
            type: 'TEXT',
            status: 'DRAFT',
            createdDateUnix: Date.now().toString(),
            updatedDateUnix: Date.now().toString()
        };
        sendMessage(draftMessage);
    }, [entityId, id, sendMessage, userId]);
    const sendAudioMessage = (0, react_1.useCallback)((audio) => {
        const draftMessage = {
            id: (0, common_helper_1.generateUUID)(),
            entityId: entityId || id,
            audioBlobDataURI: audio,
            userId: userId ?? '',
            type: 'VOICE',
            status: 'DRAFT',
            createdDateUnix: Date.now().toString(),
            updatedDateUnix: Date.now().toString()
        };
        sendMessage(draftMessage);
    }, [entityId, id, sendMessage, userId]);
    const sendButtonInteractionMessage = (0, react_1.useCallback)(() => {
    }, []);
    const replaceDraft = (0, react_1.useCallback)((message) => {
        replaceDraftMessage(type, id, message);
    }, [id, replaceDraftMessage, type]);
    const addMsg = (0, react_1.useCallback)((messages) => {
        addMessage(type, id, messages);
    }, [addMessage, id, type]);
    const updateMsg = (0, react_1.useCallback)((message) => {
        updateMessage(type, id, message);
    }, [id, type, updateMessage]);
    const textStreamHandler = (0, react_1.useCallback)((messageId, content) => {
        addTextStream(type, id, messageId, content);
    }, [id, type, addTextStream]);
    const audioStreamHandler = (0, react_1.useCallback)((messageId, audioChunk) => {
        addAudioStream(type, id, messageId, audioChunk);
    }, [addAudioStream, id, type]);
    const translationStreamHandler = (0, react_1.useCallback)((messageId, translation) => {
        addTranslationStream(type, id, messageId, translation);
    }, [addTranslationStream, id, type]);
    const deleteSpecifiedMessageId = (0, react_1.useCallback)((msgId) => {
        deleteSpecifiedMessage(type, id, msgId);
    }, [deleteSpecifiedMessage, id, type]);
    const partialUpdateMsg = (0, react_1.useCallback)((messageId, partialDetail) => {
        partialUpdateMessage(type, id, messageId, partialDetail);
    }, [id, partialUpdateMessage, type]);
    const addException = (0, react_1.useCallback)((msgId) => {
        addTextDisplayException(type, id, msgId);
    }, [addTextDisplayException, id, type]);
    (0, react_use_1.useEffectOnce)(() => {
        return clearQueue();
    });
    return {
        messageIdList,
        messageMap: (messageDetailMap ?? new Map()),
        lastMessageInfo,
        lastUserInteractionMsgId,
        draftMessage: localDraftMessage,
        sending,
        interacting,
        scrollToBottom: scrollToBottomRef.current,
        exceptionsForTextDisplay,
        addTextDisplayException: addException,
        setDraftMessage: setDraft,
        sendTextMessage,
        sendAudioMessage,
        sendButtonInteractionMessage,
        replaceDraftMessage: replaceDraft,
        addMessage: addMsg,
        updateMessage: updateMsg,
        updateMsg,
        addTextStream: textStreamHandler,
        addAudioStream: audioStreamHandler,
        addTranslationStream: translationStreamHandler,
        deleteSpecifiedMessageId,
        partialUpdateMsg,
        audioQueue: {
            playingAudio,
            queue: autoPlayIdQueue,
            enQueue,
            clearQueue,
            playNext
        }
    };
}
