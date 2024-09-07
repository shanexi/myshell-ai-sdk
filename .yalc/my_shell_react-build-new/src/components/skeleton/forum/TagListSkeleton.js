"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagListSkeleton = TagListSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
function TagListSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center w-full space-x-1.5", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[56px] md:w-[3.89vw] h-5.5 rounded-md" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[142px] md:w-[9.86vw] h-5.5 rounded-md" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[72px] md:w-[5vw] h-5.5 rounded-md" })] }));
}
