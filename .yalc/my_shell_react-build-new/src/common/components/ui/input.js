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
exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const class_variance_authority_1 = require("class-variance-authority");
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils.js");
const Input = React.forwardRef(({ className, type, autoComplete = 'off', isFull = true, rounded = 'lg', size = 'sm', border = 'default', outline = 'default', background = 'default', shadow = 'default', ...props }, ref) => {
    const { readOnly } = props;
    const inputVariants = (0, class_variance_authority_1.cva)('', {
        variants: {
            rounded: {
                none: 'rounded-none',
                sm: 'rounded-sm',
                default: 'rounded',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                '2xl': 'rounded-2xl',
                '3xl': 'rounded-3xl',
                full: 'rounded-full'
            },
            size: {
                lg: 'h-14',
                md: 'h-11',
                sm: 'h-10',
                xs: 'h-9'
            },
            border: {
                none: 'border-none',
                default: 'border border-default'
            },
            outline: {
                none: 'outline-none',
                default: 'focus-visible:outline-none aria-[invalid=true]:focus-visible:ring-error focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1'
            },
            background: {
                none: 'bg-transparent',
                default: 'bg-surface-search-field hover:bg-surface-search-field hover:bg-surface-subtle'
            },
            shadow: {
                none: 'shadow-none',
                default: 'shadow-background-default'
            }
        },
        defaultVariants: {
            rounded: 'lg',
            size: 'sm',
            border: 'default',
            outline: 'default',
            background: 'default'
        }
    });
    return ((0, jsx_runtime_1.jsx)("input", { type: type, className: (0, utils_1.cn)('flex space-x-2 p-3 text-base text-default ring-offset-surface-default hover:border-hovered aria-[invalid=true]:border-critical aria-[invalid=true]:hover:border-surface-critical-hovered aria-[invalid=true]:hover:bg-surface-accent-red-subtlest file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-disabled disabled:cursor-not-allowed disabled:opacity-30', inputVariants({ rounded, size, border, outline, background, shadow }), {
            'focus-visible:ring-offset-0 focus-visible:ring-transparent hover:bg-surface-search-field hover:border-default': readOnly
        }, isFull && 'w-full', className), autoComplete: autoComplete, ref: ref, ...props }));
});
exports.Input = Input;
Input.displayName = 'Input';
