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
exports.SearchBar = SearchBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const MagnifyingGlassIcon_1 = __importDefault(require("@heroicons/react/24/outline/MagnifyingGlassIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const class_variance_authority_1 = require("class-variance-authority");
const React = __importStar(require("react"));
const react_1 = require("react");
const utils_1 = require("../../../lib/utils.js");
const icon_1 = require("./icon.js");
const icon_button_1 = require("./icon-button.js");
const input_1 = require("./input.js");
const searchBarVariants = (0, class_variance_authority_1.cva)('rounded-full', {
    variants: {
        size: {
            md: 'h-11',
            sm: 'h-10'
        }
    },
    defaultVariants: {
        size: 'sm'
    }
});
function SearchBar({ className, inputClassName, placeholder, type, size, readOnly, searchValue, onSearchChange, ...props }) {
    const [value, setValue] = React.useState('');
    (0, react_1.useEffect)(() => {
        setValue(searchValue || '');
    }, [searchValue]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('relative w-full', searchBarVariants({ size }), className), children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: MagnifyingGlassIcon_1.default, size: "lg", className: "absolute top-1/2 -translate-y-1/2 left-3 z-10 text-subtler cursor-pointer", onClick: () => {
                    onSearchChange(value);
                } }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: type, placeholder: placeholder, rounded: "full", size: "sm", className: (0, utils_1.cn)('relative w-full px-9 flex space-x-2 text-base shadow-none', {
                    'focus-visible:ring-transparent': readOnly
                }, className), value: value, onChange: e => {
                    setValue(e.target.value);
                }, onKeyDown: e => {
                    if (e.key === 'Enter' && !(e.shiftKey || e.altKey)) {
                        e.target.blur();
                        onSearchChange(value);
                    }
                }, ...props }), value && ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { className: "absolute top-1/2 -translate-y-1/2 right-3 z-10 border border-default rounded-full text-icon", onClick: () => {
                    onSearchChange('');
                    setValue('');
                }, size: "sm", variant: "ghost", icon: XMarkIcon_1.default }))] }));
}
SearchBar.displayName = 'SearchBar';
