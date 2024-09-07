"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettingSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
function SettingSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col rounded-4xl", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-full items-center h-14 border-0 border-b border-default border-solid justify-center md:justify-start pl-0 md:pl-5", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "h-7 w-48 text-lg md:text-xl" }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-[16px] md:mt-11 mb-24 mx-auto w-full px-4 flex flex-col items-center space-y-5 md:h-auto justify-between grow", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full flex flex-col md:items-center space-y-4", children: [1, 2, 3, 4, 5].map(item => ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "rounded-2xl h-11 w-full md:w-[450px]" }, item))) }) })] }));
}
