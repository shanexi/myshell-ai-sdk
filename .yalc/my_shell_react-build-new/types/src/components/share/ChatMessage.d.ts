import type { ChatSetting, MessageDetail } from '../../../../src/chat/model/interfaces.js';
export default function ChatMessage({ chat, chatSetting, originData, isFromDownload, botAvatar, userAvatar }: {
    chat: MessageDetail;
    chatSetting?: ChatSetting;
    originData: any;
    isFromDownload?: boolean;
    botAvatar?: string;
    userAvatar?: string;
}): import("react/jsx-runtime").JSX.Element;
