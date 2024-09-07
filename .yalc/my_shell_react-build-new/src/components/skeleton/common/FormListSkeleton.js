"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormListSkeleton = FormListSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
function FormListSkeleton({ column = 2 }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full overflow-hidden", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col h-full", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-1/3 h-5 mt-4 rounded-lg" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-wull h-[46px] mt-1.5 rounded-lg" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-1/3 h-5 mt-4 rounded-lg" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-wull h-[96px] mt-1.5 rounded-lg" })] }) }));
}
