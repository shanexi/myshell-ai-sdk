import { RefObject } from 'react';
import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
declare const useTextInput: ({ onSend, selectedBot, textInputRef, workshopChat, scrollLayoutToTop }: {
    onSend: (flag?: boolean) => void;
    selectedBot?: BotInfo | null;
    textInputRef?: RefObject<HTMLTextAreaElement>;
    workshopChat?: boolean;
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
    handleSend: (msg: any) => Promise<void>;
    disabled: boolean;
    setInputType: (type: import("../../../model/types").InputType) => void;
    placeholder: string;
    neededEnergy: number;
    hasEnoughEnergy: boolean;
};
export default useTextInput;
