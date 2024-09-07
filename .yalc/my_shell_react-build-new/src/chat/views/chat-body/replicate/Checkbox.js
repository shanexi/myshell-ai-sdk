"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
const CustomCheckbox = (0, react_2.forwardRef)((props, ref) => {
    const { name, setFormValue } = props;
    return ((0, jsx_runtime_1.jsx)(react_1.Checkbox, { ...props, ref: ref, colorScheme: "brand", className: "square-checkbox ml-2 text-on-surface", size: "lg", isChecked: props.default, onChange: v => {
            const checked = v.target.checked;
            setFormValue(name, checked);
        }, children: props.name }));
});
exports.default = CustomCheckbox;
