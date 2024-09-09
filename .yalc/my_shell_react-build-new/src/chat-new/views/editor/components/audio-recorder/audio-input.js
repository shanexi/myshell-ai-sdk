"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioInput = AudioInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const MicrophoneIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/MicrophoneIcon"));
const icon_button_1 = require("../../../../../common/components/ui/icon-button");
function AudioInput({ onStart, disabled = false }) {
    return ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: onStart, variant: "ghost", color: "brand", size: "md", disabled: disabled, icon: MicrophoneIcon_1.default }));
}
