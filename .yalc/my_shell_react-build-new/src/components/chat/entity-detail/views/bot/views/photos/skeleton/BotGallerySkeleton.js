"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BotGallerySkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../../../../common/components/ui/skeleton.js");
function BotGallerySkeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-3 md:grid-cols-4 gap-[2px] relative", children: [0, 1, 2].map(item => ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "aspect-square" }, item))) }));
}
