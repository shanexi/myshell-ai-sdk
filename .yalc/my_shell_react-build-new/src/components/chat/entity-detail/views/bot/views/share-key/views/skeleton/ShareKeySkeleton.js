"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShareKeySkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../../../../../common/components/ui/skeleton.js");
function ShareKeySkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 relative", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row items-start md:justify-between md:items-end", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-32 h-7" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-8 h-8 rounded-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-24 h-8" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-2", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-8 h-4 rounded-full" }) })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full md:w-20 h-9 my-4 md:my-0" })] }), (0, jsx_runtime_1.jsx)("div", { className: "h-[218px] w-full flex justify-center items-center relative", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[218px]" }) })] }));
}
