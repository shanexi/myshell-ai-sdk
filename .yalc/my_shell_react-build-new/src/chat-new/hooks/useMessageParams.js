import { useCallback, useMemo, useRef } from 'react';
import { useEffectOnce } from 'react-use';
import { generateUUID } from '../../common/utils/common-helper.js';
import { useUserStore } from '../../services/store/index.js';
import useAudioQueue from './useAudioQueue.js';
import { EmbedObjStatus } from '../model/definitions.js';
import { useNewChatStore } from '../services/useNewChatStore.js';
export default function useMessageParams(type, id, entityId, showMockReply = false) {
    const mapKey = `${type}-${id}`;
    const scrollToBottomRef = useRef(Date.now());
    const userId = useUserStore(state => state.userId);
    const messageMap = useNewChatStore(state => state.messageMap);
    const messageIdListMap = useNewChatStore(state => state.messageIdListMap);
    const localDraftMessageMap = useNewChatStore(state => state.localDraftMessageMap);
    const lastMsgIdMap = useNewChatStore(state => state.lastMsgIdMap);
    const lastUserInteractionMsgIdMap = useNewChatStore(state => state.lastUserInteractionMsgIdMap);
    const exceptionsForTextDisplay = useNewChatStore(state => state.exceptionsForTextDisplay);
    const addTextDisplayException = useNewChatStore(state => state.addTextDisplayException);
    const setLocalDraftMessage = useNewChatStore(state => state.setLocalDraftMessage);
    const sendDraftMessage = useNewChatStore(state => state.sendDraftMessage);
    const replaceDraftMessage = useNewChatStore(state => state.replaceDraftMessage);
    const addMessage = useNewChatStore(state => state.addMessage);
    const updateMessage = useNewChatStore(state => state.updateMessage);
    const addTextStream = useNewChatStore(state => state.addTextStream);
    const addAudioStream = useNewChatStore(state => state.addAudioStream);
    const addTranslationStream = useNewChatStore(state => state.addTranslationStream);
    const deleteSpecifiedMessage = useNewChatStore(state => state.deleteSpecifiedMessage);
    const partialUpdateMessage = useNewChatStore(state => state.partialUpdateMessage);
    const messageIdList = useMemo(() => messageIdListMap.get(mapKey) ?? [], [mapKey, messageIdListMap]);
    const messageDetailMap = useMemo(() => {
        return messageMap.get(mapKey);
    }, [mapKey, messageMap]);
    const localDraftMessage = useMemo(() => localDraftMessageMap[mapKey], [localDraftMessageMap, mapKey]);
    const lastMsgId = useMemo(() => lastMsgIdMap.get(mapKey) ?? '', [lastMsgIdMap, mapKey]);
    const lastUserInteractionMsgId = useMemo(() => lastUserInteractionMsgIdMap.get(mapKey) ?? '', [lastUserInteractionMsgIdMap, mapKey]);
    const lastMessageInfo = useMemo(() => {
        return messageDetailMap?.get(lastMsgId);
    }, [lastMsgId, messageDetailMap]);
    const sending = useMemo(() => {
        return lastMessageInfo?.status === 'DRAFT';
    }, [lastMessageInfo?.status]);
    const interacting = useMemo(() => {
        return (sending ||
            lastMessageInfo?.status === 'PENDING' ||
            lastMessageInfo?.status === 'PROCESSING' ||
            lastMessageInfo?.asyncJobInfo?.status === EmbedObjStatus.PENDING ||
            lastMessageInfo?.asyncJobInfo?.status === EmbedObjStatus.PROCESSING ||
            lastMessageInfo?.asyncJobInfo?.status === EmbedObjStatus.QUEUEING);
    }, [lastMessageInfo?.asyncJobInfo?.status, lastMessageInfo?.status, sending]);
    const { playingAudio, autoPlayIdQueue, enQueue, clearQueue, playNext } = useAudioQueue();
    const setDraft = useCallback((localDraftMsg) => {
        setLocalDraftMessage(type, id, localDraftMsg);
    }, [id, setLocalDraftMessage, type]);
    const sendMessage = useCallback((draft) => {
        sendDraftMessage(type, id, draft);
        if (showMockReply) {
            const draftReplyMessage = {
                id: generateUUID(),
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
    const sendTextMessage = useCallback((text) => {
        const draftMessage = {
            id: generateUUID(),
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
    const sendAudioMessage = useCallback((audio) => {
        const draftMessage = {
            id: generateUUID(),
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
    const sendButtonInteractionMessage = useCallback(() => {
    }, []);
    const replaceDraft = useCallback((message) => {
        replaceDraftMessage(type, id, message);
    }, [id, replaceDraftMessage, type]);
    const addMsg = useCallback((messages) => {
        addMessage(type, id, messages);
    }, [addMessage, id, type]);
    const updateMsg = useCallback((message) => {
        updateMessage(type, id, message);
    }, [id, type, updateMessage]);
    const textStreamHandler = useCallback((messageId, content) => {
        addTextStream(type, id, messageId, content);
    }, [id, type, addTextStream]);
    const audioStreamHandler = useCallback((messageId, audioChunk) => {
        addAudioStream(type, id, messageId, audioChunk);
    }, [addAudioStream, id, type]);
    const translationStreamHandler = useCallback((messageId, translation) => {
        addTranslationStream(type, id, messageId, translation);
    }, [addTranslationStream, id, type]);
    const deleteSpecifiedMessageId = useCallback((msgId) => {
        deleteSpecifiedMessage(type, id, msgId);
    }, [deleteSpecifiedMessage, id, type]);
    const partialUpdateMsg = useCallback((messageId, partialDetail) => {
        partialUpdateMessage(type, id, messageId, partialDetail);
    }, [id, partialUpdateMessage, type]);
    const addException = useCallback((msgId) => {
        addTextDisplayException(type, id, msgId);
    }, [addTextDisplayException, id, type]);
    useEffectOnce(() => {
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
