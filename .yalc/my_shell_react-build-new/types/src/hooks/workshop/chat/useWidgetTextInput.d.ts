import { WidgetInfo } from '../../../../../src/common/constants/interfaces/workshop.js';
declare const useWidgetTextInput: ({ textInputRef, onSend, widgetInfo, scrollLayoutToTop }: {
    textInputRef: React.RefObject<HTMLTextAreaElement>;
    onSend: (flag?: boolean) => void;
    widgetInfo?: WidgetInfo | null;
    scrollLayoutToTop?: () => void;
}) => {
    textMessage: string;
    handleCompositionStart: () => void;
    handleCompositionEnd: () => void;
    handleKeyDown: (event: any, getMsg: any, toolbarState: any) => void;
    handleFocus: () => void;
    tokenLen: number;
    setTextMessage: import("react").Dispatch<import("react").SetStateAction<string>>;
    sending: boolean;
    handleSend: (msg: any) => void;
    disabled: boolean;
    setInputType: (type: import("../../../chat/model/types").InputType) => void;
    placeholder: string;
    neededEnergy: number;
    hasEnoughEnergy: boolean;
};
export default useWidgetTextInput;
