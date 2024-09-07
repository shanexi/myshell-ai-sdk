"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendListSkeleton = RecommendListSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
function RecommendListSkeleton({ isWorkshop }) {
    function GridItems() {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "md:px-2.5 w-full flex items-center justify-between mb-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[91px] md:w-[178px] h-[28px] rounded-md" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[50px] md:w-[78px] h-[28px] rounded-md" })] }), (0, jsx_runtime_1.jsx)("div", { className: "h-[314px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 overflow-hidden gap-x-5 pb-4", children: Array(12)
                        .fill(1)
                        .map(item => {
                        return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full cursor-pointer overflow-hidden rounded-none h-[96px] md:h-[104.66px] mb-3 md:mb-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full px-0 md:px-2.5 flex flex-row justify-start items-center rounded-xl overflow-hidden h-[88px]", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "relative flex shrink-0 overflow-hidden bg-surface-container-hovered w-18 h-18 rounded-2xl" }), (0, jsx_runtime_1.jsxs)("div", { className: "w-[calc(100%-84px)] flex-1 flex flex-col justify-center items-start ml-3 text-sm h-[84px] space-y-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[60%] h-[16px] rounded" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[16px] rounded" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[20%] h-[16px] rounded" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "pl-4 ml-[72px]", children: (0, jsx_runtime_1.jsx)("hr", { className: "w-full border-t-0 border-b border-default mt-2" }) })] }, (0, common_helper_1.generateUUID)()));
                    }) })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "px-4 md:px-3.5 rounded-md !mt-2 !mb-0 md:!my-4", children: [(0, jsx_runtime_1.jsx)(GridItems, {}), isWorkshop ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-3 md:mt-6", children: (0, jsx_runtime_1.jsx)(GridItems, {}) })) : ((0, jsx_runtime_1.jsx)("div", { className: "h-[420] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 overflow-hidden gap-5 pb-4 md:px-2", children: Array(4)
                    .fill(1)
                    .map(item => {
                    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[420px] my-3 md:my-5 rounded-2xl" }) }, (0, common_helper_1.generateUUID)()));
                }) }))] }));
}
