"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = Skeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const Skeleton_1 = require("./components/task-list/Skeleton.js");
const Skeleton_2 = require("../components/top-info/Skeleton.js");
const skeleton_1 = require("../../../common/components/ui/skeleton.js");
const utils_1 = require("../../../lib/utils.js");
function Skeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('h-full overflow-hidden relative'), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full overflow-hidden", children: [(0, jsx_runtime_1.jsx)(Skeleton_2.Skeleton, {}), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex flex-col p-4 grow relative'), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col pb-[80px] md:pb-[0] grow", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center shrink-0", children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col grow", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[72px] h-[28px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-[90px] h-[36px]" })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-4 grow", children: (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, {}) })] }) })] }) }));
}
