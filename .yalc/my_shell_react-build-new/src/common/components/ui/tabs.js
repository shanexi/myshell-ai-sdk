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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsContent = exports.Tab = exports.Tabs = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TabsPrimitive = __importStar(require("@radix-ui/react-tabs"));
const class_variance_authority_1 = require("class-variance-authority");
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils.js");
const badge_1 = __importDefault(require("./badge.js"));
const link_1 = __importDefault(require("./link.js"));
const typography_1 = require("./typography.js");
const popover_1 = require("./popover.js");
const tabListVariants = (0, class_variance_authority_1.cva)('relative inline-flex items-center justify-center overflow-hidden', {
    variants: {
        size: {
            sm: '',
            md: '',
            lg: ''
        },
        variant: {
            button: 'rounded-full border border-default bg-surface-container-default p-0.5',
            underline: 'border-b border-default space-x-6'
        }
    },
    compoundVariants: [
        {
            variant: 'button',
            size: 'lg',
            className: 'h-12 min-w-[320px]'
        },
        {
            variant: 'button',
            size: 'md',
            className: 'h-9 min-w-[218px]'
        },
        {
            variant: 'button',
            size: 'sm',
            className: 'h-6 min-w-[180px]'
        },
        {
            variant: 'underline',
            size: 'lg',
            className: 'h-8'
        },
        {
            variant: 'underline',
            size: 'md',
            className: 'h-7'
        },
        {
            variant: 'underline',
            size: 'sm',
            className: 'h-6'
        }
    ],
    defaultVariants: {
        size: 'lg',
        variant: 'button'
    }
});
const tabVariants = (0, class_variance_authority_1.cva)('relative inline-flex h-full items-center justify-center overflow-hidden whitespace-nowrap font-medium text-subtler aria-[selected=true]:text-brand aria-[selected=true]:bg-surface-search-field aria-[selected=true]:shadow-background-default [&>div>span]:hover:text-brand disabled:pointer-events-none disabled:text-disabled [&>div>span]:disabled:text-disabled', {
    variants: {
        size: {
            sm: 'text-xs',
            md: 'text-sm',
            lg: 'text-base'
        },
        variant: {
            button: 'px-3 py-2.5 flex-1 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-surface-search-field data-[state=active]:shadow-background-default ',
            underline: 'flex items-baseline pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-brand'
        }
    },
    defaultVariants: {
        size: 'lg',
        variant: 'button'
    }
});
const Tabs = React.forwardRef(({ className, listClassName, variant = 'button', size, isLink = false, items, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(TabsPrimitive.Root, { ref: ref, className: (0, utils_1.cn)(className), ...props, children: [(0, jsx_runtime_1.jsx)(TabsPrimitive.List, { ref: ref, className: (0, utils_1.cn)('', tabListVariants({ variant, size }), listClassName), ...props, children: items?.map(item => {
                return (0, jsx_runtime_1.jsx)(Tab, { isLink: isLink, variant: variant, size: size, ...item }, item.value);
            }) }), !isLink && ((0, jsx_runtime_1.jsx)("div", { className: "w-full", children: items?.map(item => {
                return (0, jsx_runtime_1.jsx)(TabsContent, { value: item.value, children: item.children });
            }) }))] })));
exports.Tabs = Tabs;
Tabs.displayName = TabsPrimitive.Root.displayName;
const Tab = React.forwardRef(({ className, variant, size, isLink, link, count, label, hoverText, tooltipOpen, hasUnRead, onClickCallback, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsx)(popover_1.Popover, { triggerClassName: "w-full h-full flex-1", open: tooltipOpen, variant: "message", content: hoverText, children: (0, jsx_runtime_1.jsx)(TabsPrimitive.Trigger, { ref: ref, className: (0, utils_1.cn)('tabtrigger', tabVariants({ variant, size }), 'py-0 px-0', className), ...props, onClick: e => {
                e.stopPropagation();
                onClickCallback?.();
            }, children: isLink && link ? ((0, jsx_runtime_1.jsxs)(link_1.default, { href: link, className: (0, utils_1.cn)('relative h-full w-full flex justify-center items-center'), onClick: e => () => {
                    e.preventDefault();
                }, children: [label, hasUnRead && (0, jsx_runtime_1.jsx)(badge_1.default, { className: "-mt-2.5" })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex justify-center items-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { children: label }), count ? ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", className: "ml-1 text-subtlest", children: count })) : null, hasUnRead && (0, jsx_runtime_1.jsx)(badge_1.default, { className: "-mt-2.5" })] })) }) }));
});
exports.Tab = Tab;
Tab.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsx)(TabsPrimitive.Content, { ref: ref, className: (0, utils_1.cn)('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0', className), ...props }));
});
exports.TabsContent = TabsContent;
TabsContent.displayName = TabsPrimitive.Content.displayName;
