import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Flex, Text } from '@chakra-ui/react';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useNewChatStore } from '../../../../chat-new/services/useNewChatStore.js';
import { Modal } from '../../../../common/components/ui/modal.js';
export default function SaveTipModal({ maxSize }) {
    const t = useTranslations('common');
    const chatT = useTranslations('chat');
    const fileAlert = useNewChatStore(state => state.fileUpload.alert);
    const setFileAlert = useNewChatStore(state => state.setFileAlert);
    const hasSupport = fileAlert.data[0].length > 0;
    const hasTooLarge = fileAlert.data[1].length > 0;
    const total = hasSupport && hasTooLarge ? 2 : 1;
    const [index, setIndex] = useState(total === 1 && hasTooLarge ? 1 : 0);
    const handleClose = () => {
        if (total === 2 && index === 0) {
            setIndex(1);
        }
        else {
            setFileAlert({ visible: false });
        }
    };
    const current = index === 0 ? fileAlert.data[0] : fileAlert.data[1];
    return (_jsx(Modal, { open: true, onClose: handleClose, hideClose: true, size: "sm", overlayClassName: "z-[9999]", contentClassName: "z-[9999] p-0", children: _jsxs("div", { children: [_jsxs("div", { className: "px-6 pt-6 pb-4 bg-surface-accent-yellow-subtlest rounded-t-4xl", children: [_jsx("div", { className: "w-14 h-14 p-2 rounded-full flex items-center justify-center bg-[#FFEBD3] dark:bg-[#4F3E2C] border-[6px] border-[#FFF5EA] dark:border-[#383029] flex-shrink-0 ", children: _jsx(ExclamationTriangleIcon, { className: "w-9 h-9 stroke-[#FAAC00] dark:stroke-[#FFC453]" }) }), _jsx(Flex, { flexDirection: "column", color: "#202223", className: "space-y-2", children: _jsx("h2", { className: "text-xl text-on-surface", children: index === 0 ? chatT('panel.unsupported') : chatT('panel.maxsize') }) })] }), _jsxs("div", { className: "bg-surface w-full rounded-4xl px-4 py-4 text-[#414345] dark:text-[#B8BCCF]", children: [index === 0 && (_jsx(Text, { fontSize: "14px", lineHeight: "20px", className: "text-secondary", children: chatT('panel.unsupported_tip') })), index === 0 && (_jsx("ul", { className: "list-disc list-inside mt-4", children: current.map((item) => {
                                return (_jsx("li", { className: "list-item line-clamp-2 break-all font-medium text-on-surface", children: _jsx("span", { className: "-ml-3", children: item.name }) }, item.name));
                            }) })), index === 1 && (_jsx("span", { children: chatT('panel.maxsize_tip', {
                                maxSize: maxSize || 50
                            }) })), _jsx(Button, { width: "100%", variant: "outline", color: "white", rounded: "full", display: "flex", justifyContent: "center", alignItems: "center", className: "h-[44px] px-6 py-2.5 font-bold text-primary mt-4", onClick: handleClose, children: t('confirm') })] })] }) }));
}
