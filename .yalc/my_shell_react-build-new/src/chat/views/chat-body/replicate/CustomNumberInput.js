"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const CustomNumberInput = (0, react_2.forwardRef)((props, ref) => {
    const { minLength, maxLength, value, name, setFormValue, errors, setError, type } = props;
    const isEmptyError = errors?.type === 'required';
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const [numberError, setNumberError] = (0, react_2.useState)('');
    const rest = {};
    if (minLength != undefined)
        rest.min = minLength;
    if (maxLength != undefined)
        rest.max = maxLength;
    (0, react_2.useEffect)(() => {
        document.getElementById(`component_bot_numberinput_${name}`)?.blur();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [(0, jsx_runtime_1.jsxs)(react_1.NumberInput, { ...rest, precision: type === 'interInput' ? 0 : 2, step: type === 'interInput' ? 1 : 0.01, defaultValue: value, onFocus: false, onChange: value => {
                    const num = Number(value);
                    if (!isNaN(num) && typeof num === 'number') {
                        setFormValue(name, num);
                    }
                }, onBlur: value => {
                    const num = value;
                    if (minLength != undefined && num < minLength) {
                        setFormValue(name, minLength);
                        setNumberError(chatT('replicate.input_min_tip', {
                            num: minLength
                        }));
                    }
                    else if (maxLength != undefined && num > maxLength) {
                        setFormValue(name, maxLength);
                        setNumberError(chatT('replicate.input_max_tip', {
                            num: maxLength
                        }));
                    }
                    else if (!Number.isNaN(num)) {
                        setNumberError('');
                    }
                }, ref: ref, className: "w-full", children: [(0, jsx_runtime_1.jsx)(react_1.NumberInputField, { tabIndex: -1, id: `component_bot_numberinput_${name}`, className: "h-[44px] rounded-[12px] border-default hover:border-hovered focus:outline focus:outline-variant focus-visible:border-pressed focus-visible:outline-offset-0 focus-visible:outline-utility-status04-70 focus-visible:shadow-none" }), (0, jsx_runtime_1.jsxs)(react_1.NumberInputStepper, { className: "space-y-[2px] py-1 mr-2", children: [(0, jsx_runtime_1.jsx)(react_1.NumberIncrementStepper, { className: "text-on-surface rounded-[6px] w-5 h-3 bg-[#EDEEEF] dark:bg-[#6D7175] border-none" }), (0, jsx_runtime_1.jsx)(react_1.NumberDecrementStepper, { className: "text-on-surface rounded-[6px] w-5 h-3 bg-[#EDEEEF] dark:bg-[#6D7175] border-none" })] })] }), numberError != '' && (0, jsx_runtime_1.jsx)("p", { className: "text-[#D72C0D] text-[14px] mt-1.5", children: numberError }), isEmptyError && ((0, jsx_runtime_1.jsx)("p", { className: "text-[#D72C0D] text-[14px] mt-1.5", children: chatT('replicate.input_required_tip', { fieldName: name }) }))] }));
});
exports.default = CustomNumberInput;
