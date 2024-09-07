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
exports.Checkbox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const CheckboxPrimitive = __importStar(require("@radix-ui/react-checkbox"));
const class_variance_authority_1 = require("class-variance-authority");
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils.js");
const CheckIcon = ({ className }) => {
    return ((0, jsx_runtime_1.jsx)("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: (0, jsx_runtime_1.jsx)("path", { d: "M2.25 6.375L5.25 9.375L9.75 2.625", stroke: "white", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }) }));
};
const checkboxVariants = (0, class_variance_authority_1.cva)('peer w-5 h-5 shrink-0 border-[1.5px] border-pressed hover:border-depressed data-[state=checked]:border-surface-primary-default ring-offset-surface-default focus-visible:border-surface-primary-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 disabled:border-pressed disabled:cursor-not-allowed disabled:opacity-30 data-[state=checked]:bg-surface-primary-default data-[state=checked]:text-icon-static hover:data-[state=checked]:bg-surface-primary-hovered disabled:data-[state=checked]:text-disabled disabled:data-[state=checked]:border-none', {
    variants: {
        variant: {
            checkbox: 'rounded-sm',
            circle: 'rounded-full',
            radio: 'rounded-full',
            'circle-static': 'rounded-full bg-beta-black-10 border-beta-white-100 hover:border-beta-white-100'
        }
    },
    defaultVariants: {
        variant: 'checkbox'
    }
});
const Checkbox = React.forwardRef(({ className, variant, label, ...props }, ref) => ((0, jsx_runtime_1.jsx)(CheckboxPrimitive.Root, { ref: ref, className: (0, utils_1.cn)('', 'rounded-sm overflow-hidden flex items-center justify-center text-current ', checkboxVariants({ variant, className })), ...props, children: (0, jsx_runtime_1.jsx)(CheckboxPrimitive.Indicator, { children: variant === 'radio' ? (0, jsx_runtime_1.jsx)("div", { className: "w-2 h-2 bg-static rounded-full" }) : (0, jsx_runtime_1.jsx)(CheckIcon, { className: "w-3 h-3" }) }) })));
exports.Checkbox = Checkbox;
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
