type P = {
    editorContainerRef: React.RefObject<HTMLDivElement>;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    scrollLayoutToTop?: () => void;
    showMobileDetail?: () => void;
};
export default function Editor({ editorContainerRef, textareaRef, scrollLayoutToTop, showMobileDetail }: P): import("react/jsx-runtime").JSX.Element;
export {};
