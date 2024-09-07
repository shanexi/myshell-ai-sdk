"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumSearchListSkeleton = ForumSearchListSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
function ForumSearchListSkeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full", children: Array(6)
            .fill(1)
            .map((item, index) => {
            return ((0, jsx_runtime_1.jsx)("div", { className: "w-full py-2 md:py-4 h-fit relative border-b border-default cursor-pointer", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full py-2 px-3 md:py-3 rounded-md space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center w-full space-x-1.5", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-8 h-5.5" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-14 h-5.5" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-10 h-5.5" })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-4 h-4 rounded-sm" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-col justify-center grow overflow-hidden space-y-1 md:space-y-0.5", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-between items-center space-x-2", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-6 w-full" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-1", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-5 w-12" }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-5 w-full" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-5" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-5 w-28" })] })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-18 h-18 relative flex-shrink-0" })] })] }) }, (0, common_helper_1.generateUUID)()));
        }) }));
}
