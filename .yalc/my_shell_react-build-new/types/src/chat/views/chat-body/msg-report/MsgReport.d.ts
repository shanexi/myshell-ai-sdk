import { MessageDetail } from '../../../../../../src/chat/model/interfaces.js';
declare function MsgReport({ chat, updateMessage, type, handleClose, showMsgReport, isMobile }: {
    chat: MessageDetail;
    updateMessage: (msg: MessageDetail) => void;
    type?: string;
    handleClose?: () => void;
    showMsgReport?: boolean;
    isMobile?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export default MsgReport;
