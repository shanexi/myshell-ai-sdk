"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BotWidgetsSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const skeleton_1 = require("../../../../../../../common/components/ui/skeleton.js");
function BotWidgetsSkeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2", children: [0, 1].map(item => ((0, jsx_runtime_1.jsx)("div", { className: "rounded-xl px-0 md:px-2.5 h-18", children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "size-12 rounded-xl" }) }, item))) }));
}
