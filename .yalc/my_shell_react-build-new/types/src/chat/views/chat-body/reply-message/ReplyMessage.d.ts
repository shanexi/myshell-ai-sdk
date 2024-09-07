import type { ChatSetting, MessageDetail } from '../../../../../../src/chat/model/interfaces.js';
import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
interface Props {
    chat: MessageDetail;
    latest: boolean;
    onChangeCopyText: (text: string) => void;
    selectedBot?: BotInfo | null;
    botChatSetting?: ChatSetting;
}
declare function ReplyMessage({ chat, onChangeCopyText, selectedBot, latest, botChatSetting }: Props): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof ReplyMessage>;
export default _default;
