"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VoiceMessage;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const AudioPlayer_1 = __importDefault(require("./AudioPlayer.js"));
function VoiceMessage({ chat }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('voice-message relative w-fit max-w-full sm:max-w-[75%] sm:ml-0 flex flex-col space-y-2 rounded-[16px]', '', 'bg-surface-variant text-on-surface'), children: [chat.text && ((0, jsx_runtime_1.jsx)("div", { className: "pt-[10px] px-[12px] leading-[21px] max-w-fit", children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm md:text-base", children: chat.text }) })), chat.voiceUrl && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { id: chat.id, src: chat.voiceUrl, direction: "right", borderColor: "var(--primary)" }))] }));
}
