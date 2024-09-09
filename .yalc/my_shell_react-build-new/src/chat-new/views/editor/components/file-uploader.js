import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import { useContext } from 'react';
import { MessageContext } from '../../../../chat-new/context/MessageContext.js';
import { IconButton } from '../../../../common/components/ui/icon-button.js';
export function FileUploader({ disabled = false }) {
    const { getClickRootProps, getInputProps } = useContext(MessageContext);
    return (_jsxs("div", { ...getClickRootProps?.(), children: [_jsx("input", { ...getInputProps?.() }), _jsx(IconButton, { disabled: disabled, variant: "ghost", color: "brand", size: "md", icon: PlusCircleIcon })] }));
}
