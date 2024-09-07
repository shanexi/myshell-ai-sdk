import type { ChatSetting, MessageDetail } from '../../../../src/chat/model/interfaces.js';
export default function ChatBody({ data, title, code, botId, botAvatar, userAvatar, chatSetting, qrcode, isFromDownload, originData }: {
    data: MessageDetail[];
    title: string;
    code: string;
    botId: string;
    botAvatar?: string;
    userAvatar?: string;
    chatSetting?: ChatSetting;
    qrcode?: string;
    isFromDownload?: boolean;
    originData: any;
}): import("react/jsx-runtime").JSX.Element;
