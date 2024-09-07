"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ButtonSlotSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../../../common/components/ui/skeleton.js");
function ButtonSlotSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-full flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-30 h-9" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "size-9" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "size-9" })] }));
}
