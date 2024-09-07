"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RedemptionSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
function RedemptionSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-[234px] bg-[#F6F6F7] dark:bg-[#323339] w-full" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 min-[1080px]:grid-cols-2 min-[1440px]:grid-cols-3 min-[1640px]:grid-cols-4 overflow-y-auto gap-5 pb-[2px] h-full pt-4 md:pt-5", children: Array(7)
                    .fill(1)
                    .map(() => ((0, jsx_runtime_1.jsxs)("div", { className: "p-[24px] h-fit-content rounded-[24px] flex flex-col border border-default shadow-[0px 1px 2px 0px #0000001A]", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[24px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "aspect-square mt-[12px] rounded-[12px] w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "rounded-full h-[44px] mt-[24px]" })] }, (0, common_helper_1.generateUUID)()))) })] }));
}
