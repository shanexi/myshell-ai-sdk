"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumSkeleton = ForumSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../../../lib/utils.js");
const ForumDetailSkeleton_1 = require("./ForumDetailSkeleton.js");
const ForumListPageSkeleton_1 = require("./ForumListPageSkeleton.js");
function ForumSkeleton({ hasPostId = false }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-row flex-nowrap justify-start overflow-hidden", children: [(0, jsx_runtime_1.jsx)(ForumListPageSkeleton_1.ForumListPageSkeleton, {}), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('relative grow overflow-hidden flex-shrink-0 z-[11]', hasPostId ? 'w-0' : 'w-[calc(100%-400px)] p-2'), children: (0, jsx_runtime_1.jsx)("div", { className: "relative h-full flex-1 flex flex-col overflow-hidden bg-surface-default text-on-surface rounded-none md:rounded-4xl", children: (0, jsx_runtime_1.jsx)(ForumDetailSkeleton_1.ForumDetailSkeleton, { hasPostId: hasPostId }) }) })] }));
}
