"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
function DashboardSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col rounded-4xl px-5", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[36px] my-5  w-[20%]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[28px] w-[20%]" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 overflow-y-auto gap-5 pb-[2px] h-full pt-4 md:pt-5 md:grid-cols-2", children: Array(4)
                    .fill(1)
                    .map(() => ((0, jsx_runtime_1.jsxs)("div", { className: "p-6 h-fit-content rounded-[24px] flex flex-col border border-default h-[334px] shadow-[0px 1px 2px 0px #0000001A]", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-6 w-[60%]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "aspect-square mt-[12px] rounded-[12px] w-full" })] }, (0, common_helper_1.generateUUID)()))) })] }));
}
