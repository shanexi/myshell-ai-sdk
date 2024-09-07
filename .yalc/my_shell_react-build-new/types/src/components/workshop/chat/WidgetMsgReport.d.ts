import { WidgetMessageDetail } from '../../../../../src/common/constants/interfaces/workshop.js';
export default function WidgetMsgReport({ chat, updateMessage, type, handleClose, showMsgReport, isMobile }: {
    chat: WidgetMessageDetail;
    updateMessage: (msg: WidgetMessageDetail) => void;
    type?: string;
    handleClose?: () => void;
    showMsgReport?: boolean;
    isMobile?: boolean;
}): import("react/jsx-runtime").JSX.Element;
