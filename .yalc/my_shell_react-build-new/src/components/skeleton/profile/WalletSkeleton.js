"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletSkeleton = WalletSkeleton;
exports.WalletListSkeleton = WalletListSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
function WalletSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col justify-center items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-full items-center h-14 border-0 border-b border-default border-solid justify-center md:justify-start pl-0 md:pl-5", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "h-7 w-48 text-lg md:text-xl" }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full p-6", children: (0, jsx_runtime_1.jsx)(WalletListSkeleton, {}) })] }));
}
function WalletListSkeleton() {
    return ((0, jsx_runtime_1.jsx)("ul", { className: "w-full grid grid-cols-1 gap-y-5", children: Array(2)
            .fill(1)
            .map((item, index) => {
            return ((0, jsx_runtime_1.jsxs)("li", { className: "w-full border border-default rounded-xl overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full p-3 flex justify-center items-center bg-surface space-x-3 border-b border-default rounded-b-xl shadow-background-default", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-14 h-14 border border-default rounded-xl overflow-hidden" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex space-x-1 items-center", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-10 h-6" }) }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-14 h-6" })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-9 h-9 cursor-pointer border border-default rounded-full flex justify-center items-center" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex p-3 min-h-20 bg-surface-container-default", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("ul", { className: "flex-1 flex space-x-3 items-center overflow-hidden" }), (0, jsx_runtime_1.jsx)("div", { className: "text-surface-primary-default flex items-center space-x-1 text-base font-medium cursor-pointer" })] }) })] }, `walletskeleton-${index}`));
        }) }));
}
