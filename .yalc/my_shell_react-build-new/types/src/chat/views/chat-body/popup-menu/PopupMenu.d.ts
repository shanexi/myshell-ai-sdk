import { ChatSetting, MessageDetail } from '../../../../../../src/chat/model/interfaces.js';
import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
interface PopupMenuProps {
    chat: MessageDetail;
    latest: boolean;
    isOpen: boolean;
    onClose: () => void;
    onToggle?: () => void;
    downloading: boolean;
    onDownload: (filePath: string, fileName: string) => void;
    left?: number | string;
    top?: number;
    isNeedButton?: boolean;
    botChatSetting?: ChatSetting;
    isMobile?: boolean;
    toggleImagePanelOpen?: (value: any) => void;
    showTranslate?: boolean;
    isReply?: boolean;
    showAll?: boolean;
    showContextMenu: React.MutableRefObject<boolean>;
    botInfo?: BotInfo | null;
}
export default function PopupMenu({ chat, latest, isOpen, onClose, onToggle, downloading, onDownload, left, top, isNeedButton, botChatSetting, isMobile, toggleImagePanelOpen, showTranslate, isReply, showContextMenu, showAll, botInfo }: PopupMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
