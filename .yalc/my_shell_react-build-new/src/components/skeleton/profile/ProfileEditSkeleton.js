"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfileEditSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
function ProfileEditSkeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: 'h-full overflow-hidden flex w-full flex-col flex-nowrap bg-surface-default text-on-surface relative md:rounded-4xl', children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col flex-grow items-center relative overflow-hidden md:overflow-auto", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full pb-2 overflow-auto md:h-full md:mb-0 md:pb-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-full relative h-30 md:max-h-48 md:h-[12.2vw]" }), (0, jsx_runtime_1.jsxs)("div", { className: "px-4 md:px-10 mt-4 space-y-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-64 relative h-10" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "w-40 relative h-6" })] })] }) }) }));
}
