"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_countdown_1 = __importDefault(require("react-countdown"));
const TableItemCountdown = (0, react_1.memo)(function TableItemCountdown(props) {
    const { countdown = 0 } = props;
    const renderer = ({ seconds, completed, formatted }) => {
        if (completed) {
            return null;
        }
        return ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-default flex gap-1 font-medium w-[120px]", children: [(0, jsx_runtime_1.jsxs)("span", { children: [formatted.days, "d"] }), (0, jsx_runtime_1.jsxs)("span", { children: [formatted.hours, "h"] }), (0, jsx_runtime_1.jsxs)("span", { children: [formatted.minutes, "m"] }), (0, jsx_runtime_1.jsxs)("span", { children: [formatted.seconds, "s"] })] }));
    };
    return (0, jsx_runtime_1.jsx)(react_countdown_1.default, { date: Date.now() + countdown, renderer: renderer, zeroPadDays: 1, zeroPadTime: 1 });
});
exports.default = TableItemCountdown;
