"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../common/components/ui/skeleton.js");
const Skeleton = () => ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4", children: Array(12)
        .fill(1)
        .map(i => ((0, jsx_runtime_1.jsxs)("div", { className: "border border-default shadow-background-default bg-surface-default rounded-xl", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "aspect-square w-full rounded-none" }), (0, jsx_runtime_1.jsx)("div", { className: "p-4", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[24px] w-[88px]" }) })] }, i))) }));
exports.Skeleton = Skeleton;
