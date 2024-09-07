"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RewardRedemptionSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const utils_1 = require("../../../lib/utils.js");
function RewardRedemptionSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('h-full relative shrink-0 z-[1]', 'md:h-[297px]'), children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[294px] rounded-t-xl" }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('grid grid-cols-1 overflow-y-auto gap-5 pb-[2px] text-on-surface p-4 ', 'md:pt-5 md:h-full', 'lg:grid-cols-2', 'large:grid-cols-3', '2xl:grid-cols-4 min-[1640px]:grid-cols-4'), children: new Array(3).fill(1).map((_, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "h-fit rounded-xl flex flex-col border border-default shadow-[0px 1px 2px 0px #0000001A] overflow-hidden", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "aspect-square w-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-3 p-4 ", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[24px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[44px] mt-[24px]" })] })] }, index))) })] }));
}
