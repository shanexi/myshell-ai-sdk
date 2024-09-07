"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../../../common/components/ui/skeleton.js");
function TabSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-between items-center relative z-[1]", children: (0, jsx_runtime_1.jsx)("div", { className: "flex gap-6 md:gap-5 items-center w-full", children: [1, 2, 3].map(item => ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[6px] cursor-pointer", children: (0, jsx_runtime_1.jsx)("div", { className: "w-12 h-[14px] md:h-4 flex gap-1", children: item }) }, item))) }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full border-t border-default relative bottom-[1px]" }), (0, jsx_runtime_1.jsx)("div", { className: "py-5", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[360px]" }) })] }));
}
