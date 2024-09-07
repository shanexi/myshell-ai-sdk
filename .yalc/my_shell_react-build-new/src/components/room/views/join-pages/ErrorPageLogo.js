"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErrorPageLogo;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
function ErrorPageLogo() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[10px] md:gap-[14px]", children: [(0, jsx_runtime_1.jsx)(image_1.default, { width: 50, height: 32, className: "w-[37px] md:w-[50px] h-6 md:h-8", src: "/images/Logo3x.png", alt: "logo" }), (0, jsx_runtime_1.jsx)(image_1.default, { width: 86, height: 24, className: "w-16 md:w-[86px] h-[18px] md:h-6", src: "/images/MyShellText.png", alt: "logo text" })] }));
}
