"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ListSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
function ListSkeleton() {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Array(3)
            .fill(1)
            .map((item, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "w-full rounded-xl overflow-hidden p-3 flex items-center space-x-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-12 h-12 shrink-0 rounded-xl" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col grow overflow-hidden space-y-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "h-6 w-24 rounded-sm" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "h-5 w-full rounded-sm" })] })] }, index))) }));
}
