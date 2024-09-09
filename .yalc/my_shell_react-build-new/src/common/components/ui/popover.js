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
exports.PopoverRoot = exports.PopoverContent = exports.PopoverAnchor = exports.Popover = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const PopoverPrimitive = __importStar(require("@radix-ui/react-popover"));
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils");
const PopoverRoot = PopoverPrimitive.Root;
exports.PopoverRoot = PopoverRoot;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
exports.PopoverAnchor = PopoverAnchor;
const PopoverClose = PopoverPrimitive.Close;
const PopoverContent = React.forwardRef(({ className, align = 'center', variant = 'default', side = 'top', sideOffset = 4, showArrow = true, children, container, ...props }, ref) => ((0, jsx_runtime_1.jsx)(PopoverPrimitive.Portal, { container: container, children: (0, jsx_runtime_1.jsxs)(PopoverPrimitive.Content, { ref: ref, align: align, sideOffset: sideOffset, side: side, forceMount: true, className: (0, utils_1.cn)('relative z-[49] w-fit max-w-72 text-xs mx-4 p-3 text-left rounded-lg border border-opaque shadow-modal-default outline-none data-[state=open]:animate-in [&[data-state=open]>span]:animate-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', variant === 'default'
            ? 'bg-surface-search-field text-subtle'
            : variant === 'info'
                ? 'bg-surface-accent-yellow-subtle text-warning-bolder'
                : 'bg-utility-sky-blue-500 text-static', className), ...props, children: [children, showArrow && ((0, jsx_runtime_1.jsx)(PopoverPrimitive.Arrow, { className: (0, utils_1.cn)(variant === 'default'
                    ? 'fill-surface-search-field'
                    : variant === 'info'
                        ? 'fill-surface-accent-yellow-subtle'
                        : 'fill-utility-sky-blue-500') }))] }) })));
exports.PopoverContent = PopoverContent;
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const Popover = ({ disabled = false, open, content, anchor, children, className, triggerClassName, hasOpenState = false, isMTooltip = false, modal = false, openChangeCallback, ...props }) => {
    return ((0, jsx_runtime_1.jsxs)(PopoverRoot, { open: disabled ? false : open, modal: modal, onOpenChange: openChangeCallback, ...props, children: [anchor, content && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('inline-flex items-center justify-center', hasOpenState && 'data-[state=open]:bg-surface-hovered', triggerClassName), onClick: e => {
                            if (isMTooltip) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }, children: (0, jsx_runtime_1.jsx)(PopoverTrigger, { className: (0, utils_1.cn)('inline-flex items-center justify-center', hasOpenState && 'data-[state=open]:bg-surface-hovered', triggerClassName), children: children }) }), (0, jsx_runtime_1.jsx)(PopoverContent, { ...props, className: (0, utils_1.cn)('w-fit max-w-[324px]', className), onCloseAutoFocus: e => e.preventDefault(), children: content })] })), !content && children] }));
};
exports.Popover = Popover;
