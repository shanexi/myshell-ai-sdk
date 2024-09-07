"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StakeTrendSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../../../../../common/components/ui/skeleton.js");
function StakeTrendSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 relative", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-36 h-4 md:h-[18px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-9 w-36 rounded-full" })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[218px]" })] }));
}
