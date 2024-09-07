"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomSketelon;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../../lib/utils.js");
function CustomSketelon({ customClass, children, animate = true }) {
    return (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('bg-surface-container-hovered', customClass, animate && 'animate-pulse '), children: children });
}
