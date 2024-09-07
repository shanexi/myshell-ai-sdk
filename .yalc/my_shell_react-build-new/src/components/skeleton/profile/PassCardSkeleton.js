"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PassCardSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
function PassCardSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col rounded-4xl", children: [(0, jsx_runtime_1.jsx)("div", { className: `flex w-full items-center h-14 border-0 border-b border-default border-solid justify-center md:justify-start pl-0 md:pl-5`, children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "h-7 w-48 text-lg md:text-xl" }) }), (0, jsx_runtime_1.jsx)("div", { className: "max-w-full overflow-y-auto", children: (0, jsx_runtime_1.jsx)("div", { className: `snap-mandatory snap-x mt-4 md:mt-10 overflow-scroll flex flex-row pl-5 no-scrollbar space-x-5 justify-center`, children: [1, 2, 3].map(item => ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "p-6 rounded-4xl h-[calc(100vh-166px)] w-72" }, item))) }) })] }));
}
