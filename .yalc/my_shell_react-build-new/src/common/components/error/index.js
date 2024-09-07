"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const ErrorIcon_svg_1 = __importDefault(require("./assets/images/ErrorIcon.svg"));
const button_1 = require("../../../common/components/ui/button.js");
function ErrorComponent({ onReset }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-full w-full flex flex-col items-center justify-center space-y-6 bg-white", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: ErrorIcon_svg_1.default, alt: "error", width: 300, height: 300 }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center space-y-2", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-semibold", children: "Something went wrong" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: "We're having some difficulties.Please try again" })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "lg", onClick: onReset, children: "Refresh" })] }));
}
exports.default = ErrorComponent;
