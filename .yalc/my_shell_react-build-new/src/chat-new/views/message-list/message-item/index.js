import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import AlertMessage from '../../../../chat-new/views/message-list/message-item/alert-message/index.js';
import MineMessage from '../../../../chat-new/views/message-list/message-item/mine-message/index.js';
import ReplyMessage from '../../../../chat-new/views/message-list/message-item/reply-message/index.js';
export default function MessageItem({ msgDisplayType, source }) {
    return useMemo(() => {
        switch (msgDisplayType) {
            case 'NORMAL':
                if (source === 'USER') {
                    return _jsx(MineMessage, {});
                }
                return _jsx(ReplyMessage, {});
            case 'INFO':
            case 'NOTIFICATION':
            default:
                return _jsx(AlertMessage, {});
        }
    }, [msgDisplayType, source]);
}
