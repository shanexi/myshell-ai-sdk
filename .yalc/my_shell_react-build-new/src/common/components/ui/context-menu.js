"use strict";
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
exports.ContextMenuRadioGroup = exports.ContextMenuSubTrigger = exports.ContextMenuSubContent = exports.ContextMenuSub = exports.ContextMenuPortal = exports.ContextMenuGroup = exports.ContextMenuShortcut = exports.ContextMenuSeparator = exports.ContextMenuLabel = exports.ContextMenuRadioItem = exports.ContextMenuCheckboxItem = exports.ContextMenuItem = exports.ContextMenuContent = exports.ContextMenuTrigger = exports.ContextMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const ContextMenuPrimitive = __importStar(require("@radix-ui/react-context-menu"));
const lucide_react_1 = require("lucide-react");
const utils_1 = require("../../../lib/utils.js");
const ContextMenu = ContextMenuPrimitive.Root;
exports.ContextMenu = ContextMenu;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
exports.ContextMenuTrigger = ContextMenuTrigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
exports.ContextMenuGroup = ContextMenuGroup;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
exports.ContextMenuPortal = ContextMenuPortal;
const ContextMenuSub = ContextMenuPrimitive.Sub;
exports.ContextMenuSub = ContextMenuSub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
exports.ContextMenuRadioGroup = ContextMenuRadioGroup;
const ContextMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(ContextMenuPrimitive.SubTrigger, { ref: ref, className: (0, utils_1.cn)('flex cursor-default select-none items-center rounded-lg py-1 px-2 text-sm outline-none hover:bg-surface-container data-[state=open]:bg-slate-100 data-[state=open]:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-slate-50 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-50', inset && 'pl-8', className), ...props, children: [children, (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "ml-auto h-4 w-4" })] })));
exports.ContextMenuSubTrigger = ContextMenuSubTrigger;
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;
const ContextMenuSubContent = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(ContextMenuPrimitive.SubContent, { ref: ref, className: (0, utils_1.cn)('flex flex-col gap-y-1 z-50 overflow-hidden rounded-md border-none bg-surface p-2 text-default shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border dark:border-default dark:border-solid', className), ...props })));
exports.ContextMenuSubContent = ContextMenuSubContent;
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;
const ContextMenuContent = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(ContextMenuPrimitive.Portal, { children: (0, jsx_runtime_1.jsx)(ContextMenuPrimitive.Content, { ref: ref, className: (0, utils_1.cn)('flex flex-col gap-y-1 z-50 overflow-hidden rounded-md border-none bg-surface p-2 text-default shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border dark:border-default dark:border-solid', className), ...props }) })));
exports.ContextMenuContent = ContextMenuContent;
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;
const ContextMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => ((0, jsx_runtime_1.jsx)(ContextMenuPrimitive.Item, { ref: ref, className: (0, utils_1.cn)('relative flex cursor-default select-none items-center rounded-lg py-1 px-2 text-sm outline-none hover:bg-surface-container data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50', inset && 'pl-8', className), ...props })));
exports.ContextMenuItem = ContextMenuItem;
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;
const ContextMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(ContextMenuPrimitive.CheckboxItem, { ref: ref, className: (0, utils_1.cn)('relative flex cursor-default select-none items-center rounded-lg py-1 px-2 text-sm outline-none hover:bg-surface-container data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50', className), checked: checked, ...props, children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: (0, jsx_runtime_1.jsx)(ContextMenuPrimitive.ItemIndicator, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.Check, { className: "h-4 w-4" }) }) }), children] })));
exports.ContextMenuCheckboxItem = ContextMenuCheckboxItem;
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;
const ContextMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(ContextMenuPrimitive.RadioItem, { ref: ref, className: (0, utils_1.cn)('relative flex cursor-default select-none items-center rounded-lg py-1 px-2 text-sm outline-none hover:bg-surface-container data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className), ...props, children: [(0, jsx_runtime_1.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: (0, jsx_runtime_1.jsx)(ContextMenuPrimitive.ItemIndicator, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.Circle, { className: "h-2 w-2 fill-current" }) }) }), children] })));
exports.ContextMenuRadioItem = ContextMenuRadioItem;
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;
const ContextMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => ((0, jsx_runtime_1.jsx)(ContextMenuPrimitive.Label, { ref: ref, className: (0, utils_1.cn)('px-2 py-1.5 text-sm font-semibold text-default', inset && 'pl-8', className), ...props })));
exports.ContextMenuLabel = ContextMenuLabel;
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;
const ContextMenuSeparator = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(ContextMenuPrimitive.Separator, { ref: ref, className: (0, utils_1.cn)('-mx-1 my-1 h-px bg-slate-200 dark:bg-slate-800', className), ...props })));
exports.ContextMenuSeparator = ContextMenuSeparator;
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;
const ContextMenuShortcut = ({ className, ...props }) => {
    return ((0, jsx_runtime_1.jsx)("span", { className: (0, utils_1.cn)('ml-auto text-xs tracking-widest text-slate-500 dark:text-slate-400', className), ...props }));
};
exports.ContextMenuShortcut = ContextMenuShortcut;
ContextMenuShortcut.displayName = 'ContextMenuShortcut';
