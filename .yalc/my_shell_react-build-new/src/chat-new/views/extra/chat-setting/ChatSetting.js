import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Cog8ToothIcon from '@heroicons/react/24/outline/Cog8ToothIcon';
import { useMedia } from 'react-use';
import { Drawer, DrawerContent, DrawerTrigger } from '../../../../common/components/ui/drawer.js';
import { IconButton } from '../../../../common/components/ui/icon-button.js';
import { Popover } from '../../../../common/components/ui/popover.js';
import ChatSettingForm from './ChatSettingForm.js';
export default function ChatSetting() {
    const isDesktop = useMedia('(min-width: 768px)');
    if (isDesktop) {
        return (_jsx(Popover, { content: _jsx(ChatSettingForm, {}), side: "bottom", align: "end", className: "w-[324px] p-4", children: _jsx(IconButton, { size: "md", variant: "ghost", className: "rounded-none", children: _jsx(Cog8ToothIcon, { className: "size-6 text-brand" }) }) }));
    }
    return (_jsxs(Drawer, { children: [_jsx(DrawerTrigger, { asChild: true, children: _jsx(IconButton, { size: "md", variant: "ghost", className: "rounded-none", children: _jsx(Cog8ToothIcon, { className: "size-6 text-brand" }) }) }), _jsx(DrawerContent, { className: "p-4", onCloseAutoFocus: e => e.preventDefault(), children: _jsx(ChatSettingForm, {}) })] }));
}
