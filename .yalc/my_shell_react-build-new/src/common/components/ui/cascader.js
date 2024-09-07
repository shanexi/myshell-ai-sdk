"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cascader;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const react_use_1 = require("react-use");
const utils_1 = require("../../../lib/utils.js");
const button_1 = require("./button.js");
const dropdown_menu_1 = require("./dropdown-menu.js");
function Cascader(props) {
    const { options, className, value, onValueChange, showParentLabel, placeholder } = props;
    const [open, setOpen] = (0, react_use_1.useToggle)(false);
    return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { onOpenChange: setOpen, children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", role: "combobox", className: (0, utils_1.cn)(className, 'h-12 p-3 space-x-1.5 rounded-xl border-default bg-surface-search-field shadow-background-default hover:bg-inherit justify-between [&>span]:line-clamp-1 [&>.dropdown-chevron]:aria-expanded:rotate-180'), "aria-expanded": open, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, clsx_1.default)(!value && 'text-subtler'), children: value ? renderLabel(options, value, showParentLabel) : placeholder }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: "dropdown-chevron h-5 w-5 text-icon-subtle duration-200" })] }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuContent, { className: (0, utils_1.cn)(className), children: options.map(option => ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: option.children && !!option.children.length ? ((0, jsx_runtime_1.jsx)(NestDropdownMenuRender, { className: className, option: option, value: value, onValueChange: onValueChange })) : ((0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { className: "py-1", onChange: () => onValueChange(option.value), children: option.label })) }, option.value))) })] }));
}
function NestDropdownMenuRender(props) {
    const { option, value, onValueChange, className } = props;
    return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuSub, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSubTrigger, { className: "py-1", children: option.label }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuPortal, { children: (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSubContent, { className: (0, utils_1.cn)(className), sideOffset: 10, children: option.children.map(opt => ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: opt.children && opt.children.length ? ((0, jsx_runtime_1.jsx)(NestDropdownMenuRender, { className: className, option: opt, value: value, onValueChange: onValueChange })) : ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { className: "py-1 justify-between", onClick: () => onValueChange(opt.value), children: [(0, jsx_runtime_1.jsx)("span", { children: opt.label }), value === opt.value && (0, jsx_runtime_1.jsx)(lucide_react_1.Check, { className: "h-4 w-4 text-surface-primary-default" })] })) }, opt.value))) }) })] }));
}
function renderLabel(options, value, showParentLabel = false, path = '') {
    for (const option of options) {
        const currentPath = showParentLabel ? (path ? `${path}/${option.label}` : option.label) : option.label;
        if (option.value === value) {
            return currentPath;
        }
        if (option.children) {
            const childPath = renderLabel(option.children, value, showParentLabel, currentPath);
            if (childPath)
                return childPath;
        }
    }
    return '';
}
