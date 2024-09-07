"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TitleSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const utils_1 = require("../../../lib/utils.js");
function TitleSkeleton({ border = true }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('shrink-0 flex w-full text-on-surface bg-surface-container-default md:bg-surface-default items-center h-[56px] md:h-[60px]  z-10 justify-center md:justify-start md:pl-5', border ? 'border-0 md:border-b border-default border-solid' : 'border-none'), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('absolute left-4 text-lg cursor-pointer md:hidden'), children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[22px] h-[22px]" }) }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-5 w-16 md:h-7 pt-[0.175rem]" })] }));
}
