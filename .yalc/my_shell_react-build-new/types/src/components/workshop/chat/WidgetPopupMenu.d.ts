import { WidgetInfo, WidgetMessageDetail } from '../../../../../src/common/constants/interfaces/workshop.js';
interface WidgetPopupMenuProps {
    widgetInfo?: WidgetInfo | null;
    chat: WidgetMessageDetail;
    latest: boolean;
    isOpen: boolean;
    onClose: () => void;
    onToggle?: () => void;
    downloading: boolean;
    onDownload: (filePath: string, fileName: string) => void;
    left?: number | string;
    top?: number;
    isNeedButton?: boolean;
    isMobile?: boolean;
    toggleImagePanelOpen?: (value: any) => void;
    showTranslate?: boolean;
    isReply?: boolean;
    showAll?: boolean;
    showContextMenu: React.MutableRefObject<boolean>;
}
export default function WidgetPopupMenu({ widgetInfo, chat, latest, isOpen, onClose, onToggle, downloading, onDownload, left, top, isNeedButton, isMobile, toggleImagePanelOpen, showTranslate, isReply, showContextMenu, showAll }: WidgetPopupMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
