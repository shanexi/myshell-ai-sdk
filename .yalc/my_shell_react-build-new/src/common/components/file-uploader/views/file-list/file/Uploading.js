"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Uploading;
const jsx_runtime_1 = require("react/jsx-runtime");
const spinner_1 = __importDefault(require("../../../../../../common/components/ui/spinner.js"));
function Uploading() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-[10px] bg-surface-accent-gray-subtlest flex justify-center items-center shrink-0", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "lg", className: "text-brand" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1 grow overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-default truncate", children: "Uploading..." }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-subtler truncate", children: "Remaining ~1min" })] })] }));
}
