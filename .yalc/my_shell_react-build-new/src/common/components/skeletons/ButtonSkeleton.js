"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ButtonSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../ui/skeleton.js");
function ButtonSkeleton() {
    return (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "min-w-[117px] h-9 rounded-full" });
}
