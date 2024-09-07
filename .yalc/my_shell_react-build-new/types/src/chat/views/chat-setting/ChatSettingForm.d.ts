import { ChatSetting } from '../../../../../src/chat/model/interfaces.js';
import { BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
interface ChatSettingFormProps {
    botInfo: BotInfo;
    chatSetting?: ChatSetting;
    showRadius?: boolean;
}
export default function ChatSettingForm({ botInfo, chatSetting, showRadius }: ChatSettingFormProps): import("react/jsx-runtime").JSX.Element;
export {};
