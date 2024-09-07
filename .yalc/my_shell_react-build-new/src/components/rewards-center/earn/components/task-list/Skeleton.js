"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = Skeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../common/components/ui/skeleton.js");
const utils_1 = require("../../../../../lib/utils.js");
function Skeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full", children: (0, jsx_runtime_1.jsx)("ul", { className: "space-y-3", children: new Array(5).fill(0).map((_, index) => {
                return ((0, jsx_runtime_1.jsx)("li", { className: (0, utils_1.cn)('relative w-full p-3 rounded-xl border border-default bg-surface-default shadow-background-default'), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start md:items-center flex-col md:flex-row md:space-x-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex overflow-hidden", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[46px] h-[46px] md:w-[52px] md:h-[52px] rounded-xl" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col justify-center space-y-1 ml-3 overflow-hidden pb-2 md:pb-0", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-5 md:w-[186px] md:h-6" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-4 md:w-[578px] md:h-6" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-between space-x-3 w-full md:w-auto pl-[60px] md:pl-0 pt-2 md:pt-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex space-x-3 justify-end", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-9 h-9" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[102px] md:w-[126px] h-9 rounded-full" })] }) })] }) }, index));
            }) }) }));
}
