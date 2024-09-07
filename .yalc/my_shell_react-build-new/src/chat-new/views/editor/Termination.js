"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Termination;
const jsx_runtime_1 = require("react/jsx-runtime");
const StopCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/StopCircleIcon"));
const button_1 = require("../../../common/components/ui/button.js");
function Termination({ onTerminate }) {
    return ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "default", size: "md", onClick: onTerminate, children: (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex space-x-[6px]", children: [(0, jsx_runtime_1.jsx)(StopCircleIcon_1.default, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Stop" })] }) }));
}
