import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Content from '../../../../../chat-new/views/message-list/components/content/index.js';
import { useDisplayContext } from '../../../../../chat-new/views/message-list/components/display-provider/index.js';
import Menubar from '../../../../../chat-new/views/message-list/components/menubar/index.js';
export default function MineMessage() {
    const { message } = useDisplayContext();
    return (_jsxs("div", { className: "w-[calc(100%-38px)] ml-[38px] group/menu gap-x-1.5 flex justify-end", children: [_jsx(Menubar, { className: "hidden md:group-hover/menu:flex" }), _jsx("div", { children: _jsx("div", { className: "min-w-12 max-w-[303px] md:max-w-[420px] lg:max-w-[476px] large:max-w-[480px] rounded-2xl rounded-tr-sm min-h-11 p-3 bg-surface-primary-subtle-hovered", children: _jsx(Content, { message: message }) }) })] }));
}
