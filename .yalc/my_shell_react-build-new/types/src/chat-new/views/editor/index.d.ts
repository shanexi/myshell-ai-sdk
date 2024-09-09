import { ReactNode } from 'react';
type P = {
    editorContainerRef: React.RefObject<HTMLDivElement>;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    scrollLayoutToTop?: () => void;
    showMobileDetail?: () => void;
    otherModeSlot?: ReactNode;
};
export default function Editor({ editorContainerRef, textareaRef, scrollLayoutToTop, showMobileDetail, otherModeSlot }: P): import("react/jsx-runtime").JSX.Element;
export {};
