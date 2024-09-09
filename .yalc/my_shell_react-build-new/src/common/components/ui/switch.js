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
exports.Switch = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const SwitchPrimitives = __importStar(require("@radix-ui/react-switch"));
const class_variance_authority_1 = require("class-variance-authority");
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils");
const switchRootVariants = (0, class_variance_authority_1.cva)('peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ring-offset-surface-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 data-[state=unchecked]:focus-visible:bg-surface-container-pressed disabled:cursor-not-allowed disabled:opacity-30 data-[state=checked]:bg-surface-primary-default data-[state=unchecked]:bg-surface-container-pressed', {
    variants: {
        size: {
            sm: 'w-7 h-4',
            md: 'w-[34px] h-5',
            lg: 'w-10 h-6'
        }
    },
    defaultVariants: {
        size: 'lg'
    }
});
const switchThumbVariants = (0, class_variance_authority_1.cva)('pointer-events-none block rounded-full bg-surface-default ring-0 transition-transform data-[state=unchecked]:translate-x-0', {
    variants: {
        size: {
            sm: 'w-3 h-3 data-[state=checked]:translate-x-3',
            md: 'w-4 h-4 data-[state=checked]:translate-x-[14px]',
            lg: 'w-5 h-5 data-[state=checked]:translate-x-4'
        }
    },
    defaultVariants: {
        size: 'lg'
    }
});
const Switch = React.forwardRef(({ className, size, ...props }, ref) => ((0, jsx_runtime_1.jsx)(SwitchPrimitives.Root, { className: (0, utils_1.cn)(switchRootVariants({ size, className }), className), ...props, ref: ref, children: (0, jsx_runtime_1.jsx)(SwitchPrimitives.Thumb, { className: (0, utils_1.cn)(switchThumbVariants({ size })) }) })));
exports.Switch = Switch;
Switch.displayName = SwitchPrimitives.Root.displayName;
