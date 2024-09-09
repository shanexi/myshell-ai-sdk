'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { XMarkIcon } from '@heroicons/react/24/outline';
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import ExclamationCircleIcon from '@heroicons/react/24/solid/ExclamationCircleIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';
import { isString } from '../../common/utils/common-helper.js';
import { IconButton } from './ui/icon-button.js';
import { Text } from './ui/typography.js';
export default function CustomNotificationElement({ tProps, customProps }) {
    const { type, title, content, isClosable = false, translateInToast } = customProps;
    const { id } = tProps;
    const t = useTranslations();
    const displayedContent = !isString(content) ? JSON.stringify(content) : content;
    return (_jsx("div", { children: _jsx("div", { id: id, className: "z-[10000000] min-h-10 w-fit max-w-[90vw] md:max-w-[560px] rounded-full bg-surface-search-field border-opaque border shadow-modal-default py-2 px-3", children: _jsxs("div", { className: "flex items-center justify-center w-full space-x-2", children: [type && (_jsxs("div", { className: "flex-shrink-0 flex items-center", children: [type === 'info' && _jsx(InformationCircleIcon, { className: "text-surface-info-default w-6 h-6" }), type === 'success' && _jsx(CheckCircleIcon, { className: "text-surface-success-default w-6 h-6" }), type === 'warning' && _jsx(ExclamationCircleIcon, { className: "text-surface-warning-default w-6 h-6" }), type === 'error' && _jsx(XCircleIcon, { className: "text-icon-critical w-6 h-6" })] })), _jsxs("div", { className: "flex flex-col flex-grow overflow-hidden space-y-1", children: [title && (_jsx("div", { children: _jsx(Text, { size: "sm", weight: "regular", color: "default", children: title }) })), _jsx("div", { children: _jsx(Text, { size: "sm", weight: "regular", color: "default", children: translateInToast ? t(displayedContent) : displayedContent }) })] }), isClosable && (_jsx(IconButton, { variant: "ghost", icon: XMarkIcon, onClick: () => toast.dismiss(id), className: "w-4 h-4 text-icon-subtlest" }))] }) }) }));
}
