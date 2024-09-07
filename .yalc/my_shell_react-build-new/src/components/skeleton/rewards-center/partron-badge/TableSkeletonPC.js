"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TableSkeletonPC;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../common/components/ui/skeleton.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
function TableSkeletonPC({ informationColumnWidth, columnWidthList, num, animate }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col space-y-3 w-full", children: Array(num ?? 3)
                .fill(1)
                .map(() => ((0, jsx_runtime_1.jsxs)("div", { className: "px-4 py-3 border border-default rounded-xl shadow-[0_1px_2px_0_#0000001A] flex justify-between space-x-2 font-[500] w-full", children: [(0, jsx_runtime_1.jsx)("div", { style: {
                            width: informationColumnWidth
                        }, children: (0, jsx_runtime_1.jsxs)("div", { className: "h-12 flex items-center space-x-[10px]", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-12 h-12" }), (0, jsx_runtime_1.jsxs)("div", { className: "h-11 flex flex-col space-y-1 grow", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-5 w-full" }), (0, jsx_runtime_1.jsx)("span", { className: "flex space-x-1", children: Array(1)
                                                .fill(1)
                                                .map(() => ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-16 h-4" }, (0, common_helper_1.generateUUID)()))) })] })] }) }), columnWidthList.map(c => ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center", style: {
                            width: c
                        }, children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-10" }) }, (0, common_helper_1.generateUUID)())))] }, (0, common_helper_1.generateUUID)()))) }) }));
}
