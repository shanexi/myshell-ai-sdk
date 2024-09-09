'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';
import { useMedia } from 'react-use';
import { cn } from '../../../lib/utils.js';
import { Popover } from './popover.js';
import { Description } from './typography.js';
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipArrow = TooltipPrimitive.Arrow;
const Tooltip = React.forwardRef(({ open, defaultOpen, disabled = false, children, title, description, titleDangerous = false, descriptionDangerous = false, contentClassName, triggerClassName, ...props }, ref) => {
    const isDesktop = useMedia('(min-width: 768px)');
    const defaultTitleColor = props.variant === 'message' ? 'static' : props.variant === 'default' ? 'warning-bolder' : 'default';
    const defaultDescColor = props.variant === 'message' ? 'static' : props.variant === 'info' ? 'warning-bolder' : 'subtle';
    return (_jsx(_Fragment, { children: isDesktop ? (_jsx(TooltipProvider, { children: _jsxs(TooltipPrimitive.Root, { open: disabled || (!description && !title) ? false : open, defaultOpen: defaultOpen, children: [_jsx(TooltipTrigger, { asChild: typeof children === 'object', className: cn('cursor-pointer', triggerClassName), children: children }), _jsxs(TooltipContent, { ref: ref, className: contentClassName, ...props, children: [title && (_jsx("p", { className: "mb-1", children: _jsx(Description, { size: "lg", weight: "medium", color: defaultTitleColor, dangerous: titleDangerous, children: title }) })), description && (_jsx(Description, { size: "lg", weight: title ? 'regular' : 'medium', color: title ? 'subtler' : defaultDescColor, dangerous: descriptionDangerous, children: description }))] })] }) })) : (_jsx(Popover, { open: open, content: description, disabled: disabled, triggerClassName: triggerClassName, className: contentClassName, isMTooltip: true, ...props, children: children })) }));
});
Tooltip.displayName = TooltipPrimitive.Root.displayName;
const TooltipContent = React.forwardRef(({ className, variant = 'default', align = 'center', side = 'top', sideOffset = 4, alignOffset = 0, showArrow = true, arrowClassName, ...props }, ref) => (_jsxs(TooltipPrimitive.Content, { ref: ref, align: align, sideOffset: sideOffset, alignOffset: alignOffset, side: side, className: cn('relative z-[49] w-fit max-w-72 text-xs mx-4 p-3 text-left rounded-lg border border-opaque shadow-modal-default outline-none delay-0 data-[state=open]:animate-in [&[data-state=open]>span]:animate-none data-[state=open]:fade-in-0 data-[state=delayed-open]:animate-in [&[data-state=delayed-open]>span]:animate-none data-[state=delayed-open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', variant === 'default'
        ? 'bg-surface-search-field text-subtle'
        : variant === 'info'
            ? 'bg-surface-accent-yellow-subtle text-warning-bolder'
            : 'bg-utility-sky-blue-500 text-static', className), ...props, children: [props.children, showArrow && (_jsx(TooltipArrow, { width: 16, height: 6, className: cn(variant === 'default'
                ? 'fill-surface-search-field'
                : variant === 'info'
                    ? 'fill-surface-accent-yellow-subtle'
                    : 'fill-utility-sky-blue-500', arrowClassName) }))] })));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
export { Tooltip, TooltipProvider };
