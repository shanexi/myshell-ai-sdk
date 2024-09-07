import { AudioStreamDetail, ImageStreamDetail, MessageDetail, TextStreamDetail, TranslationStreamDetail } from '../../../../src/chat/model/interfaces.js';
import { InputType } from '../../../../src/chat/model/types.js';
import { BotInfo } from '../../../../src/common/constants/interfaces/bot.js';
import { IPublishItem } from '../../../../src/gallery/modal/interfaces.js';
interface Computed {
    currentUserId?: string;
}
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
export interface WidgetFileProps {
    file: File;
    status?: string;
    widgetId: string;
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
export type ChatState = {
    multiBotMap: Record<string, {
        chatList: MessageDetail[];
        chatDic: Map<string, MessageDetail>;
        networkError?: boolean;
    }>;
    multiPublishMap: Record<string, IPublishItem>;
    sharedChatIDList: string[];
    selectedDeleteChatList: MessageDetail[];
    playingAudio: string | null;
    audioQueue: string[];
    sending: boolean;
    startJobIds: string[];
    inputType: InputType;
    lastInputType: InputType;
    lastInputMethod: string;
    sentMsgIdList: string[];
    textInputMap: Record<string, string>;
    driverChatId: string;
    isChatDriving: boolean;
    isOpenContextmenu: boolean;
    copyText: string;
    loginPopVisible: boolean;
    computed: Computed;
    chatBodyType: string;
    isKol: boolean;
    transactionDisplaySet: Set<string>;
    imageParams?: any;
    imagePanelParams: any;
    fileUpload: FileUpload;
    errorChatRecordList: any;
    reEditTriggerred: boolean;
    errorMsgList?: Record<string, string>;
    hasUnRead?: boolean;
};
type ChatStore = ChatState & {
    generateMultiBotMap(botList: BotInfo[]): void;
    setMultiPublishMap(image: string, item: IPublishItem): void;
    clearMultiPublishMap(): void;
    removeBotMap(botId: string): void;
    clearChatRecord(): void;
    addChatID(id: string): void;
    removeChatID(id: string): void;
    clearChatID(): void;
    addDeleteChat(chat: MessageDetail): void;
    removeDeleteChat(chat: MessageDetail): void;
    toggleAllDeleteChat(botId: string, isPanelImageBot: boolean): void;
    clearDeleteChat(): void;
    changePlayingAudio(audioId?: string): void;
    pushAudioIdToQueue(audioId: string): void;
    setErrorMsg(id: string, msg: string): void;
    removePlayedAudio(id: string): void;
    clearAudioQueue(): void;
    setSending(isSending: boolean): void;
    setStartJobIds(jobId: string, isAdd?: boolean): void;
    setInputType(type: InputType): void;
    setLastInputMethod(lastInputMethod: string): void;
    addTextStream(text: TextStreamDetail): void;
    replaceRegeneratedVoice(msg: MessageDetail, voiceUrl: string, voiceFileDurationSeconds: number, audioSpeed: number): void;
    addSSeTextStream(text: TextStreamDetail): void;
    receiveVoiceUrlFromSSe(voiceUrl: string, msgId: string, botId: string): void;
    addSSeAudioStream(audio: AudioStreamDetail): void;
    addSSEImageStream(images: ImageStreamDetail): void;
    addTranslationStreamNew(message: MessageDetail, content: string): void;
    addTranslationStream(translation: TranslationStreamDetail): void;
    setTranslatedText(message: MessageDetail): void;
    setMessageHandled(params: {
        botId: string;
        msgId: string;
    }): void;
    updateMessage(message: MessageDetail): void;
    pushChatRecord(message: MessageDetail): void;
    addHistoryRecord(messages: MessageDetail | MessageDetail[]): void;
    clearAndAddHistoryRecords(botId: string, messages: MessageDetail[]): void;
    removeHistoryRecord(messages: MessageDetail | MessageDetail[]): void;
    removeHistoryRecordExceptSpecifiedMessages(botId: string, messageIds: string[]): void;
    getBotLastValidInteractionMessage(botId: string): MessageDetail | undefined;
    replaceStreamWithNormalMessage(currentBotId?: string, refreshAll?: boolean): void;
    pushMsgIdtoList(msgId: string): void;
    setTextInput: (botId: string, text: string) => void;
    setDriverChatId: (chatId: string) => void;
    setIsChatDriving: (isChatDriving: boolean) => void;
    clearTextInput: () => void;
    openContextmenu: () => void;
    closeContextmenu: () => void;
    setCopyText: (text: string) => void;
    pushErrorChatRecord: (chat: any, botId: string) => void;
    removeErrorChatRecord: (chatId: string, botId: string) => void;
    setLoginPopVisible: (visible: boolean) => void;
    setChatBodyType: (val: string) => void;
    setIsKol: (isKol: boolean) => void;
    setTransactionDisplayItem: (messageId: string) => void;
    getImageFormParamsAsync: () => any;
    toggleImagePanelOpen: (value: any) => void;
    uploadFiles: (botId: string, files: FileProps[], retry?: boolean) => void;
    deleteUploadFiles: (botId: string, id?: string) => void;
    setFileAlert: (data: any) => void;
    pollingChatMsg: (message: MessageDetail) => Promise<boolean>;
    setReEditTriggerred: (val: boolean) => void;
    setNetworkError: (botId: string, val: boolean) => void;
    showDragModal: (val: boolean) => void;
    setHasUnRead: (hasUnRead: boolean) => void;
};
export declare const useChatStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<ChatStore>, "setState"> & {
    setState(nextStateOrUpdater: ChatStore | Partial<ChatStore> | ((state: import("immer").WritableDraft<ChatStore>) => void), shouldReplace?: boolean | undefined): void;
}, "setState"> & {
    setState<A extends string | {
        type: string;
    }>(nextStateOrUpdater: ChatStore | Partial<ChatStore> | ((state: import("immer").WritableDraft<ChatStore>) => void), shouldReplace?: boolean | undefined, action?: A | undefined): void;
}>;
export {};
