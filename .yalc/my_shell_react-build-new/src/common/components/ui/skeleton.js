"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = Skeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../../../lib/utils.js");
function Skeleton({ className, animate = true, ...props }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('rounded-md bg-surface-container-hovered dark:bg-surface-container-pressed', className, animate && 'animate-pulse '), ...props }));
}
