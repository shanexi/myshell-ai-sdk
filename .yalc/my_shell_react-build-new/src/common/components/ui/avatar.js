'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../../lib/utils.js';
const avatarVariants = cva('relative flex shrink-0 overflow-hidden bg-surface-container-hovered', {
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
const AvatarRoot = React.forwardRef(({ className, size = 'md', ...passProps }, ref) => (_jsx(AvatarPrimitive.Root, { ref: ref, className: cn(avatarVariants({ size }), className), ...passProps })));
AvatarRoot.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (_jsx(AvatarPrimitive.Image, { ref: ref, className: cn('aspect-square h-full w-full object-cover', className), ...props })));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (_jsx(AvatarPrimitive.Fallback, { ref: ref, className: cn('flex h-full w-full items-center justify-center bg-surface-container-pressed', className), ...props })));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const Avatar = React.forwardRef(({ className, rootStyle, size, src, variant = 'bot', ...passProps }, ref) => {
    const defaultSrc = variant === 'user'
        ? 'https://image.myshell.ai/cdn-cgi/image/quality=40,format=webp/image/user/avatar/default/20240715/avatar.png'
        : 'https://image.myshell.ai/cdn-cgi/image/quality=40,format=webp/image/bot/logo/20240106/default.png';
    return (_jsxs(AvatarRoot, { size: size, className: className, style: rootStyle, children: [_jsx(AvatarImage, { ref: ref, ...passProps, src: src || defaultSrc }), _jsx(AvatarFallback, {})] }));
});
Avatar.displayName = 'Avatar';
export { Avatar, AvatarRoot, AvatarImage, AvatarFallback };
