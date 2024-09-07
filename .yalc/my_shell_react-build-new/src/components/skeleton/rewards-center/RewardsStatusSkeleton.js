"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RewardsStatusSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
function RewardsStatusSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 py-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3 items-center", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "flex-1 w-full h-[74px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "flex-1 w-full h-[74px]" })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-5 w-full" })] }));
}
