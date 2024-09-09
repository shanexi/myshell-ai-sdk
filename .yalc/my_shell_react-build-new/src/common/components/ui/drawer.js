'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '../../../lib/utils.js';
function Drawer({ shouldScaleBackground = false, ...props }) {
    return _jsx(DrawerPrimitive.Root, { shouldScaleBackground: shouldScaleBackground, ...props });
}
Drawer.displayName = 'Drawer';
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;
const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (_jsx(DrawerPrimitive.Overlay, { ref: ref, className: cn('fixed inset-0 z-50 bg-alpha-mask-mobile', className), ...props })));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => (_jsxs(DrawerPortal, { children: [_jsx(DrawerOverlay, {}), _jsx(DrawerPrimitive.Content, { ref: ref, className: cn('fixed inset-x-0 bottom-0 z-50 flex h-auto max-h-[70%] flex-col rounded-t-2xl bg-surface-default shadow-modal-default', className), ...props, children: children })] })));
DrawerContent.displayName = 'DrawerContent';
function DrawerHeader({ className, ...props }) {
    return _jsx("div", { className: cn('p-4', className), ...props });
}
DrawerHeader.displayName = 'DrawerHeader';
function DrawerFooter({ className, ...props }) {
    return _jsx("div", { className: cn('p-4', className), ...props });
}
DrawerFooter.displayName = 'DrawerFooter';
const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx(DrawerPrimitive.Title, { ref: ref, className: cn('text-xl font-normal text-default', className), ...props })));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;
const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx(DrawerPrimitive.Description, { ref: ref, className: cn('text-sm text-subtle', className), ...props })));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription };
