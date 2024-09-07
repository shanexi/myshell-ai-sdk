"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SvgIcon = ({ src, className, ...rest }) => {
    const svgStyle = {
        MaskImage: `url(${src})`,
        MaskPosition: 'center',
        MaskSize: 'contain',
        MaskRepeat: 'no-repeat',
        WebkitMaskImage: `url(${src})`,
        WebkitMaskPosition: 'center',
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        display: 'block',
        overflow: 'hidden'
    };
    return (0, jsx_runtime_1.jsx)("span", { style: svgStyle, className: className, ...rest });
};
exports.default = SvgIcon;
