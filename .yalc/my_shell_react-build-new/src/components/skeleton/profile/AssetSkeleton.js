"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetSkeleton = AssetSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const utils_1 = require("../../../lib/utils.js");
function AssetSkeleton({ count }) {
    return ((0, jsx_runtime_1.jsx)("ul", { className: "w-full grid grid-cols-1", children: Array(count)
            .fill(1)
            ?.map((item, index) => {
            return ((0, jsx_runtime_1.jsxs)("li", { className: (0, utils_1.cn)('flex items-center justify-between border-t border-default py-4 relative'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-8 h-8 rounded-full bg-surface-container-pressed" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start gap-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-10 h-5 rounded-1 bg-surface-container-pressed" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-36 h-4 rounded-1 bg-surface-container-pressed" })] })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-10 h-5 rounded-1 bg-surface-container-pressed" })] }, index));
        }) }));
}
