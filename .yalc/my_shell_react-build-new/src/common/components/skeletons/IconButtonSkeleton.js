"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IconButtonSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../ui/skeleton.js");
function IconButtonSkeleton() {
    return (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "size-9 rounded-full" });
}
