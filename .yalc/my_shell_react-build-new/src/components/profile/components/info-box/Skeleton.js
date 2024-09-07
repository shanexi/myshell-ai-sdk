"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = Skeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../common/components/ui/skeleton.js");
function Skeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full flex items-center justify-between", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-between relative mr-3", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "rounded-2xl w-21 h-21 md:w-18 md:h-18" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 justify-center grow", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-between", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[28px] w-[140px]" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex space-x-2", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[24px] w-[76px] rounded-lg" }) })] })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col space-y-2", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[38px]" }) })] }));
}
