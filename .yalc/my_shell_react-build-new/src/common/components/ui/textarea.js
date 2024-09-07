"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Textarea = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils.js");
const typography_1 = require("./typography.js");
const Textarea = React.forwardRef(({ className, maxLength, value, error, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("textarea", { className: (0, utils_1.cn)('w-full min-h-[123px] p-3 pb-10 rounded-lg border border-default bg-surface-search-field ', 'shadow-background-default text-sm text-default ring-offset-surface-default  ', 'hover:border-hovered hover:bg-surface-subtle aria-[invalid=true]:border-critical aria-[invalid=true]:hover:border-surface-critical-hovered aria-[invalid=true]:hover:bg-surface-accent-red-subtlest ', 'aria-[invalid=true]:focus-visible:ring-error file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-subtler', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-30', (maxLength && (value?.toString()?.length || 0) > maxLength) || error
                            ? 'border-critical hover:border-critical hover:bg-surface-accent-red-subtlest focus-visible:ring-error'
                            : '', className), ref: ref, maxLength: maxLength, value: value, ...props }), maxLength ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute text-right bottom-5 right-4 border-default", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtlest", children: `${value?.toString()?.length || 0}/${maxLength}` }) })) : null] }), error && ((0, jsx_runtime_1.jsx)("div", { className: "w-full", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-wrap", size: "sm", weight: "regular", color: "critical", children: error }) }))] }));
});
exports.Textarea = Textarea;
Textarea.displayName = 'Textarea';
