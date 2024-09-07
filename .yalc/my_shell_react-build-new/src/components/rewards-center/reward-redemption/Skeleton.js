"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = Skeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const Skeleton_1 = require("../components/top-info/Skeleton.js");
const Skeleton_2 = require("./components/reward-list/Skeleton.js");
function Skeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full overflow-hidden", children: [(0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, {}), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col grow px-4 py-3 pb-[80px] md:px-6 md:py-4", children: (0, jsx_runtime_1.jsx)(Skeleton_2.Skeleton, {}) })] }));
}
