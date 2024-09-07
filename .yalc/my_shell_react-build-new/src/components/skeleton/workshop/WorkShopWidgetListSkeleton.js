"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkShopWidgetListSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
function WorkShopWidgetListSkeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "relative w-full overflow-hidden space-y-3 md:space-y-6 md:px-6 px-4", children: Array(3)
            .fill(1)
            .map(() => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-between mb-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[91px] md:w-[178px] h-[16px] md:h-[28px] rounded-md" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[30px] md:w-[78px] h-[16px] md:h-[28px] rounded-md" })] }), (0, jsx_runtime_1.jsx)("div", { className: "h-full grid grid-cols-1 min-[1024px]:grid-cols-2 min-[1441px]:grid-cols-3 overflow-hidden gap-5 pb-4", children: Array(9)
                        .fill(1)
                        .map(() => {
                        return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full overflow-hidden rounded-none h-[96px] md:h-[104.66px] mb-3 md:mb-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-row justify-start items-center rounded-xl overflow-hidden h-[88px]", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[72px] w-[72px] flex-shrink-0 rounded-2xl mr-3" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center flex-col w-full space-y-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[60%] h-[16px] rounded" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[16px] rounded" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[16px] rounded" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "pl-4 ml-[72px]", children: (0, jsx_runtime_1.jsx)("hr", { className: "w-full border-t-0 border-b border-default mt-2" }) })] }, (0, common_helper_1.generateUUID)()));
                    }) })] }, (0, common_helper_1.generateUUID)()))) }));
}
