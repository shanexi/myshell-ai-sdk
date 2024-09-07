"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TopActionsSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../common/components/ui/skeleton.js");
function TopActionsSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "px-[10px] md:px-0 h-14 flex justify-between items-center md:justify-end shrink-0 md:absolute top-0 right-6 z-20", children: [(0, jsx_runtime_1.jsx)("span", { className: "md:hidden", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "size-9 rounded-full" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-1 md:gap-0 md:shadow-button-basic md:rounded-lg overflow-hidden", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "size-9 rounded-full" }) })] }));
}
