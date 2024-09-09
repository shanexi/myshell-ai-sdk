import React, { ReactNode } from 'react';
type P = {
    bgUrl?: string;
    editorAnchorRef: React.RefObject<HTMLDivElement>;
    editorContainerRef: React.RefObject<HTMLDivElement>;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    topActionsSlot?: ReactNode;
    otherModeSlot?: ReactNode;
    scrollLayoutToTop?: () => void;
    showMobileDetail?: () => void;
};
export default function ChatModule({ bgUrl, editorAnchorRef, editorContainerRef, textareaRef, topActionsSlot, scrollLayoutToTop, showMobileDetail, otherModeSlot }: P): import("react/jsx-runtime").JSX.Element;
export {};
