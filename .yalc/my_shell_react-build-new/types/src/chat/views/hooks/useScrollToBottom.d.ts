import { ChatSetting, MessageDetail } from '../../../../../src/chat/model/interfaces.js';
export declare const CHAT_PAGE_SIZE = 20;
export declare const minMsgHeight = 80;
export declare function useScrollToBottom({ getHistory, chatList, chatSetting, chatListRef }: {
    getHistory: (pageSize?: any, firstLoad?: boolean) => Promise<void>;
    chatList: MessageDetail[];
    chatSetting?: ChatSetting;
    chatListRef: any;
}): {
    hitBottom: boolean;
    onChatBodyScroll: (e: HTMLElement) => void;
    messageBoxRef: import("react").RefObject<HTMLUListElement>;
    scrollRef: import("react").RefObject<HTMLDivElement>;
    canScrollRef: import("react").MutableRefObject<boolean>;
    hasMoreRef: import("react").MutableRefObject<boolean>;
    scrollToBottom: import("lodash").DebouncedFuncLeading<(flag?: boolean) => void>;
    autoScroll: boolean;
    setAutoScroll: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    autoScrollRef: import("react").MutableRefObject<boolean>;
    scrollFlagRef: import("react").MutableRefObject<number>;
    prevScrollFlagRef: import("react").MutableRefObject<number>;
    bottomSentryRef: import("react").MutableRefObject<null>;
    topSentryRef: import("react").MutableRefObject<null>;
    getFirstRenderMessagesSize: () => number;
    disToBottom: number;
};
