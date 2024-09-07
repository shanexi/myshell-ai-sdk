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
exports.default = ChatSettings;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const Cog8ToothIcon_1 = __importDefault(require("@heroicons/react/24/outline/Cog8ToothIcon"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_2 = require("react");
const ChatSettingForm = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./ChatSettingForm.js'))), {
    loading: () => null,
    ssr: false
});
function ChatSettings({ botInfo, chatSetting, isOpen, toggleIsOpen }) {
    const contentRef = (0, react_2.useRef)();
    function hasAncestorWithClass(element, className) {
        let ele = element;
        while (ele) {
            if (ele.classList.contains(className)) {
                return true;
            }
            if (ele.parentElement) {
                ele = ele.parentElement;
            }
            else {
                return false;
            }
        }
        return false;
    }
    (0, react_1.useOutsideClick)({
        ref: contentRef,
        handler: (e) => {
            if (hasAncestorWithClass(e.target, 'chat-setting-btn')) {
                return;
            }
            toggleIsOpen(false);
        }
    });
    return ((0, jsx_runtime_1.jsxs)(react_1.Popover, { offset: [0, 10], placement: "bottom-end", isOpen: isOpen, closeOnBlur: true, strategy: "fixed", children: [(0, jsx_runtime_1.jsx)(react_1.PopoverTrigger, { children: (0, jsx_runtime_1.jsx)("button", { title: "chat setting button", className: "w-full h-full chat-setting-btn", children: (0, jsx_runtime_1.jsx)(Cog8ToothIcon_1.default, { className: "w-6 h-6 text-primary cursor-pointer", onClick: () => toggleIsOpen() }) }) }), (0, jsx_runtime_1.jsx)(react_1.PopoverContent, { w: "324px", className: "bg-surface border dark:border-default", rounded: "2xl", ref: contentRef, children: (0, jsx_runtime_1.jsx)(react_1.PopoverBody, { p: 0, children: (0, jsx_runtime_1.jsx)(ChatSettingForm, { botInfo: botInfo, chatSetting: chatSetting }) }) })] }));
}
