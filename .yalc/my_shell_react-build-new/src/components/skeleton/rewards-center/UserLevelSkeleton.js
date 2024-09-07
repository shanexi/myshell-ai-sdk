"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserLevelSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
function UserLevelSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1 w-full h-10", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-10 h-10" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-6 h-5" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-20 h-4" })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[6px]" })] })] }));
}
