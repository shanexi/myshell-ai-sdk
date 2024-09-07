"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ModalTitle;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftIcon"));
const utils_1 = require("../../../../lib/utils.js");
function ModalTitle(props) {
    const { content, showBack, subtitle, onBack } = props;
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex items-start justify-between pb-4 border-b-[1px] border-default gap-1 px-4'), children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex gap-3', subtitle ? 'items-start' : 'items-center'), children: [showBack && ((0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: (0, utils_1.cn)('h-5 w-5 cursor-pointer text-icon-subtle hover:text-default', subtitle && 'translate-y-1'), onClick: onBack })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl text-default font-medium", children: content }), subtitle && (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-subtle font-medium", children: subtitle })] })] }) }));
}
