import { ChatSetting, MessageDetail } from '../../../../src/chat/model/interfaces.js';
interface Props {
    chat: MessageDetail;
    chatSetting?: ChatSetting;
    isFromDownload?: boolean;
}
declare function ReplyMessage({ chat, chatSetting, isFromDownload }: Props): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof ReplyMessage>;
export default _default;
