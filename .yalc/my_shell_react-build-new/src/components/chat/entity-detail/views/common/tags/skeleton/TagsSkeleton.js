"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TagsSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../../../common/components/ui/skeleton.js");
function TagsSkeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex items-center flex-wrap gap-1.5", children: [0, 1, 2].map(item => ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[22px] w-16" }, item))) }));
}
