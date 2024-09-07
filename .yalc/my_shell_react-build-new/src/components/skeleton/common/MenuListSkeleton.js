"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MenuListSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
function MenuListSkeleton({ number = 6 }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Array(number)
            .fill(1)
            .map(() => ((0, jsx_runtime_1.jsxs)("div", { className: "w-full px-2.5 flex flex-row justify-start items-center rounded-xl overflow-hidden h-[72px]", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-14 w-14 md:h-12 md:w-12 flex-shrink-0 rounded-xl mr-2" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center flex-col w-full space-y-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[40%] h-[16px] rounded" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-[16px] rounded" })] })] }, (0, common_helper_1.generateUUID)()))) }));
}
