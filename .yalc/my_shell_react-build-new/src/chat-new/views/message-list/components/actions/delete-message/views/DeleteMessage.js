import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import { useToggle } from 'react-use';
import { MessageContext } from '../../../../../../../chat-new/context/MessageContext.js';
import { StaticContext } from '../../../../../../../chat-new/context/StaticContext.js';
import { useDisplayContext } from '../../../../../../../chat-new/views/message-list/components/display-provider/index.js';
import { ContextMenuItem } from '../../../../../../../common/components/ui/context-menu.js';
import { IconButton } from '../../../../../../../common/components/ui/icon-button.js';
import { Modal } from '../../../../../../../common/components/ui/modal.js';
import { Text } from '../../../../../../../common/components/ui/typography.js';
import useDeleteMessage from '../hooks/useDeleteMessage.js';
export default function DeleteMessage(props) {
    const [confirming, setConfirming] = useToggle(false);
    const { source } = props;
    const chatLocale = useTranslations('chat');
    const commonT = useTranslations('common');
    const { type, entityInfo } = useContext(StaticContext);
    const { id } = entityInfo;
    const { deleteSpecifiedMessageId } = useContext(MessageContext);
    const { message } = useDisplayContext();
    const { deleting, deleteMessage } = useDeleteMessage(type, id, deleteSpecifiedMessageId);
    const onDeleteMessage = () => {
        setConfirming(true);
    };
    const confirmHandler = async () => {
        try {
            await deleteMessage(message.id);
        }
        catch (e) {
            console.error(e);
        }
    };
    return (_jsxs(_Fragment, { children: [source === 'menubar' ? (_jsx(IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: onDeleteMessage, children: _jsx(TrashIcon, { className: "size-[18px] text-error" }) })) : (_jsxs(ContextMenuItem, { onClick: onDeleteMessage, children: [_jsx(TrashIcon, { className: "size-5 text-error" }), _jsx(Text, { className: "ml-2 text-error", children: commonT('delete') })] })), confirming && (_jsx(Modal, { state: "warning", isNotification: true, open: confirming, onClose: () => setConfirming(false), onConfirm: confirmHandler, title: chatLocale('delete_confirmation.header'), description: chatLocale('delete_confirmation.delete_part_content', {
                    num: 1,
                    entity: type
                }), confirmLoading: deleting }))] }));
}
