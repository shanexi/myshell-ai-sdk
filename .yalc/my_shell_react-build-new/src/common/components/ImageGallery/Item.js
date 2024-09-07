"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const defaultProps = {
    fullscreen: '',
    isFullscreen: false,
    originalAlt: '',
    originalHeight: '',
    originalWidth: '',
    sizes: '',
    srcSet: '',
    loading: 'eager',
    original: '',
    handleImageLoaded: () => { }
};
const Item = react_1.default.memo((props) => {
    const { fullscreen, handleImageLoaded, isFullscreen, onImageError, original, originalAlt, originalHeight, originalWidth, sizes, srcSet, loading } = { ...defaultProps, ...props };
    const itemSrc = isFullscreen ? fullscreen || original : original;
    const h = originalHeight ? `${originalHeight}px` : 'auto';
    const w = originalWidth ? `${originalWidth}px` : 'auto';
    const maxW = originalWidth ? `max-w-[${originalWidth}px]` : 'max-w-full';
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)("img", { className: (0, clsx_1.default)('image-gallery-image w-full object-contain h-full max-h-[calc(100vh-180px)]', maxW), src: itemSrc, alt: originalAlt, srcSet: srcSet, height: h, width: w, sizes: sizes, onLoad: event => handleImageLoaded(event, original), onError: onImageError, loading: loading }) }));
});
exports.default = Item;
