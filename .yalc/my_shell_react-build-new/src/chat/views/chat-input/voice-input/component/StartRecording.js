"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const MicrophoneIcon_1 = __importDefault(require("@heroicons/react/24/solid/MicrophoneIcon"));
const next_intl_1 = require("next-intl");
function StartRecording({ startRecording, callUping, disabled }) {
    const t = (0, next_intl_1.useTranslations)('chat');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center mt-2 text-center text-gray-600 text-sm", children: [(0, jsx_runtime_1.jsx)("div", { children: t('record_top') }), (0, jsx_runtime_1.jsx)(react_1.Button, { onClick: startRecording, backgroundColor: "#ff3b3026", className: "bg-[#ff3b3026]", w: 16, h: 16, marginTop: 2, marginBottom: 1, borderRadius: "full", _hover: {
                    backgroundColor: '#ff3b3026'
                }, isLoading: callUping, isDisabled: disabled, _disabled: {
                    opacity: 0.3,
                    cursor: 'not-allowed'
                }, children: (0, jsx_runtime_1.jsx)(MicrophoneIcon_1.default, { className: "w-[36px] h-[36px] fill-[#ff0000]" }) })] }));
}
exports.default = StartRecording;
