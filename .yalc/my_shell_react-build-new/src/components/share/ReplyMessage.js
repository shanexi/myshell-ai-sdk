"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReplyMessage;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const AudioPlayer_1 = __importDefault(require("./AudioPlayer.js"));
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../common/components/MdViewer.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)("div", { children: "loading..." }),
    ssr: false
});
function ReplyMessage({ chat, chatSetting, isFromDownload }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex flex-col space-y-2 rounded-lg bg-on-primary', chat.componentContainer ? 'w-full' : 'w-full sm:w-3/4'), children: [chatSetting?.isTranscriptionOn && chat.text && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('py-3 px-4 leading-6', chat.componentContainer ? 'w-full' : 'max-w-fit'), children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-row items-center space-x-1 overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: " text-black w-full", children: (0, jsx_runtime_1.jsx)(MdViewer, { content: chat.text, status: chat.status }) }) }) })), chatSetting?.isAudioOn && chat.voiceUrl && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { id: chat.id, direction: "left", showBottomBorder: true, borderColor: "#e9e9e9", showProgressBar: true, src: chat.voiceUrl, blobDuration: chat.voiceFileDurationSeconds }))] }));
}
