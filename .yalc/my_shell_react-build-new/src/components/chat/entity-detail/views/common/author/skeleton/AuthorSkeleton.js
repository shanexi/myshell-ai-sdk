"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthorSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../../../common/components/ui/skeleton.js");
function AuthorSkeleton() {
    return (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-5 w-16" });
}
