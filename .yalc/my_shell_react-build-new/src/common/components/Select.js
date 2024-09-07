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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleValue = exports.Option = exports.Control = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const react_select_1 = __importStar(require("react-select"));
const Control = ({ children, ...props }) => {
    const { className, ...rest } = props;
    const { selectProps } = props;
    const hasError = selectProps.errors;
    return ((0, jsx_runtime_1.jsx)(react_select_1.components.Control, { ...rest, className: (0, clsx_1.default)('bg-surface rounded-xl shadow-none px-3 py-1', className, hasError ? 'border-[#D72C0D]' : 'border-default hover:border-hovered'), children: children }));
};
exports.Control = Control;
const Menu = ({ children, ...props }) => ((0, jsx_runtime_1.jsx)(react_select_1.components.Menu, { ...props, className: "p-2 bg-surface overflow-hidden rounded-xl shadow-md z-[99] pb-4 dark:border dark:border-default", children: children }));
const MenuList = ({ children, ...props }) => ((0, jsx_runtime_1.jsx)(react_select_1.components.MenuList, { ...props, className: "p-0 gap-1", children: children }));
const Option = ({ children, ...props }) => {
    const bg = props.isSelected ? 'bg-primary' : 'bg-surface';
    return ((0, jsx_runtime_1.jsx)(react_select_1.components.Option, { ...props, className: (0, clsx_1.default)('cursor-pointer py-1.5 px-2 rounded-md mt-1 hover:bg-on-primary', bg), children: children }));
};
exports.Option = Option;
const SingleValue = ({ children, ...props }) => ((0, jsx_runtime_1.jsx)(react_select_1.components.SingleValue, { ...props, className: "text-on-surface", children: children }));
exports.SingleValue = SingleValue;
const ValueContainer = ({ children, ...props }) => ((0, jsx_runtime_1.jsx)(react_select_1.components.ValueContainer, { ...props, className: "p-0 gap-1", children: children }));
const IndicatorSeparator = ({ ...props }) => null;
const DropdownIndicator = ({ children, ...props }) => ((0, jsx_runtime_1.jsx)(react_select_1.components.DropdownIndicator, { ...props, className: "text-on-surface", children: children }));
const CustomeSelect = (0, react_1.forwardRef)((props, ref) => {
    const { components = {}, options = [], ...rest } = props;
    return ((0, jsx_runtime_1.jsx)(react_select_1.default, { ...rest, ref: ref, options: options, menuPlacement: "auto", isSearchable: false, components: {
            Control: components.Control ? components.Control : exports.Control,
            Menu,
            MenuList,
            Option: components.Option ? components.Option : exports.Option,
            SingleValue: components.SingleValue ? components.SingleValue : exports.SingleValue,
            ValueContainer,
            IndicatorSeparator,
            DropdownIndicator
        } }));
});
exports.default = CustomeSelect;
