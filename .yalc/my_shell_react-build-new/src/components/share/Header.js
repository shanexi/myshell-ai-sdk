"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("../../common/components/ui/link.js"));
const runtime_config_1 = require("../../common/utils/runtime-config.js");
function Header({ title, isFromDownload }) {
    return ((0, jsx_runtime_1.jsxs)("header", { className: (0, clsx_1.default)('flex items-center px-2 sm:px-4 justify-space-between shadow w-screen h-[46px] shrink-0 text-on-surface', isFromDownload ? 'shadow-header bg-[#F6F6F6] dark:bg-surface-container ' : 'bg-surface-container '), children: [(0, jsx_runtime_1.jsxs)(link_1.default, { href: "/", className: "flex items-center space-x-1 mr-2", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: `${runtime_config_1.CDN_URL}shared-conversation/shell-logo-v2.png`, width: 32, height: 32, alt: "Shell Logo", loading: "eager" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bolde", children: "MyShell" })] }), (0, jsx_runtime_1.jsx)("span", { className: "truncate max-w-[180px] sm:max-w-full sm:w-full text-center sm:pr-20", children: title })] }));
}
