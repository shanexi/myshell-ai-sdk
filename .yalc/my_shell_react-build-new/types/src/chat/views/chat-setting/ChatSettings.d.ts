import { ChatSetting } from '../../../../../src/chat/model/interfaces.js';
import { BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
interface ChatSettingsProps {
    botInfo: BotInfo;
    chatSetting?: ChatSetting;
    isOpen: boolean;
    toggleIsOpen: (state?: boolean) => void;
}
export default function ChatSettings({ botInfo, chatSetting, isOpen, toggleIsOpen }: ChatSettingsProps): import("react/jsx-runtime").JSX.Element;
export {};
