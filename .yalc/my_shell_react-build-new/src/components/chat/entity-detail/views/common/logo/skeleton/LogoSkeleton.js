"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LogoSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../../../common/components/ui/skeleton.js");
function LogoSkeleton() {
    return (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "size-12 md:size-14 rounded-xl" });
}
