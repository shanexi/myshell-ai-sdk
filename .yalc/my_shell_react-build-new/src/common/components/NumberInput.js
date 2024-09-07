"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomNumberInputNoStepper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
const CustomNumberInput = (0, react_2.forwardRef)((props, ref) => {
    return ((0, jsx_runtime_1.jsxs)(react_1.NumberInput, { ...props, ref: ref, children: [(0, jsx_runtime_1.jsx)(react_1.NumberInputField, { className: "h-[44px] rounded-[12px] border-default hover:border-hovered focus:outline focus:outline-variant focus-visible:border-pressed focus-visible:outline-offset-0 focus-visible:outline-utility-status04-70 focus-visible:shadow-none" }), (0, jsx_runtime_1.jsxs)(react_1.NumberInputStepper, { children: [(0, jsx_runtime_1.jsx)(react_1.NumberIncrementStepper, { className: "text-on-surface border-default" }), (0, jsx_runtime_1.jsx)(react_1.NumberDecrementStepper, { className: "text-on-surface border-default" })] })] }));
});
exports.CustomNumberInputNoStepper = (0, react_2.forwardRef)((props, ref) => {
    return ((0, jsx_runtime_1.jsx)(react_1.NumberInput, { ...props, ref: ref, children: (0, jsx_runtime_1.jsx)(react_1.NumberInputField, { className: "h-[44px] rounded-[12px] border-none hover:border-none focus:outline focus:outline-none focus-visible:border-none focus-visible:outline-offset-0 focus-visible:outline-none focus-visible:shadow-none px-0" }) }));
});
exports.default = CustomNumberInput;
