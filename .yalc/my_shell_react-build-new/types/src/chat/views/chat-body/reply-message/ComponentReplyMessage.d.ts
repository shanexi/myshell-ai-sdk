import type { ChatSetting, MessageDetail } from '../../../../../../src/chat/model/interfaces.js';
import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
import 'driver.js/dist/driver.css';
import 'driver.js/dist/driver.css';
interface Props {
    chat: MessageDetail;
    latest: boolean;
    onChangeCopyText: (text: string) => void;
    selectedBot?: BotInfo | null;
    botChatSetting?: ChatSetting;
    toggleImagePanelOpen: () => void;
}
declare function ComponentReplyMessage({ chat, onChangeCopyText, selectedBot, latest, botChatSetting, toggleImagePanelOpen }: Props): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof ComponentReplyMessage>;
export default _default;
