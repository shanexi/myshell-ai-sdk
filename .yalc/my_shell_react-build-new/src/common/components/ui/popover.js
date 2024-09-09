'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { cn } from '../../../lib/utils.js';
const PopoverRoot = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverClose = PopoverPrimitive.Close;
const PopoverContent = React.forwardRef(({ className, align = 'center', variant = 'default', side = 'top', sideOffset = 4, showArrow = true, children, container, ...props }, ref) => (_jsx(PopoverPrimitive.Portal, { container: container, children: _jsxs(PopoverPrimitive.Content, { ref: ref, align: align, sideOffset: sideOffset, side: side, forceMount: true, className: cn('relative z-[49] w-fit max-w-72 text-xs mx-4 p-3 text-left rounded-lg border border-opaque shadow-modal-default outline-none data-[state=open]:animate-in [&[data-state=open]>span]:animate-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', variant === 'default'
            ? 'bg-surface-search-field text-subtle'
            : variant === 'info'
                ? 'bg-surface-accent-yellow-subtle text-warning-bolder'
                : 'bg-utility-sky-blue-500 text-static', className), ...props, children: [children, showArrow && (_jsx(PopoverPrimitive.Arrow, { className: cn(variant === 'default'
                    ? 'fill-surface-search-field'
                    : variant === 'info'
                        ? 'fill-surface-accent-yellow-subtle'
                        : 'fill-utility-sky-blue-500') }))] }) })));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const Popover = ({ disabled = false, open, content, anchor, children, className, triggerClassName, hasOpenState = false, isMTooltip = false, modal = false, openChangeCallback, ...props }) => {
    return (_jsxs(PopoverRoot, { open: disabled ? false : open, modal: modal, onOpenChange: openChangeCallback, ...props, children: [anchor, content && (_jsxs(_Fragment, { children: [_jsx("div", { className: cn('inline-flex items-center justify-center', hasOpenState && 'data-[state=open]:bg-surface-hovered', triggerClassName), onClick: e => {
                            if (isMTooltip) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }, children: _jsx(PopoverTrigger, { className: cn('inline-flex items-center justify-center', hasOpenState && 'data-[state=open]:bg-surface-hovered', triggerClassName), children: children }) }), _jsx(PopoverContent, { ...props, className: cn('w-fit max-w-[324px]', className), onCloseAutoFocus: e => e.preventDefault(), children: content })] })), !content && children] }));
};
export { Popover, PopoverAnchor, PopoverContent, PopoverRoot };
