import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import { useContext } from 'react';
import { MessageContext } from '../../../../chat-new/context/MessageContext.js';
import { StaticContext } from '../../../../chat-new/context/StaticContext.js';
import { IconButton } from '../../../../common/components/ui/icon-button.js';
export function FileUploader({ disabled = false }) {
    const { fileUploadDisabled } = useContext(StaticContext);
    const { getClickRootProps, getInputProps } = useContext(MessageContext);
    return (_jsxs("div", { ...getClickRootProps?.(), children: [_jsx("input", { className: "invisible w-0 h-0", ...getInputProps?.() }), _jsx(IconButton, { disabled: disabled || fileUploadDisabled, variant: "ghost", color: "brand", size: "md", icon: PlusCircleIcon })] }));
}
