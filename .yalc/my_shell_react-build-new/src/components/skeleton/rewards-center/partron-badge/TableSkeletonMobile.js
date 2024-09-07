"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TableSkeletonMobile;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../common/components/ui/skeleton.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
function TableSkeletonMobile({ columns, num, showBtn = false, animate }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Array(num ?? 2)
            .fill(1)
            .map(() => ((0, jsx_runtime_1.jsxs)("div", { className: "border border-default rounded-xl flex flex-col font-[500]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center p-3 border-b border-default w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-[10px] items-center", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "rounded-xl w-12 h-12" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-[2px]", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-5 w-30" }), (0, jsx_runtime_1.jsx)("span", { className: "flex w-14", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-14 h-4 rounded-md" }, (0, common_helper_1.generateUUID)()) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-1.5 justify-center w-full", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[70px] h-5" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[54px] h-5" })] })] }), showBtn && ((0, jsx_runtime_1.jsx)("div", { className: "px-4 pb-3", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-9 rounded-full" }) }))] }, (0, common_helper_1.generateUUID)()))) }));
}
