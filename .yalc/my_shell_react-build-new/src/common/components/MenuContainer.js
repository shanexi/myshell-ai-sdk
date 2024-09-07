"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../../lib/utils.js");
function MenuContainer({ className, children }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex w-full md:w-[280px] lg:w-[320px] large:w-[360px] h-full flex-shrink-0 flex-col relative overflow-hidden', className), children: children }));
}
exports.default = MenuContainer;
