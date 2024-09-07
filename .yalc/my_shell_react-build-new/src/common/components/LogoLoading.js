"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoLoading = LogoLoading;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const Logo_svg_1 = __importDefault(require("@/common/assets/icons/common/Logo.svg"));
function LogoLoading() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-[96px] h-[96px] rounded-[12px] flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(image_1.default, { className: "!w-[64px] !h-[64px]", src: Logo_svg_1.default, alt: "logo", priority: true }) }));
}
