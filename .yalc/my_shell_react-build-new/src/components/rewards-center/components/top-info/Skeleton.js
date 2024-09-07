"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Skeleton;
exports.Skeleton = Skeleton;
exports.default = Skeleton;
exports.Skeleton = Skeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../common/components/ui/skeleton.js");
function Skeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "h-[320px] md:h-[292px] relative shrink-0 z-10 bg-surface-container-hovered", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative z-20 w-full h-full p-4 md:px-8 md:py-10 flex flex-col justify-end md:justify-between space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[186px] h-[42px] md:w-[258px] md:h-[68px] rounded-xl bg-surface-container-pressed" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[312px] h-[24px] md:w-[162px] md:h-[24px] bg-surface-container-pressed" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[54px] h-[20px] bg-surface-container-pressed" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[224px] h-[60px] rounded-2xl bg-surface-container-pressed" })] })] }) }));
}
