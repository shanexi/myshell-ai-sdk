import { RefObject } from 'react';
type P = {
    isSticky?: boolean;
    editorContainerRef: RefObject<HTMLDivElement>;
    textareaRef: RefObject<HTMLTextAreaElement>;
    editorAnchorRef: RefObject<HTMLDivElement>;
    scrollLayoutToTop?: () => void;
    showMobileDetail?: () => void;
    manuallyScrollDetailToTop?: () => void;
};
declare const ChatEntityDetailLayoutContext: import("react").Context<P>;
export default ChatEntityDetailLayoutContext;
