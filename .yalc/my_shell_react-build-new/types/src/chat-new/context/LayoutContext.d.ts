import { RefObject } from 'react';
export type LayoutContextProps = {
    isEditorSticky?: boolean;
    textareaRef: RefObject<HTMLTextAreaElement>;
    scrollLayoutToTop?: () => void;
    scrollDetailIntoView?: () => void;
};
declare const LayoutContext: import("react").Context<LayoutContextProps>;
export default LayoutContext;
