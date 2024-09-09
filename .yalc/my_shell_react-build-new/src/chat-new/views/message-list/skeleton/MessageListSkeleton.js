"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MessageListSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../common/components/ui/skeleton");
function MessageListSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-5 bg-surface-default md:mt-[80px]", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-row-reverse items-start", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-2/3 h-12 rounded-2xl rounded-tr-sm" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1.5", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "size-8 rounded-lg" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-2/3 h-40 rounded-2xl rounded-tl-sm" })] })] }));
}
