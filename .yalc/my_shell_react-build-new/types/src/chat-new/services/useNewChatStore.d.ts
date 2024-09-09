import { PersistOptions } from 'zustand/middleware';
import { ChatModuleType } from '../../../../src/chat/ChatStaticContext';
import { DraftMessage, LocalErrorMessage, Message, UserSendEmbedObj } from '../model/definitions';
import { ChatCommonStore } from './chatCommonSlice';
export type MapKey = `${ChatModuleType}-${string}`;
export type LocalDraftMsg = {
    text?: string;
    audioBlobDataURI?: string;
    files?: UserSendEmbedObj[];
};
export type UserInputType = 'TEXT' | 'AUDIO';
export type PartialMessageDetail = Partial<Pick<Message, 'feedbackState' | 'feedbackIssues' | 'audioUrl' | 'audioSpeed' | 'duration' | 'status' | 'handled' | 'imageGenMessageResponse'>>;
export interface FileProps {
    file: File;
    status?: string;
    botId: string;
    progress?: number;
    type?: string;
    url?: string;
    id: string;
    [key: string]: any;
}
interface FileUpload {
    uploading: FileProps | null;
    filesMap: Record<string, FileProps[]>;
    deletedList: string[];
    alert: Record<string, FileProps[]>;
    dragModal: boolean;
}
type ChatState = {
    messageIdListMap: Map<MapKey, string[]>;
    lastMsgIdMap: Map<MapKey, string>;
    lastUserInteractionMsgIdMap: Map<MapKey, string>;
    draftReplyMessageMap: Map<MapKey, string>;
    messageMap: Map<MapKey, Map<string, Message>>;
    localDraftMessageMap: Record<MapKey, LocalDraftMsg>;
    exceptionsForTextDisplay: Record<MapKey, string[]>;
    fileUpload: FileUpload;
};
type ChatActions = {
    sendDraftMessage: (type: ChatModuleType, id: string, message: DraftMessage) => void;
    replaceDraftMessage: (type: ChatModuleType, id: string, message: Message | LocalErrorMessage) => void;
    addMessage: (type: ChatModuleType, id: string, messages: (Message | DraftMessage | LocalErrorMessage) | Array<Message | DraftMessage | LocalErrorMessage>) => void;
    addTextStream: (type: ChatModuleType, id: string, messageId: string, content: string) => void;
    addAudioStream: (type: ChatModuleType, id: string, messageId: string, audioChunk: ArrayBuffer) => void;
    addTranslationStream: (type: ChatModuleType, id: string, messageId: string, translation: string) => void;
    updateMessage: (type: ChatModuleType, id: string, message: Message | LocalErrorMessage) => void;
    partialUpdateMessage: (type: ChatModuleType, id: string, messageId: string, partialDetail: PartialMessageDetail) => void;
    setLocalDraftMessage: (type: ChatModuleType, id: string, localDraft?: LocalDraftMsg) => void;
    deleteSpecifiedMessage: (type: ChatModuleType, id: string, msgId?: string) => void;
    addTextDisplayException: (type: ChatModuleType, id: string, msgId: string) => void;
    uploadFiles: (id: string, files: FileProps[], retry?: boolean) => void;
    deleteUploadFiles: (botId: string, id?: string) => void;
    setFileAlert: (data: any) => void;
    showDragModal: (val: boolean) => void;
};
type PersistedState = {
    localDraftMessageMap: Record<MapKey, LocalDraftMsg>;
    exceptionsForTextDisplay: Record<MapKey, string[]>;
};
export declare const useNewChatStore: import("zustand").UseBoundStore<Omit<Omit<Omit<import("zustand").StoreApi<ChatState & ChatActions & ChatCommonStore>, "setState"> & {
    setState(nextStateOrUpdater: (ChatState & ChatActions & ChatCommonStore) | Partial<ChatState & ChatActions & ChatCommonStore> | ((state: import("immer").WritableDraft<ChatState & ChatActions & ChatCommonStore>) => void), shouldReplace?: boolean | undefined): void;
}, "setState"> & {
    setState<A extends string | {
        type: string;
    }>(nextStateOrUpdater: (ChatState & ChatActions & ChatCommonStore) | Partial<ChatState & ChatActions & ChatCommonStore> | ((state: import("immer").WritableDraft<ChatState & ChatActions & ChatCommonStore>) => void), shouldReplace?: boolean | undefined, action?: A | undefined): void;
}, "persist"> & {
    persist: {
        setOptions: (options: Partial<PersistOptions<ChatState & ChatActions & ChatCommonStore, PersistedState>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ChatState & ChatActions & ChatCommonStore) => void) => () => void;
        onFinishHydration: (fn: (state: ChatState & ChatActions & ChatCommonStore) => void) => () => void;
        getOptions: () => Partial<PersistOptions<ChatState & ChatActions & ChatCommonStore, PersistedState>>;
    };
}>;
export {};
