"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Image = ({ src, alt, placeholder, errorMessage, className, ...props }) => {
    const [imageLoaded, setImageLoaded] = (0, react_1.useState)(false);
    const [imageError, setImageError] = (0, react_1.useState)(false);
    const handleImageLoad = () => {
        setImageLoaded(true);
    };
    const handleImageError = () => {
        setImageError(true);
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: imageError ? ((0, jsx_runtime_1.jsx)("div", { ...props, "err-src": src, className: `${className} ${imageError ? '!object-contain' : ''}` })) : ((0, jsx_runtime_1.jsx)("img", { src: src, alt: alt || '', onLoad: handleImageLoad, onError: handleImageError, ...props, className: `${className} ${imageError ? '!object-contain' : ''}`, style: { display: imageLoaded ? 'block' : 'none' } })) }));
};
exports.default = Image;
