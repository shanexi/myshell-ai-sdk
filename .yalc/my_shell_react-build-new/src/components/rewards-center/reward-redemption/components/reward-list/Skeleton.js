"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = Skeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../common/components/ui/skeleton.js");
function Skeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4", children: Array(6)
            .fill(1)
            .map((key, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "border border-default shadow-background-default bg-surface-default rounded-xl", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "aspect-square w-full rounded-none" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col p-4 space-y-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[24px] w-[88px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[44px] w-full rounded-full" })] })] }, key + index))) }));
}
