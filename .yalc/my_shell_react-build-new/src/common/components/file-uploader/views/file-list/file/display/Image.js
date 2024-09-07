"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Img;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
function Img({ name, size, src, deleteEle }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-[10px] overflow-hidden shrink-0", children: (0, jsx_runtime_1.jsx)(image_1.default, { src: src, width: 48, height: 48, alt: "uploaded image", className: "w-full h-full object-cover" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1 grow overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-default truncate", children: name }), size !== undefined ? (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-subtler truncate", children: ["(", size, ")"] }) : null] }), deleteEle] }));
}
