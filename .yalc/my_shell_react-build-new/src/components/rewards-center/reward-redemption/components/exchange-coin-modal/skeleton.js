"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Skeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../common/components/ui/skeleton.js");
function Skeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex p-4 w-full flex-col justify-between overflow-hidden space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[120px] h-[28px]" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-5", children: Array(4)
                            .fill(1)
                            .map((key, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center space-x-1.5", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "rounded-full h-[36px] w-[36px]" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col space-y-0.5", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[120px] h-[20px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[40px] h-[20px]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1 items-end", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-end space-x-0.5", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[18px] h-[18px] rounded-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[20px] h-[20px]" })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[30px] h-[12px]" })] })] }, key + index))) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "block md:hidden border-t border-default -mx-4" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[44px]" })] })] }));
}
