"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatListSkeleton = ChatListSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
function ChatListSkeleton({ isMobile }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full pr-1 md:pr-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "py-3 px-4 md:px-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row-reverse items-start mt-6", children: [isMobile ? null : (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "ml-2 mt-1.5 w-9 h-9 rounded-lg" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: `w-2/3 h-12 rounded-2xl ${isMobile ? 'rounded-tr-sm' : 'mr-2 '}` })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex mt-6", children: [isMobile ? null : (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "ml-2 mt-1.5 w-9 h-9 rounded-lg" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: `w-2/3 h-40 rounded-2xl ${isMobile ? 'rounded-tl-sm' : 'ml-2 '}` })] })] }) }));
}
