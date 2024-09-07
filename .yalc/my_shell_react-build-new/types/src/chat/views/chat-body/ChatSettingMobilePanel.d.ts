import { ChatSetting } from '../../../../../src/chat/model/interfaces.js';
import { BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
type P = {
    selectedBot?: BotInfo | null;
    setOpen: (value: boolean) => void;
    botChatSetting?: ChatSetting;
};
export default function ChatSettingMobilePanel({ selectedBot, setOpen, botChatSetting }: P): import("react/jsx-runtime").JSX.Element;
export {};
