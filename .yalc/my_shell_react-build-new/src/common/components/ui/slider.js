"use strict";
'use client';
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
exports.SliderSingle = exports.Slider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const SliderPrimitive = __importStar(require("@radix-ui/react-slider"));
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils.js");
const number_input_1 = require("./number-input.js");
const Slider = React.forwardRef(({ className, size = 'lg', ...props }, ref) => ((0, jsx_runtime_1.jsx)("div", { className: "w-full p-3 flex justify-center items-center h-10 rounded-lg\t border border-default bg-surface-search-field shadow-background-default text-sm text-default ring-offset-surface-default hover:border-hovered hover:bg-surface-subtle aria-[invalid=true]:border-critical aria-[invalid=true]:hover:border-surface-critical-hovered aria-[invalid=true]:hover:bg-surface-accent-red-subtlest aria-[invalid=true]:focus-visible:ring-error file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-subtler focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-30", children: (0, jsx_runtime_1.jsxs)(SliderPrimitive.Root, { ref: ref, className: (0, utils_1.cn)('relative flex w-full touch-none select-none items-center', className), ...props, children: [(0, jsx_runtime_1.jsx)(SliderPrimitive.Track, { className: (0, utils_1.cn)('relative w-full grow overflow-hidden rounded-full bg-surface-container-hovered data-[disabled]:opacity-30', size === 'sm' ? 'h-0.5' : 'h-1.5'), children: (0, jsx_runtime_1.jsx)(SliderPrimitive.Range, { className: "absolute h-full bg-surface-primary-default data-[disabled]:opacity-30" }) }), (0, jsx_runtime_1.jsx)(SliderPrimitive.Thumb, { className: (0, utils_1.cn)('block rounded-full border-surface-primary-default bg-surface-default ring-offset-surface-default transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 data-[disabled]:pointer-events-none data-[disabled]:opacity-30', size === 'sm' ? 'w-2 h-2 border-[1.5px]' : 'w-5 h-5 border-[3px]') })] }) })));
exports.Slider = Slider;
Slider.displayName = SliderPrimitive.Root.displayName;
const SliderSingle = React.forwardRef(({ className, size = 'lg', value, defaultValue, onValueChange, onValueCommit, ...props }, ref) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-center space-x-1.5", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full p-3 flex justify-center items-center h-10 rounded-lg\t border border-default bg-surface-search-field shadow-background-default text-sm text-default ring-offset-surface-default hover:border-hovered hover:bg-surface-subtle aria-[invalid=true]:border-critical aria-[invalid=true]:hover:border-surface-critical-hovered aria-[invalid=true]:hover:bg-surface-accent-red-subtlest aria-[invalid=true]:focus-visible:ring-error file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-subtler focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-30", children: (0, jsx_runtime_1.jsxs)(SliderPrimitive.Root, { ref: ref, className: (0, utils_1.cn)('relative flex w-full touch-none select-none items-center', className), value: typeof value === 'number' ? [value] : value, defaultValue: typeof defaultValue === 'number' ? [defaultValue] : defaultValue, onValueChange: (rootValue) => onValueChange?.(rootValue?.[0]), onValueCommit: (rootValue) => onValueCommit?.(rootValue?.[0]), ...props, children: [(0, jsx_runtime_1.jsx)(SliderPrimitive.Track, { className: (0, utils_1.cn)('relative w-full grow overflow-hidden rounded-full bg-surface-container-hovered data-[disabled]:opacity-30', size === 'sm' ? 'h-0.5' : 'h-1.5'), children: (0, jsx_runtime_1.jsx)(SliderPrimitive.Range, { className: "absolute h-full bg-surface-primary-default data-[disabled]:opacity-30" }) }), (0, jsx_runtime_1.jsx)(SliderPrimitive.Thumb, { className: (0, utils_1.cn)('block rounded-full border-surface-primary-default bg-surface-default ring-offset-surface-default transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 data-[disabled]:pointer-events-none data-[disabled]:opacity-30', size === 'sm' ? 'w-2 h-2 border-[1.5px]' : 'w-5 h-5 border-[3px]') })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0 w-14 h-9 flex justify-center items-center rounded-lg\t", children: (0, jsx_runtime_1.jsx)(number_input_1.NumberInput, { value: value, min: props?.min, max: props?.max, step: props?.step, controls: false, defaultValue: defaultValue, onChange: e => onValueChange?.(Number(e.target.value)) }) })] })));
exports.SliderSingle = SliderSingle;
SliderSingle.displayName = 'SliderSingle';
