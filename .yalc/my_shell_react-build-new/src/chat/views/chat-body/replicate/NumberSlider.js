"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const NumberSlider = (0, react_2.forwardRef)((props, ref) => {
    const { minLength, maxLength, value, name, type, setFormValue, errors } = props;
    const isEmptyError = errors?.type === 'required';
    const [numberError, setNumberError] = (0, react_2.useState)('');
    const [inputValue, setInputValue] = (0, react_2.useState)('');
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const rest = {};
    (0, react_2.useEffect)(() => {
        document.getElementById(`component_bot_sliderinput_${name}`)?.blur();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-full space-x-1.5", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full h-[36px] flex justify-center items-center rounded-[12px] border-[1px] border-default p-3", children: (0, jsx_runtime_1.jsxs)(react_1.Slider, { "aria-label": "slider-ex-1", max: maxLength, min: minLength, value: value, step: type === 'interSlider' ? 1 : 0.01, onChange: value => {
                                setInputValue(`${value}`);
                                setFormValue(name, Number(value));
                                setNumberError('');
                            }, ref: ref, focusThumbOnChange: false, children: [(0, jsx_runtime_1.jsx)(react_1.SliderTrack, { className: "bg-[#EDEEEF] h-[6px]", children: (0, jsx_runtime_1.jsx)(react_1.SliderFilledTrack, { className: "bg-primary" }) }), (0, jsx_runtime_1.jsx)(react_1.SliderThumb, { className: "bg-surface border-primary border-[2px] z-0" })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0 w-[60px] h-[36px] flex justify-center items-center rounded-[12px] border-[1px] border-default p-3", children: (0, jsx_runtime_1.jsx)(react_1.NumberInput, { ...rest, max: maxLength, min: minLength, value: inputValue || props.value, precision: type === 'interSlider' ? 0 : 2, step: type === 'interSlider' ? 1 : 0.01, onChange: value => {
                                setInputValue(value);
                                const num = Number(value);
                                if (!isNaN(num) && typeof num === 'number') {
                                    setFormValue(name, num);
                                }
                            }, onBlur: e => {
                                const num = e.currentTarget.value;
                                if (minLength != undefined && num < minLength) {
                                    setNumberError(chatT('replicate.input_min_tip', {
                                        num: minLength
                                    }));
                                    setFormValue(name, minLength);
                                    setInputValue(minLength);
                                }
                                else if (maxLength != undefined && num > maxLength) {
                                    setNumberError(chatT('replicate.input_max_tip', {
                                        num: maxLength
                                    }));
                                    setFormValue(name, maxLength);
                                    setInputValue(maxLength);
                                }
                                else if (!Number.isNaN(num)) {
                                    setNumberError('');
                                }
                            }, ref: ref, children: (0, jsx_runtime_1.jsx)(react_1.NumberInputField, { tabIndex: -1, id: `component_bot_sliderinput_${name}`, className: "text-center h-[44px] rounded-[12px] border-none hover:border-none focus:outline focus:outline-none focus-visible:border-none focus-visible:outline-offset-0 focus-visible:outline-none focus-visible:shadow-none px-0" }) }) })] }), numberError != '' && (0, jsx_runtime_1.jsx)("p", { className: "text-[#D72C0D] text-[14px] mt-1.5", children: numberError }), isEmptyError && ((0, jsx_runtime_1.jsx)("p", { className: "text-[#D72C0D] text-[14px] mt-1.5", children: chatT('replicate.input_required_tip', { fieldName: name }) }))] }));
});
exports.default = NumberSlider;
