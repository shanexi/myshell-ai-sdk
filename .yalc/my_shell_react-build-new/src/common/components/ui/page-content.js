"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../../../lib/utils.js");
function PageContent({ children }) {
    return ((0, jsx_runtime_1.jsx)("section", { className: (0, utils_1.cn)('page-content relative h-full flex-1 flex flex-col overflow-hidden bg-surface-default text-default rounded-none md:rounded-2xl'), children: children }));
}
exports.default = PageContent;
