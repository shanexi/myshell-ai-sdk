"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RecommendSwiperSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../common/components/ui/skeleton.js");
function RecommendSwiperSkeleton({ isMobile }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 pt-6 pb-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-1 items-center mx-6", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-20 h-7" }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full rounded-xl ml-2 px-4 flex items-center gap-4", children: new Array(isMobile ? 1 : 3).fill(1).map((item, i) => ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[300px] h-[120px] flex-shrink-0 rounded-xl" }, i))) })] }));
}
