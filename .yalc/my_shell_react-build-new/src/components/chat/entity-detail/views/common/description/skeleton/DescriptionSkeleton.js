"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DescriptionSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../../../common/components/ui/skeleton.js");
function DescriptionSkeleton() {
    return (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-14 w-40" });
}
