"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
function AutoPromptModal({ isOpen, onClose }) {
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isOpen, onClose: onClose, isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, {}), (0, jsx_runtime_1.jsx)(react_1.ModalContent, { h: "600", className: "w-[80%]", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full h-10 flex items-center justify-end px-3 flex-shrink-0 cursor-pointer", onClick: onClose, children: (0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "w-5 h-5 stroke-primary" }) }) })] }));
}
exports.default = AutoPromptModal;
