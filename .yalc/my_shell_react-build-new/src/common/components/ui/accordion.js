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
exports.AccordionTrigger = exports.AccordionItem = exports.AccordionContent = exports.Accordion = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const AccordionPrimitive = __importStar(require("@radix-ui/react-accordion"));
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils.js");
const icon_1 = require("./icon.js");
const separator_1 = require("./separator.js");
const typography_1 = require("./typography.js");
const DownIcon_1 = __importDefault(require("../icons/DownIcon.js"));
const Accordion = AccordionPrimitive.Root;
exports.Accordion = Accordion;
const AccordionItem = React.forwardRef((props, ref) => {
    const { className, triggerClassName, sticky, children, label, count } = props;
    return ((0, jsx_runtime_1.jsxs)(AccordionPrimitive.Item, { ref: ref, className: (0, utils_1.cn)('w-full', className), ...props, children: [(0, jsx_runtime_1.jsx)(AccordionTrigger, { label: label, count: count, className: triggerClassName, sticky: sticky }), (0, jsx_runtime_1.jsx)(AccordionContent, { children: children })] }));
});
exports.AccordionItem = AccordionItem;
AccordionItem.displayName = 'AccordionItem';
const AccordionTrigger = React.forwardRef((props, ref) => {
    const { className, headerClassName, count, label, sticky, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)(AccordionPrimitive.Header, { className: (0, utils_1.cn)('flex', headerClassName, sticky && 'sticky top-0 z-10'), children: (0, jsx_runtime_1.jsx)(AccordionPrimitive.Trigger, { ref: ref, ...rest, className: (0, utils_1.cn)('flex flex-1 items-center justify-between font-medium transition-all [&[data-state=closed]>div>div>div>svg]:-rotate-90', className), children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col justify-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "py-3", children: (0, jsx_runtime_1.jsx)(separator_1.Separator, {}) }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-between items-center py-1.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: DownIcon_1.default, size: "2xs", className: "fill-icon-subtlest" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", className: "truncate text-left", children: label })] }), count ? ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtlest", className: "flex-shrink-0", children: count })) : null] })] }) }) }));
});
exports.AccordionTrigger = AccordionTrigger;
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AccordionPrimitive.Content, { ref: ref, ...props, className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", children: (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)(className), children: children }) })));
exports.AccordionContent = AccordionContent;
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
