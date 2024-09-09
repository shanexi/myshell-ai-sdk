"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageGenDisplay;
const jsx_runtime_1 = require("react/jsx-runtime");
const default_display_1 = __importDefault(require("../../../default-display.js"));
function ImageGenDisplay({ message, showText = true, showAudio = false }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(default_display_1.default, { message: message, showText: showText, showAudio: showAudio }), ";"] }));
}
