'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../../lib/utils.js';
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogTrigger = React.forwardRef(({ className, ...props }, ref) => (_jsx(DialogPrimitive.Trigger, { ref: ref, className: cn('ring-offset-surface-default focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1', className), ...props })));
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (_jsx(DialogPrimitive.Overlay, { ref: ref, className: cn('fixed inset-0 z-50 bg-opacity-90 md:bg-opacity-75 bg-alpha-mask-desktop data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', className), ...props })));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, hideClose = false, maskClosable = true, overlayClose = true, onClose, overlayClassName, iconClassName, ...props }, ref) => (_jsxs(DialogPortal, { children: [_jsx(DialogOverlay, { onClick: () => {
                maskClosable && overlayClose && onClose && onClose();
            }, className: overlayClassName }), _jsxs(DialogPrimitive.Content, { ref: ref, className: cn('fixed left-[50%] top-[50%] z-50 grid w-[90%] rounded-4xl max-w-lg translate-x-[-50%] translate-y-[-50%] bg-surface-default shadow-modal-default duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] ring-offset-surface-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 focus-visible:outline-0', className), ...props, children: [children, !hideClose && (_jsxs(DialogPrimitive.Close, { className: cn('w-9 h-9 absolute right-5 top-3 flex justify-center items-center focus-visible:outline-0 rounded-full hover:bg-surface-hovered', iconClassName), onClick: () => {
                        onClose && onClose();
                    }, children: [_jsx(X, { className: "w-6 h-6 text-icon-subtle" }), _jsx("span", { className: "sr-only", children: "Close" })] }))] })] })));
DialogContent.displayName = DialogPrimitive.Content.displayName;
function DialogHeader({ className, ...props }) {
    return _jsx("div", { className: cn('flex flex-col p-4', className), ...props });
}
DialogHeader.displayName = 'DialogHeader';
function DialogFooter({ className, ...props }) {
    return _jsx("div", { className: cn('flex justify-end p-4', className), ...props });
}
DialogFooter.displayName = 'DialogFooter';
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx(DialogPrimitive.Title, { ref: ref, className: cn('text-xl font-normal', className), ...props })));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx(DialogPrimitive.Description, { ref: ref, className: cn('text-sm text-subtle p-4', className), ...props })));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
export { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
