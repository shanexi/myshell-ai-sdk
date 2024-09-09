"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploader = FileUploader;
const jsx_runtime_1 = require("react/jsx-runtime");
const PlusCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/PlusCircleIcon"));
const react_1 = require("react");
const MessageContext_1 = require("../../../../chat-new/context/MessageContext");
const icon_button_1 = require("../../../../common/components/ui/icon-button");
function FileUploader({ disabled = false }) {
    const { getClickRootProps, getInputProps } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    return ((0, jsx_runtime_1.jsxs)("div", { ...getClickRootProps?.(), children: [(0, jsx_runtime_1.jsx)("input", { ...getInputProps?.() }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { disabled: disabled, variant: "ghost", color: "brand", size: "md", icon: PlusCircleIcon_1.default })] }));
}
