"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkShopSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const FilterTagListSkeleton_1 = require("../common/FilterTagListSkeleton.js");
const RecommendListSkeleton_1 = require("../common/RecommendListSkeleton.js");
function WorkShopSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative h-full flex-1 flex flex-col overflow-hidden bg-surface-default text-on-surface rounded-none md:rounded-[24px]", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-between items-center pt-2.5 pb-2.5 md:pt-4 md:pb-4 px-4 md:px-6 border-b border-default", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-between items-center space-x-3 min-h-10", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[22px] md:h-[28px] rounded-md text-xl w-5.5 md:w-full lg:w-[40%] md:mb-2 lg:mb-0 flex-shrink-0" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "relative w-full lg:w-[240px] h-[40px] rounded-full" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex-grow py-4 md:py-0 space-y-6 no-scrollbar", children: [(0, jsx_runtime_1.jsx)("div", { className: "mt-2 md:mt-6 relative w-auto flex justify-between px-4 md:px-6 max-h-[306px] overflow-y-auto flex-shrink-0", children: (0, jsx_runtime_1.jsx)(FilterTagListSkeleton_1.FilterTagListSkeleton, { column: 3 }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-3 md:mt-0", children: (0, jsx_runtime_1.jsx)(RecommendListSkeleton_1.RecommendListSkeleton, { isWorkshop: true }) })] })] }));
}
