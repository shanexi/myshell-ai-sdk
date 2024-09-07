"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InviteSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
function InviteSkeleton() {
    return ((0, jsx_runtime_1.jsx)("section", { className: `grow h-full`, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: `flex w-full items-center h-14 border-0 border-b border-default border-solid justify-center md:justify-start pl-0 md:pl-5`, children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "pt-0.5 h-7\tw-48 text-lg md:text-xl" }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full px-4 flex justify-center", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { animate: true, className: "mt-10 h-96 w-full xl:w-[640px] lg:w-[500px] pt-5 pb-12 rounded-xl" }) })] }) }));
}
