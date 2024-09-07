"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkShopChatSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const ChatListSkeleton_1 = require("../../../components/skeleton/chat/ChatListSkeleton.js");
function WorkShopChatSkeleton({ isMobile, className }) {
    return ((0, jsx_runtime_1.jsx)("div", { style: { minHeight: isMobile ? '100%' : 'calc(100% - 108px)' }, className: `rounded-b-3xl bg-surface-default back flex flex-col items-center grow overflow-y-auto relative select-none md:select-auto z-10 ${className}`, children: (0, jsx_runtime_1.jsx)(ChatListSkeleton_1.ChatListSkeleton, {}) }));
}
