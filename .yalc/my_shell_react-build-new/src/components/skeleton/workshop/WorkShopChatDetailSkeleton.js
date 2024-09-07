"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkShopChatDetailSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
function WorkShopChatDetailSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-[108px] flex items-center pannelDetail p-4 md:px-6 md:py-3 w-full rounded-3xl bg-surface-default text-on-surface relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative flex shrink-0 overflow-hidden bg-surface-container-hovered w-14 h-14 rounded-xl", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "aspect-square h-full w-full object-cover" }) }), (0, jsx_runtime_1.jsx)("div", { className: "grow flex items-center ml-3", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-full h-10 lg:w-[40%] mb-2 lg:mb-0 rounded" }) })] }));
}
