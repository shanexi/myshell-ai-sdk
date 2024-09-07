"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Other;
const jsx_runtime_1 = require("react/jsx-runtime");
const DocumentIcon_1 = __importDefault(require("@heroicons/react/24/solid/DocumentIcon"));
function Other({ name, size, deleteEle }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-[10px] overflow-hidden shrink-0 flex justify-center items-center bg-[#3E94FA]", children: (0, jsx_runtime_1.jsx)(DocumentIcon_1.default, { className: "w-6 h-6 text-icon-static" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1 grow overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-default truncate", children: name }), size !== undefined ? (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-subtler truncate", children: ["(", size, ")"] }) : null] }), deleteEle] }));
}
