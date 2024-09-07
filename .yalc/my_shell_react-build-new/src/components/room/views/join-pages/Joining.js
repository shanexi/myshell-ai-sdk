"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Joining;
const jsx_runtime_1 = require("react/jsx-runtime");
const FlowingLogo_1 = __importDefault(require("../../../../common/components/flowing-logo/FlowingLogo.js"));
function Joining() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-0 left-0 z-20 bg-surface-default w-full h-full flex justify-center items-center", children: [(0, jsx_runtime_1.jsx)(FlowingLogo_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "absolute text-sm text-subtler bottom-14", children: "Entering the room..." })] }));
}
