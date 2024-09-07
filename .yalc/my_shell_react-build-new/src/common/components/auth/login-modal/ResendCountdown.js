"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_countdown_1 = __importDefault(require("react-countdown"));
const ResendCountDown = (0, react_1.memo)(function ResendCountDown() {
    const renderer = ({ seconds, completed, formatted }) => {
        if (completed) {
            return null;
        }
        return (0, jsx_runtime_1.jsxs)("span", { children: ["(", formatted.seconds, "s)"] });
    };
    return (0, jsx_runtime_1.jsx)(react_countdown_1.default, { date: Date.now() + 59 * 1000, renderer: renderer });
});
exports.default = ResendCountDown;
