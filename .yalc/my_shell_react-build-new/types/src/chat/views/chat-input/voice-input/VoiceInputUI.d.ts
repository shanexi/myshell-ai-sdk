import { MutableRefObject } from 'react';
import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
declare function VoiceInputUI({ onSend, selectedBot, userSelectVoiceRef, isMobile, isWorkshop, allowTextInput }: {
    onSend: (flag?: boolean) => void;
    selectedBot?: BotInfo | null;
    userSelectVoiceRef: MutableRefObject<boolean>;
    isMobile?: boolean;
    isWorkshop?: boolean;
    allowTextInput?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof VoiceInputUI>;
export default _default;
