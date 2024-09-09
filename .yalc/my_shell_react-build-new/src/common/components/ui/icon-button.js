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
exports.iconButtonVariants = exports.IconButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_slot_1 = require("@radix-ui/react-slot");
const class_variance_authority_1 = require("class-variance-authority");
const lucide_react_1 = require("lucide-react");
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils.js");
const iconButtonVariants = (0, class_variance_authority_1.cva)('shrink-0 inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-colors ring-offset-surface-default focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-30 disabled:shadow-none', {
    variants: {
        variant: {
            primary: 'bg-surface-primary-default text-icon-static shadow-button-primary hover:bg-surface-primary-hovered active:bg-surface-primary-pressed',
            outline: 'border border-default text-icon-subtle shadow-button-basic hover:bg-surface-hovered focus:bg-surface-pressed active:shadow-button-pressed',
            ghost: 'text-icon hover:bg-surface-hovered active:bg-surface-pressed'
        },
        color: {
            default: '',
            brand: '',
            warning: '',
            error: '',
            gray: '',
            static: 'text-icon-static hover:bg-transparent active:bg-transparent'
        },
        size: {
            sm: 'h-7 w-7 text-sm',
            md: 'h-9 w-9 text-sm',
            lg: 'h-11 w-11'
        }
    },
    compoundVariants: [
        {
            variant: 'primary',
            color: 'default',
            className: 'text-icon-brand bg-surface-search-field border border-default hover:bg-surface-hovered active:bg-surface-pressed shadow-button-basic disabled:bg-surface-disabled disabled:text-surface-accent-blue-subtle [&>svg]:disabled:text-surface-accent-blue-subtle disabled:opacity-100'
        },
        {
            variant: 'primary',
            color: 'brand',
            className: 'bg-surface-primary-default hover:bg-surface-primary-hovered active:bg-surface-primary-pressed'
        },
        {
            variant: 'primary',
            color: 'warning',
            className: 'bg-surface-warning-default hover:bg-surface-warning-hovered active:bg-surface-warning-pressed'
        },
        {
            variant: 'primary',
            color: 'error',
            className: 'bg-surface-critical-default hover:bg-surface-critical-hovered active:bg-surface-critical-pressed'
        },
        {
            variant: 'primary',
            color: 'gray',
            className: 'text-icon-subtle bg-surface-search-field border border-default hover:bg-surface-hovered active:bg-surface-pressed shadow-button-basic disabled:bg-surface-disabled disabled:text-disabled disabled:opacity-100 [&>svg]:disabled:text-icon-disabled'
        },
        {
            variant: 'outline',
            color: 'default',
            className: 'border-default text-icon shadow-button-basic active:shadow-button-pressed'
        },
        {
            variant: 'outline',
            color: 'brand',
            className: 'border-surface-primary-default text-icon-brand'
        },
        {
            variant: 'outline',
            color: 'warning',
            className: 'border-surface-warning-default text-icon-warning hover:bg-surface-warning-subtle-hovered active:bg-surface-warning-subtle-pressed'
        },
        {
            variant: 'outline',
            color: 'error',
            className: 'border-surface-critical-default text-icon-critical hover:bg-surface-critical-subtle-hovered active:bg-surface-critical-subtle-pressed'
        },
        {
            variant: 'outline',
            color: 'gray',
            className: 'text-icon-subtle hover:bg-surface-hovered active:shadow-button-pressed'
        },
        {
            variant: 'ghost',
            color: 'default',
            className: 'text-icon'
        },
        {
            variant: 'ghost',
            color: 'brand',
            className: 'text-icon-brand'
        },
        {
            variant: 'ghost',
            color: 'warning',
            className: 'text-icon-warning focus:shadow-rings-warning'
        },
        {
            variant: 'ghost',
            color: 'error',
            className: 'text-icon-critical focus:shadow-rings-error'
        },
        {
            variant: 'ghost',
            color: 'gray',
            className: 'text-subtler hover:text-subtler'
        }
    ],
    defaultVariants: {
        variant: 'primary',
        color: 'brand',
        size: 'lg'
    }
});
exports.iconButtonVariants = iconButtonVariants;
const IconButton = React.forwardRef(({ className, variant, size, color, asChild = false, loading = false, children, icon: IconEle, disabled, ...passProps }, ref) => {
    const Comp = asChild ? react_slot_1.Slot : 'button';
    const iconCls = (0, utils_1.cn)({
        'w-4.5 h-4.5': size === 'sm',
        'w-5.5 h-5.5': size === 'md',
        'w-6 h-6': size === 'lg'
    });
    const disable = disabled || loading;
    return ((0, jsx_runtime_1.jsx)(Comp, { className: (0, utils_1.cn)(iconButtonVariants({ variant, size, color }), disable && 'cursor-not-allowed !pointer-events-auto', className), ref: ref, disabled: disable, ...passProps, children: loading ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: (0, utils_1.cn)('animate-spin', iconCls) })) : IconEle ? ((0, jsx_runtime_1.jsx)(IconEle, { className: iconCls })) : React.isValidElement(children) ? (React.cloneElement(children, {
            className: (0, utils_1.cn)(iconCls, children.props.className)
        })) : null }));
});
exports.IconButton = IconButton;
