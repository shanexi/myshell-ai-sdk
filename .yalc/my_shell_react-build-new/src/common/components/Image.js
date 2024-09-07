"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const react_1 = require("react");
const interfaces_1 = require("../../chat/model/interfaces.js");
const SvgIcon_1 = __importDefault(require("./SvgIcon.js"));
const Image = ({ src, alt, placeholder, errorMessage = 'Failed', className = '', style, aspectRatio, status, index, imageLoadCallback, ...props }) => {
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(false);
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const handleImageLoad = () => {
        setLoading(false);
        imageLoadCallback?.();
    };
    const handleImageError = () => {
        setLoading(false);
        setError(true);
    };
    const chat = (0, next_intl_1.useTranslations)('chat');
    const isError = status === interfaces_1.ImageStatus.ERROR || error || (status === interfaces_1.ImageStatus.DONE && !src);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full h-full relative bg-surface overflow-hidden', className), children: [loading && !isError && ((0, jsx_runtime_1.jsxs)("div", { className: "inset-0 flex items-center justify-center text-white bg-surface dark:bg-[#202126]", children: [(0, jsx_runtime_1.jsx)("img", { src: `/images/${resolvedTheme}.gif`, className: "w-full h-full object-contain", style: style }), status === interfaces_1.ImageStatus.PROCESSING && String(aspectRatio) !== '5/1' && ((0, jsx_runtime_1.jsx)("div", { className: "text-secondary text-sm absolute z-2 bottom-[22%]", children: chat('generating') }))] })), !isError && !!src && ((0, jsx_runtime_1.jsx)("img", { src: src, alt: alt, onLoad: handleImageLoad, onError: handleImageError, className: `w-full h-full transition-opacity duration-300 ${loading ? 'opacity-60' : 'opacity-100'}`, ...props })), isError && ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center text-white ", children: (0, jsx_runtime_1.jsx)(SvgIcon_1.default, { src: "/icons/fail.svg", className: "bg-[#C9CCD0] w-8 h-8" }) }))] }));
};
exports.default = Image;
