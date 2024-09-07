export default function useChatLayout(): {
    scrollContainerRef: import("react").RefObject<HTMLDivElement>;
    editorContainerRef: import("react").RefObject<HTMLDivElement>;
    editorAnchorRef: import("react").RefObject<HTMLDivElement>;
    textareaRef: import("react").RefObject<HTMLTextAreaElement>;
    chatContainerRef: import("react").RefObject<HTMLDivElement>;
    detailContainerRef: import("react").RefObject<HTMLDivElement>;
    detailScrollRef: import("react").RefObject<HTMLDivElement>;
    scrollLayoutToTop: () => void;
    manuallyScrollDetailToTop: () => void;
    isEditorSticky: boolean;
    contentActive: boolean;
    setContentActive: (nextValue?: any) => void;
    detailScrollY: number;
    showMobileDetail: () => void;
};
