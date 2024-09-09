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
exports.Icon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const class_variance_authority_1 = require("class-variance-authority");
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils");
const iconVariants = (0, class_variance_authority_1.cva)('inline-flex shrink-0', {
    variants: {
        size: {
            '2xs': 'w-3 h-3',
            xs: 'w-3.5 h-3.5',
            sm: 'w-4 h-4',
            md: 'w-4.5 h-4.5',
            lg: 'w-5 h-5',
            xl: 'w-5.5 h-5.5',
            '2xl': 'w-6 h-6',
            '3xl': 'w-7 h-7',
            '4xl': 'w-8 h-8',
            '5xl': 'w-9 h-9',
            '6xl': 'w-10 h-10',
            '7xl': 'w-12 h-12'
        },
        color: {
            default: 'text-default',
            subtle: 'text-subtle',
            subtlest: 'text-subtlest',
            disabled: 'text-disabled',
            inverse: 'text-inverse',
            static: 'text-static',
            brand: 'text-brand',
            critical: 'text-critical',
            warning: 'text-warning',
            success: 'text-success'
        },
        rotate: {
            '45': 'rotate-45',
            '90': 'rotate-90',
            '-45': '-rotate-45',
            '-90': '-rotate-90',
            '180': 'rotate-180'
        }
    },
    defaultVariants: {
        size: 'sm',
        color: 'default'
    }
});
const Icon = React.forwardRef((props, ref) => {
    const { children, component, size, color, rotate, className, ...passProps } = props;
    const Com = component || 'span';
    return ((0, jsx_runtime_1.jsx)(Com, { ref: ref, ...passProps, className: (0, utils_1.cn)(iconVariants({ size, color, rotate }), className), children: children }));
});
exports.Icon = Icon;
Icon.displayName = 'Icon';
