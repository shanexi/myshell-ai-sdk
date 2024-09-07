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
exports.AvatarFallback = exports.AvatarImage = exports.AvatarRoot = exports.Avatar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const AvatarPrimitive = __importStar(require("@radix-ui/react-avatar"));
const class_variance_authority_1 = require("class-variance-authority");
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils.js");
const avatarVariants = (0, class_variance_authority_1.cva)('relative flex shrink-0 overflow-hidden bg-surface-container-hovered', {
    variants: {
        size: {
            xs: 'w-5 h-5 rounded',
            sm: 'w-6 h-6 rounded-md',
            md: 'w-8 h-8 rounded-lg',
            lg: 'w-9 h-9 rounded-lg',
            xl: 'w-12 h-12 rounded-xl',
            '2xl': 'w-14 h-14 rounded-xl',
            '3xl': 'w-16 h-16 rounded-xl',
            '4xl': 'w-18 h-18 rounded-2xl',
            '5xl': 'w-21 h-21 rounded-2xl',
            '6xl': 'w-30 h-30 rounded-4xl'
        }
    },
    defaultVariants: {
        size: 'md'
    }
});
const AvatarRoot = React.forwardRef(({ className, size = 'md', ...passProps }, ref) => ((0, jsx_runtime_1.jsx)(AvatarPrimitive.Root, { ref: ref, className: (0, utils_1.cn)(avatarVariants({ size }), className), ...passProps })));
exports.AvatarRoot = AvatarRoot;
AvatarRoot.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AvatarPrimitive.Image, { ref: ref, className: (0, utils_1.cn)('aspect-square h-full w-full object-cover', className), ...props })));
exports.AvatarImage = AvatarImage;
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AvatarPrimitive.Fallback, { ref: ref, className: (0, utils_1.cn)('flex h-full w-full items-center justify-center bg-surface-container-pressed', className), ...props })));
exports.AvatarFallback = AvatarFallback;
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const Avatar = React.forwardRef(({ className, rootStyle, size, src, variant = 'bot', ...passProps }, ref) => {
    const defaultSrc = variant === 'user'
        ? 'https://image.myshell.ai/cdn-cgi/image/quality=40,format=webp/image/user/avatar/default/20240715/avatar.png'
        : 'https://image.myshell.ai/cdn-cgi/image/quality=40,format=webp/image/bot/logo/20240106/default.png';
    return ((0, jsx_runtime_1.jsxs)(AvatarRoot, { size: size, className: className, style: rootStyle, children: [(0, jsx_runtime_1.jsx)(AvatarImage, { ref: ref, ...passProps, src: src || defaultSrc }), (0, jsx_runtime_1.jsx)(AvatarFallback, {})] }));
});
exports.Avatar = Avatar;
Avatar.displayName = 'Avatar';
