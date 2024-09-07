"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const SvgIcon_1 = __importDefault(require("../../../common/components/SvgIcon.js"));
function VoiceCallEndTip({ duration }) {
    const t = (0, next_intl_1.useTranslations)('chat');
    const d = parseFloat(duration) / 1000;
    const minute = Math.floor(d / 60);
    const second = Math.floor(d % 60);
    return ((0, jsx_runtime_1.jsxs)(react_1.Box, { className: ` flex flex-row md:min-w-[200px] items-center justify-start p-5 bg-secondary-container rounded-xl text-primary `, children: [(0, jsx_runtime_1.jsx)(SvgIcon_1.default, { src: "/icons/voiceCallEndIcon.svg", className: "w-[24px] h-[24px] bg-primary" }), (0, jsx_runtime_1.jsx)(react_1.Text, { fontSize: "14px", fontWeight: "500", className: "mx-1", children: t('voice_call_end', { minute, second }) })] }));
}
exports.default = VoiceCallEndTip;
