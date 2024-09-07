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
exports.Control = Control;
exports.Option = Option;
exports.SingleValue = SingleValue;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const react_select_1 = __importStar(require("react-select"));
const utils_1 = require("../../../../lib/utils.js");
function Control({ children, ...props }) {
    const { className, ...rest } = props;
    const { selectProps } = props;
    const hasError = selectProps.errors;
    return ((0, jsx_runtime_1.jsx)(react_select_1.components.Control, { ...rest, className: (0, clsx_1.default)('bg-surface rounded-xl shadow-none px-3 py-1', className, hasError ? 'border-[#D72C0D]' : 'border-default border-hovered'), children: children }));
}
function Menu({ children, ...props }) {
    return ((0, jsx_runtime_1.jsx)(react_select_1.components.Menu, { ...props, className: "p-2 bg-surface overflow-hidden rounded-xl shadow-md z-[99] pb-4 dark:border dark:border-default", children: children }));
}
function MenuList({ children, ...props }) {
    return (0, jsx_runtime_1.jsx)(react_select_1.components.MenuList, { ...props, children: children });
}
function Option({ children, ...props }) {
    return (0, jsx_runtime_1.jsx)(react_select_1.components.Option, { ...props, children: children });
}
function SingleValue({ children, ...props }) {
    return (0, jsx_runtime_1.jsx)(react_select_1.components.SingleValue, { ...props, children: children });
}
function ValueContainer({ children, ...props }) {
    return (0, jsx_runtime_1.jsx)(react_select_1.components.ValueContainer, { ...props, children: children });
}
function IndicatorSeparator({ ...props }) {
    return null;
}
function DropdownIndicator({ children, ...props }) {
    return ((0, jsx_runtime_1.jsx)(react_select_1.components.DropdownIndicator, { ...props, className: "text-on-surface", children: children }));
}
function SelectItem({ item, className }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex flex-row justify-start cursor-pointer', className), children: [item?.iconUrl ? ((0, jsx_runtime_1.jsx)("div", { className: "aspect-[24/24] w-6 h-6 relative bg-cover bg-no-repeat rounded-full overflow-hidden mr-2", style: {
                    ...(item?.iconUrl && { backgroundImage: `url('${item?.iconUrl}')` })
                } })) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-[14px]", children: item?.label })] }));
}
const CustomSelect = (0, react_1.forwardRef)((props, ref) => {
    const { components = {}, options = [], name, setFormValue, value, type, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)(react_select_1.default, { ...rest, ref: ref, options: options, menuPlacement: "auto", isSearchable: false, defaultValue: value, placeholder: value, onChange: (data) => {
            setFormValue(name, type === 'numberCheckbox' ? Number(data.value) : data.value);
        }, components: {
            Control: components.Control ? components.Control : Control,
            Menu,
            MenuList,
            ValueContainer,
            IndicatorSeparator,
            DropdownIndicator,
            Option: ({ children, ...props }) => {
                const { data } = props;
                return ((0, jsx_runtime_1.jsx)(Option, { ...props, children: (0, jsx_runtime_1.jsx)(SelectItem, { item: data, className: (0, utils_1.cn)('option', data?.value === value ? 'text-static' : '') }) }));
            },
            Placeholder: ({ children, ...props }) => {
                const { options } = props;
                const item = options.find((opt) => `${opt.value}`.toLowerCase() == `${value}`.toLowerCase());
                return (0, jsx_runtime_1.jsx)(SelectItem, { item: item, className: "placeholder" });
            },
            SingleValue: ({ children, ...props }) => {
                const { data } = props;
                return (0, jsx_runtime_1.jsx)(SelectItem, { item: data, className: "single" });
            }
        }, classNames: {
            placeholder: () => 'text-on-surface',
            valueContainer: () => 'p-0 flex',
            option: (data) => {
                return (0, utils_1.cn)('relative cursor-pointer py-1.5 px-2 rounded-md mt-1', data?.value === value ? '' : 'hover:bg-surface-pressed');
            }
        }, menuPosition: "fixed", styles: {
            control: styles => ({ ...styles, background: 'bg-surface' }),
            menu: provided => ({ ...provided, zIndex: '999', marginBottom: '40px' }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                const item = data;
                const isPrimary = isSelected || item?.value === value;
                return {
                    ...styles,
                    backgroundColor: isPrimary ? 'var(--primary)' : 'var(--surface)',
                    color: isPrimary && !isFocused ? 'white' : 'var(--on-surface)'
                };
            }
        } }));
});
exports.default = CustomSelect;
