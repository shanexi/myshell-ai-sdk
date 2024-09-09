"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const audio_display_1 = __importDefault(require("./audio-display/audio-display"));
const text_display_1 = __importDefault(require("./text-display/text-display"));
const DefaultDisplay = ({ message, showText = true, showAudio = false }) => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showText && (0, jsx_runtime_1.jsx)(text_display_1.default, {}), (0, jsx_runtime_1.jsx)(audio_display_1.default, { message: message, showAudio: showAudio })] }));
};
exports.default = DefaultDisplay;
