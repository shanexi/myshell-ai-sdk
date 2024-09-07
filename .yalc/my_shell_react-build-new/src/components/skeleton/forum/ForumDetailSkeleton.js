"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumDetailSkeleton = ForumDetailSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const utils_1 = require("../../../lib/utils.js");
const ForumDetailContentSkeleton_1 = require("./ForumDetailContentSkeleton.js");
function ForumDetailSkeleton({ hasPostId }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('relative h-full flex-1 flex flex-col overflow-hidden bg-surface-default text-default md:rounded-2xl'), children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full flex flex-col justify-between items-center pt-2.5 pb-2.5 md:pt-4 md:pb-4 px-4 md:px-6 md:border-b md:border-default", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-between items-center min-h-10", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-9 h-9 flex md:hidden rounded-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-7 w-20" }), (0, jsx_runtime_1.jsx)("div", { className: "w-auto flex-shrink-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-9 h-9 rounded-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-9 h-9 rounded-full hidden md:block" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-9 h-9 rounded-full hidden md:block" })] }) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full flex flex-col items-center p-4 md:p-6 overflow-y-auto", children: (0, jsx_runtime_1.jsx)(ForumDetailContentSkeleton_1.ForumDetailContentSkeleton, {}) })] }));
}
