"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VoiceMessage;
const jsx_runtime_1 = require("react/jsx-runtime");
const AudioPlayer_1 = __importDefault(require("../audio-player/AudioPlayer.js"));
function VoiceMessage({ chat, blobDuration, botInfo }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "voice-message relative w-fit max-w-full sm:ml-0 flex flex-col space-y-2 rounded-tr-sm rounded-2xl bg-surface-primary-subtle-hovered text-on-surface", children: [(botInfo?.botSetting?.textDisplay ?? true) && chat.text && ((0, jsx_runtime_1.jsx)("div", { className: "pt-[10px] px-[12px] leading-[21px] max-w-fit", children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm md:text-base", children: chat.text }) })), chat.voiceUrl && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, src: chat.voiceUrl, blobDuration: blobDuration, direction: "right", showBottomBorder: (botInfo?.botSetting?.textDisplay ?? true) && chat?.text != '', borderColor: "#e5def1", isFromHistory: chat.isFromHistory, showProgressBar: true }, chat.id || 0))] }));
}
