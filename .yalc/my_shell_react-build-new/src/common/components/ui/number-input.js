"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const decimal_js_1 = require("decimal.js");
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../../lib/utils.js");
const input_1 = require("./input.js");
var Operation;
(function (Operation) {
    Operation["minus"] = "minus";
    Operation["plus"] = "plus";
})(Operation || (Operation = {}));
const NumberInput = react_1.default.forwardRef(({ className, type, controls, ...props }, ref) => {
    const inputRef = react_1.default.useRef(null);
    const { min, max, step = 1, onChange } = props;
    const hideControls = controls === false;
    const updateValue = (event, operation) => {
        event.stopPropagation();
        event.preventDefault();
        const inputElement = inputRef.current;
        const decimalValue = new decimal_js_1.Decimal(inputElement?.value || 0);
        const decimalStep = new decimal_js_1.Decimal(step);
        const newValue = (operation ? decimalValue[operation](decimalStep) : decimalValue).toNumber();
        if ((min !== undefined && newValue < Number(min)) || (max !== undefined && newValue > Number(max))) {
            return;
        }
        if (inputElement) {
            if (operation) {
                inputElement.value = newValue.toString();
            }
            onChange?.({
                target: { value: Number(inputElement.value) }
            });
        }
    };
    const onBlur = (e) => {
        const newValue = e.target.value;
        const inputElement = inputRef.current;
        if (!inputElement) {
            return;
        }
        if (min !== undefined && newValue < Number(min)) {
            inputElement.value = String(min);
        }
        else if (max !== undefined && newValue > Number(max)) {
            inputElement.value = String(max);
        }
        else {
            inputElement.value = String(Number(inputElement.value));
        }
        onChange?.({
            target: { value: Number(inputElement.value) }
        });
    };
    const handleIncrement = (e) => updateValue(e, Operation.plus);
    const handleDecrement = (e) => updateValue(e, Operation.minus);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('relative w-full', className), children: [(0, jsx_runtime_1.jsx)(input_1.Input, { type: "number", ref: inputRef, ...props, value: props.value, onChange: updateValue, className: `${hideControls ? 'text-center' : 'pr-10'}`, onBlur: onBlur }), hideControls ? null : ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-0 right-3 py-2.5 h-full flex flex-col items-center justify-center space-y-0.5", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-on-surface bg-surface-accent-gray-subtler rounded-full w-[22px] h-[14px] cursor-pointer flex justify-center items-center", onClick: handleIncrement, children: (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "14", viewBox: "0 0 20 14", fill: "none", children: (0, jsx_runtime_1.jsx)("path", { d: "M6.90169 9H13.0983C13.8493 9 14.27 8.24649 13.806 7.7324L10.7077 4.29945C10.3474 3.90018 9.65265 3.90018 9.29231 4.29945L6.19399 7.7324C5.73001 8.24649 6.15069 9 6.90169 9Z", fill: "#414345" }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-on-surface bg-surface-accent-gray-subtler rounded-full w-[22px] h-[14px] cursor-pointer flex justify-center items-center", onClick: handleDecrement, children: (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "14", viewBox: "0 0 20 14", fill: "none", children: (0, jsx_runtime_1.jsx)("path", { d: "M13.0983 5L6.90169 5C6.15069 5 5.73001 5.75351 6.19399 6.2676L9.29231 9.70055C9.65265 10.0998 10.3474 10.0998 10.7077 9.70055L13.806 6.2676C14.27 5.75351 13.8493 5 13.0983 5Z", fill: "#414345" }) }) })] }))] }));
});
exports.NumberInput = NumberInput;
NumberInput.displayName = 'NumberInput';
