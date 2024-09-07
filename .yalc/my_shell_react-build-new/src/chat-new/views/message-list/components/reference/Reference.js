"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("../../../../../common/components/ui/link.js"));
const react_1 = require("react");
function Reference({ reference }) {
    return ((0, jsx_runtime_1.jsx)(link_1.default, { href: reference.link, target: "_blank", children: (0, jsx_runtime_1.jsxs)("div", { className: "p-1 flex items-center space-x-1.5 rounded-md bg-surface-accent-gray-subtler hover:bg-surface-accent-gray-subtle", children: [(0, jsx_runtime_1.jsx)("img", { src: `https://s2.googleusercontent.com/s2/favicons?domain=${reference.displayLint}&sz=48`, alt: reference.displayLint, className: "w-6 h-6 rounded-md" }), (0, jsx_runtime_1.jsx)("div", { className: "grow truncate text-subtle text-sm", children: reference.title })] }) }));
}
exports.default = (0, react_1.memo)(Reference);
