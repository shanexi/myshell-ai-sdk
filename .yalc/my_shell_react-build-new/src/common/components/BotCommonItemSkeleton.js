"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BotCommonItemSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("./ui/skeleton.js");
function BotCommonItemSkeleton({ num }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Array(num ?? 1)
            .fill(0)
            .map((item, index) => ((0, jsx_runtime_1.jsx)(SkeletonItem, {}, index))) }));
}
function SkeletonItem() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-fit flex flex-row justify-start items-center hover:bg-surface-pressed transition-all p-2 pl-0 md:pl-2 rounded-[12px] overflow-hidden ml-2 sm:ml-0", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "rounded-2xl aspect-square w-[72px] md:w-16" }), (0, jsx_runtime_1.jsx)("div", { className: "w-[calc(100%-64px)] h-full flex-1 flex flex-col justify-between items-start ml-3 text-sm", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-center items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "h-full flex-1 flex flex-col md:justify-between items-start text-sm space-y-1 mr-2", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "rounded-[4px] w-2/5 h-4" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "rounded-[4px] w-full h-6" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "rounded-[4px] w-2/5 h-4" })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "rounded-full w-[58px] h-7" })] }) })] }));
}
