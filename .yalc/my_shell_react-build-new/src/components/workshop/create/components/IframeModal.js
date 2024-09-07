"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const next_intl_1 = require("next-intl");
function IframeModal({ url, isOpen, onClose }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isOpen, onClose: onClose, isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, {}), (0, jsx_runtime_1.jsxs)(react_1.ModalContent, { h: "600", className: "w-[92vw] md:w-[80%] max-w-[698px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full h-[68px] flex items-center justify-between px-4 flex-shrink-0 cursor-pointer", onClick: onClose, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-on-surface text-[20px]", children: t('learn_more') }), (0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "w-6 h-6 stroke-[#6D7175]" })] }), (0, jsx_runtime_1.jsx)("iframe", { className: "h-full", id: "outside-url-iframe", allow: "camera", src: url })] })] }));
}
exports.default = IframeModal;
