"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SideBarLogo;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const Logo_svg_1 = __importDefault(require("@/common/assets/icons/common/Logo.svg"));
function SideBarLogo() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center pt-7 mx-4 ", children: [(0, jsx_runtime_1.jsx)(image_1.default, { className: "w-[36px] h-[36px] mb-[20px]", src: Logo_svg_1.default, alt: "logo", priority: true }), (0, jsx_runtime_1.jsx)("hr", { className: "w-full border-t-0 border-b border-default" })] }));
}
