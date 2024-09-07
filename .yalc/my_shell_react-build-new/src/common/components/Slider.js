"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
const CustomSlider = (0, react_2.forwardRef)((props, ref) => {
    return ((0, jsx_runtime_1.jsxs)(react_1.Slider, { "aria-label": "slider-ex-1", ...props, ref: ref, focusThumbOnChange: false, children: [(0, jsx_runtime_1.jsx)(react_1.SliderTrack, { className: "bg-[#EDEEEF]", children: (0, jsx_runtime_1.jsx)(react_1.SliderFilledTrack, { className: "bg-primary" }) }), (0, jsx_runtime_1.jsx)(react_1.SliderThumb, { className: "bg-primary border border-white" })] }));
});
exports.default = CustomSlider;
