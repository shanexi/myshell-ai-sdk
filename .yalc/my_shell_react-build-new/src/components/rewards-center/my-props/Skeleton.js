"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = Skeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const Skeleton_1 = require("./components/my-props-list/Skeleton.js");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const utils_1 = require("../../../lib/utils.js");
function Skeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full overflow-hidden relative", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('shrink-0 flex items-center w-ful h-15 bg-surface-default border-b border-default z-10 px-6 py-4 hidden md:block'), children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[80px] h-[28px]" }) }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('block md:hidden shrink-0 flex  items-center justify-center bg-surface-default px-4 h-14 border-b border-default'), children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[80px] h-[28px]" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col px-4 py-3 pb-[80px] md:px-6 md:py-4", children: (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, {}) }) })] }));
}
