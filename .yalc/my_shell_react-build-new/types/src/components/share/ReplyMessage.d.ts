import { ChatSetting, MessageDetail } from '../../../../src/chat/model/interfaces.js';
interface Props {
    chat: MessageDetail;
    chatSetting?: ChatSetting;
    isFromDownload?: boolean;
}
export default function ReplyMessage({ chat, chatSetting, isFromDownload }: Props): import("react/jsx-runtime").JSX.Element;
export {};
