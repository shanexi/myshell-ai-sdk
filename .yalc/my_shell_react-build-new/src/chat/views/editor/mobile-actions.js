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
exports.default = MobileActions;
const jsx_runtime_1 = require("react/jsx-runtime");
const MicrophoneIcon_1 = __importDefault(require("@heroicons/react/24/outline/MicrophoneIcon"));
const ChevronUpIcon_1 = __importDefault(require("@heroicons/react/24/solid/ChevronUpIcon"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
const context_1 = __importDefault(require("../../../chat/layouts/context.js"));
const FunctionMenu_1 = __importDefault(require("../../../chat/views/chat-input/function-menu/FunctionMenu.js"));
const avatar_1 = require("../../../common/components/ui/avatar.js");
const VoiceConnectEntry = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../chat/views/voice-call/VoiceConnectEntry.js'))), {
    ssr: false
});
function MobileActions(props) {
    const { isPanelImageBot, toolbarState, toggleVoice, name, logoUrl, isWorkshop, botInfo } = props;
    const { showMobileDetail } = (0, react_1.useContext)(context_1.default);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-row justify-between items-center mt-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grow flex justify-start items-center space-x-[6px]", onClick: () => {
                    showMobileDetail?.();
                }, children: [(0, jsx_runtime_1.jsx)("div", { className: "shrink-0 rounded-lg border border-default overflow-hidden", children: (0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: logoUrl, size: "md" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-1 text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-1 break-all", children: name }), (0, jsx_runtime_1.jsx)(ChevronUpIcon_1.default, { className: "w-[18px] h-[18px] text-primary flex-shrink-0" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "shrink-0 flex items-center space-x-[6px]", children: [(0, jsx_runtime_1.jsx)(FunctionMenu_1.default, { isWorkshop: isWorkshop, botInfo: botInfo }), !isPanelImageBot && (0, jsx_runtime_1.jsx)(MicrophoneIcon_1.default, { className: "w-9 h-9 p-[6px] text-primary", onClick: toggleVoice }), toolbarState.isUseVoiceCall && !isPanelImageBot && (0, jsx_runtime_1.jsx)(VoiceConnectEntry, { botInfo: botInfo })] })] }));
}
