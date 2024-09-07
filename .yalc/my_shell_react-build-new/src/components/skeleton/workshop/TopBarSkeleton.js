"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TopBarSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
function TopBarSkeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "topbar flex-shrink-0 relative md:rounded-t-[24px] bg-surface-default text-on-surface flex justify-center items-center w-full h-[56px] md:h-[76px] md:border-b-[1px] border-default md:pl-[60px]", children: (0, jsx_runtime_1.jsx)("div", { id: "workshopTopbar", className: "flex h-[36px] md:h-12 border-default border-[1px] rounded-full bg-[--surface-create-bg] md:bg-surface", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-[36px] md:h-[48px] w-[202px] md:w-[346px] rounded-full" }) }) }));
}
