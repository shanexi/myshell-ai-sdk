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
exports.TooltipProvider = exports.Tooltip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TooltipPrimitive = __importStar(require("@radix-ui/react-tooltip"));
const React = __importStar(require("react"));
const react_use_1 = require("react-use");
const utils_1 = require("../../../lib/utils");
const popover_1 = require("./popover");
const typography_1 = require("./typography");
const TooltipProvider = TooltipPrimitive.Provider;
exports.TooltipProvider = TooltipProvider;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipArrow = TooltipPrimitive.Arrow;
const Tooltip = React.forwardRef(({ open, defaultOpen, disabled = false, children, title, description, titleDangerous = false, descriptionDangerous = false, contentClassName, triggerClassName, ...props }, ref) => {
    const isDesktop = (0, react_use_1.useMedia)('(min-width: 768px)');
    const defaultTitleColor = props.variant === 'message' ? 'static' : props.variant === 'default' ? 'warning-bolder' : 'default';
    const defaultDescColor = props.variant === 'message' ? 'static' : props.variant === 'info' ? 'warning-bolder' : 'subtle';
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: isDesktop ? ((0, jsx_runtime_1.jsx)(TooltipProvider, { children: (0, jsx_runtime_1.jsxs)(TooltipPrimitive.Root, { open: disabled || (!description && !title) ? false : open, defaultOpen: defaultOpen, children: [(0, jsx_runtime_1.jsx)(TooltipTrigger, { asChild: typeof children === 'object', className: (0, utils_1.cn)('cursor-pointer', triggerClassName), children: children }), (0, jsx_runtime_1.jsxs)(TooltipContent, { ref: ref, className: contentClassName, ...props, children: [title && ((0, jsx_runtime_1.jsx)("p", { className: "mb-1", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", color: defaultTitleColor, dangerous: titleDangerous, children: title }) })), description && ((0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: title ? 'regular' : 'medium', color: title ? 'subtler' : defaultDescColor, dangerous: descriptionDangerous, children: description }))] })] }) })) : ((0, jsx_runtime_1.jsx)(popover_1.Popover, { open: open, content: description, disabled: disabled, triggerClassName: triggerClassName, className: contentClassName, isMTooltip: true, ...props, children: children })) }));
});
exports.Tooltip = Tooltip;
Tooltip.displayName = TooltipPrimitive.Root.displayName;
const TooltipContent = React.forwardRef(({ className, variant = 'default', align = 'center', side = 'top', sideOffset = 4, alignOffset = 0, showArrow = true, arrowClassName, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(TooltipPrimitive.Content, { ref: ref, align: align, sideOffset: sideOffset, alignOffset: alignOffset, side: side, className: (0, utils_1.cn)('relative z-[49] w-fit max-w-72 text-xs mx-4 p-3 text-left rounded-lg border border-opaque shadow-modal-default outline-none delay-0 data-[state=open]:animate-in [&[data-state=open]>span]:animate-none data-[state=open]:fade-in-0 data-[state=delayed-open]:animate-in [&[data-state=delayed-open]>span]:animate-none data-[state=delayed-open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', variant === 'default'
        ? 'bg-surface-search-field text-subtle'
        : variant === 'info'
            ? 'bg-surface-accent-yellow-subtle text-warning-bolder'
            : 'bg-utility-sky-blue-500 text-static', className), ...props, children: [props.children, showArrow && ((0, jsx_runtime_1.jsx)(TooltipArrow, { width: 16, height: 6, className: (0, utils_1.cn)(variant === 'default'
                ? 'fill-surface-search-field'
                : variant === 'info'
                    ? 'fill-surface-accent-yellow-subtle'
                    : 'fill-utility-sky-blue-500', arrowClassName) }))] })));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
