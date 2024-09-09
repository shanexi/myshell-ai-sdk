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
exports.SelectScrollDownButton = exports.SelectScrollUpButton = exports.SelectSeparator = exports.SelectItem = exports.SelectLabel = exports.SelectContent = exports.SelectTrigger = exports.SelectValue = exports.SelectGroup = exports.Select = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const outline_1 = require("@heroicons/react/24/outline");
const SelectPrimitive = __importStar(require("@radix-ui/react-select"));
const lucide_react_1 = require("lucide-react");
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils");
const Select = React.forwardRef(({ children, placeholder, options, ...props }, ref) => {
    const icon = options?.find(item => item.value === props.value)?.icon;
    return ((0, jsx_runtime_1.jsxs)(SelectPrimitive.Root, { ...props, children: [Array.isArray(options) ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(SelectTrigger, { className: "w-full", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(SelectIcon, { icon: icon }), (0, jsx_runtime_1.jsx)(SelectValue, { placeholder: placeholder })] }) }), Array.isArray(options) && options.length ? ((0, jsx_runtime_1.jsx)(SelectContent, { children: options.map(({ label, value, icon, disabled }, i) => ((0, jsx_runtime_1.jsx)(SelectItem, { value: value, icon: icon, disabled: disabled, children: label }, `${value}_${i}`))) })) : null] })) : null, children] }));
});
exports.Select = Select;
const SelectGroup = SelectPrimitive.Group;
exports.SelectGroup = SelectGroup;
const SelectValue = SelectPrimitive.Value;
exports.SelectValue = SelectValue;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(SelectPrimitive.Trigger, { ref: ref, className: (0, utils_1.cn)('flex h-10 w-full items-center justify-between rounded-lg border border-default bg-surface-search-field text-default text-sm shadow-background-default p-3 ring-offset-surface-default placeholder:text-subtler focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-30 [&>span]:line-clamp-1 [&>.select-chevron]:aria-expanded:rotate-180', className), ...props, children: [children, (0, jsx_runtime_1.jsx)(SelectPrimitive.Icon, { asChild: true, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: "select-chevron h-5 w-5 text-icon-subtle duration-200" }) })] })));
exports.SelectTrigger = SelectTrigger;
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(SelectPrimitive.ScrollUpButton, { ref: ref, className: (0, utils_1.cn)('flex cursor-default items-center justify-center py-1', className), ...props, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronUp, { className: "h-4 w-4" }) })));
exports.SelectScrollUpButton = SelectScrollUpButton;
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(SelectPrimitive.ScrollDownButton, { ref: ref, className: (0, utils_1.cn)('flex cursor-default items-center justify-center py-1', className), ...props, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: "h-4 w-4" }) })));
exports.SelectScrollDownButton = SelectScrollDownButton;
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = 'popper', ...props }, ref) => ((0, jsx_runtime_1.jsx)(SelectPrimitive.Portal, { children: (0, jsx_runtime_1.jsx)(SelectPrimitive.Content, { ref: ref, className: (0, utils_1.cn)('relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg	border border-opaque bg-surface-default text-default shadow-modal-default data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', className), position: position, ...props, children: (0, jsx_runtime_1.jsx)(SelectPrimitive.Viewport, { className: (0, utils_1.cn)('p-2 space-y-1', position === 'popper' &&
                'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'), children: children }) }) })));
exports.SelectContent = SelectContent;
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(SelectPrimitive.Label, { ref: ref, className: (0, utils_1.cn)('py-1 px-3 text-sm font-medium text-subtler', className), ...props })));
exports.SelectLabel = SelectLabel;
SelectLabel.displayName = SelectPrimitive.Label.displayName;
function SelectIcon(props) {
    const { icon } = props;
    if (!icon) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(SelectPrimitive.Icon, { children: (0, jsx_runtime_1.jsx)("div", { className: "aspect-[24/24] w-6 h-6 relative bg-cover bg-no-repeat rounded-md overflow-hidden mr-4", style: { backgroundImage: `url('${icon}')` } }) }));
}
SelectIcon.displayName = SelectPrimitive.Icon.displayName;
const SelectItem = React.forwardRef(({ className, children, icon, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(SelectPrimitive.Item, { ref: ref, className: (0, utils_1.cn)('relative flex justify-between w-full cursor-pointer select-none items-center rounded-lg py-1 px-3 outline-none focus:bg-surface-container-selected-default focus:text-default data-[disabled]:pointer-events-none data-[disabled]:opacity-30', className), ...props, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center grow", children: [(0, jsx_runtime_1.jsx)(SelectIcon, { icon: icon }), (0, jsx_runtime_1.jsx)(SelectPrimitive.ItemText, { children: children })] }), (0, jsx_runtime_1.jsx)("span", { className: "flex h-4 w-4 items-center justify-center", children: (0, jsx_runtime_1.jsx)(SelectPrimitive.ItemIndicator, { children: (0, jsx_runtime_1.jsx)(outline_1.CheckIcon, { className: "h-4 w-4 text-brand stroke-[2px]" }) }) })] })));
exports.SelectItem = SelectItem;
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(SelectPrimitive.Separator, { ref: ref, className: (0, utils_1.cn)('-mx-1 my-1 h-px bg-border-default', className), ...props })));
exports.SelectSeparator = SelectSeparator;
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
