"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const CustomTextarea = (0, react_2.forwardRef)((props, ref) => {
    const { className, value, setFormValue, name, errors, clearErrors, ...rest } = props;
    const isEmptyError = errors?.type === 'required';
    const chatT = (0, next_intl_1.useTranslations)('chat');
    (0, react_2.useEffect)(() => {
        document.getElementById(`component_bot_textarea_${name}`)?.blur();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full relative", children: [(0, jsx_runtime_1.jsx)(react_1.Textarea, { ...rest, id: `component_bot_textarea_${name}`, onFocus: false, defaultValue: value, tabIndex: -1, onChange: v => {
                            if (v.target.value != '') {
                                clearErrors(name);
                            }
                            setFormValue(name, v.target.value);
                        }, ref: ref, className: (0, clsx_1.default)('w-full', isEmptyError ? 'border-[#D72C0D]' : 'border-default hover:border-hovered') }), rest.maxLength ? ((0, jsx_runtime_1.jsxs)("span", { className: "absolute right-3 bottom-3 text-on-secondary-container text-xs", children: [(value ?? '').length, "/", rest.maxLength] })) : null] }), isEmptyError && ((0, jsx_runtime_1.jsx)("p", { className: "text-[#D72C0D] text-[14px] mt-1.5", children: chatT('replicate.input_required_tip', { fieldName: name }) }))] }));
});
exports.default = CustomTextarea;
