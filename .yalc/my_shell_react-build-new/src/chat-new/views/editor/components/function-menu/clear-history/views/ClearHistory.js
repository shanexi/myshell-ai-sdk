import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import { useToggle } from 'react-use';
import { MessageContext } from '../../../../../../../chat-new/context/MessageContext.js';
import { DropdownMenuItem } from '../../../../../../../common/components/ui/dropdown-menu.js';
import { Modal } from '../../../../../../../common/components/ui/modal.js';
import useClearHistory from '../hooks/useClearHistory.js';
export default function ClearHistory({ type, id, disabled = false, onSuccess }) {
    const { deleteSpecifiedMessageId } = useContext(MessageContext);
    const [confirming, setConfirming] = useToggle(false);
    const chatLocale = useTranslations('chat');
    const { clearing, clearHistory } = useClearHistory(type, id, deleteSpecifiedMessageId);
    const onClick = () => {
        setConfirming(true);
    };
    const confirmHandler = async () => {
        try {
            await clearHistory();
            onSuccess();
        }
        catch (e) {
            console.error(e);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(DropdownMenuItem, { disabled: disabled, className: "cursor-pointer flex items-center gap-3 relative text-critical", onSelect: e => e.preventDefault(), onClick: onClick, children: [_jsx(TrashIcon, { className: "size-5 stroke-critical" }), chatLocale('delete_chat_history')] }), confirming && (_jsx(Modal, { state: "error", isNotification: true, open: confirming, onClose: () => setConfirming(false), onConfirm: confirmHandler, title: chatLocale('delete_confirmation.header'), description: chatLocale('delete_confirmation.delete_all_content', {
                    entity: type
                }), confirmLoading: clearing }))] }));
}
