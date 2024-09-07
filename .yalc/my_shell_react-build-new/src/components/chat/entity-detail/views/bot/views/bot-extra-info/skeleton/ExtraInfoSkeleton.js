"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExtraInfoSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../../../../common/components/ui/skeleton.js");
function ExtraInfoSkeleton() {
    return [0, 1].map(item => (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "size-5 rounded-full shrink-0" }, item));
}
