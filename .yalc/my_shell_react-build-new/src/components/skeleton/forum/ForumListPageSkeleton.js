"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumListPageSkeleton = ForumListPageSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const ForumSearchListSkeleton_1 = require("./ForumSearchListSkeleton.js");
const FilterTagListSkeleton_1 = require("../common/FilterTagListSkeleton.js");
function ForumListPageSkeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col overflow-hidden w-full flex-1 md:flex-auto", children: (0, jsx_runtime_1.jsxs)("div", { className: "md:px-3 flex flex-col items-center justify-start h-screen", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full px-4 md:px-3 pb-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "pt-5 md:pt-6 pb-3 md:pb-5 w-full flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-10 md:mb-2 lg:mb-0 flex-shrink-0" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-10 md:w-20 h-7 flex-shrink-0" })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-10 flex-shrink-0 rounded-full" })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex w-full px-4 md:px-3 pt-2 md:pt-3", children: (0, jsx_runtime_1.jsx)(FilterTagListSkeleton_1.FilterTagListSkeleton, { column: 1, count: "less" }) }), (0, jsx_runtime_1.jsx)("div", { className: "px-1 w-full", children: (0, jsx_runtime_1.jsx)(ForumSearchListSkeleton_1.ForumSearchListSkeleton, {}) })] }) }));
}
