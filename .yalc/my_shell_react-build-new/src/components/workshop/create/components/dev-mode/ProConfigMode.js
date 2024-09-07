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
exports.default = ProConfigMode;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const clsx_1 = __importDefault(require("clsx"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const button_1 = require("../../../../../common/components/ui/button.js");
const separator_1 = require("../../../../../common/components/ui/separator.js");
const store_1 = require("../../../../../services/store/index.js");
const CodeEditor = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../../common/components/code-editor/index.js'))), {
    ssr: false
});
function ProConfigMode({ form, handleCheckCode, checking, errorInfo, onCodeChange, errorPath, errorMsg }) {
    const [value, setValue] = (0, react_2.useState)(form.getFieldValue('devModeRawInput'));
    const currentForm = (0, store_1.useWorkshopStore)(state => state.currentForm);
    const setCurrentForm = (0, store_1.useWorkshopStore)(state => state.setCurrentForm);
    const t = (0, next_intl_1.useTranslations)('common');
    const [isFullScreen, setFullScreen] = (0, react_2.useState)(false);
    const onFullScreenToggle = () => {
        setFullScreen(!isFullScreen);
    };
    const r = () => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "shrink-0 flex items-center p-4 space-x-4", children: [(0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-base font-semibold", children: "JSON" }), (0, jsx_runtime_1.jsxs)("div", { className: "grow flex justify-end space-x-3", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "md", onClick: onFullScreenToggle, children: isFullScreen ? t('exit_fullscreen') : t('fullscreen') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", color: "brand", size: "md", disabled: !value, loading: checking, onClick: handleCheckCode, children: t('validate') })] })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "shrink-0" }), (0, jsx_runtime_1.jsx)("div", { className: "grow p-1", children: (0, jsx_runtime_1.jsx)(form.Field, { name: "devModeRawInput", children: field => ((0, jsx_runtime_1.jsx)(CodeEditor, { disabled: checking, value: field.getValue(), errorMsg: errorMsg, jsonPath: errorPath, onValueChange: value => {
                            setValue(value);
                            field.setValue(value);
                            setCurrentForm({ ...currentForm, devModeRawInput: value });
                            onCodeChange();
                        } })) }) })] }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "h-[300px] border border-default rounded-xl shadow-background-default", children: r() }), errorInfo && (0, jsx_runtime_1.jsx)("span", { className: "text-red-500 text-sm", children: errorInfo }), (0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isFullScreen, onClose: () => { }, size: "6xl", children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, {}), (0, jsx_runtime_1.jsx)(react_1.ModalContent, { className: (0, clsx_1.default)('h-[708px]'), children: (0, jsx_runtime_1.jsx)(react_1.ModalBody, { className: (0, clsx_1.default)('p-0'), children: (0, jsx_runtime_1.jsx)("div", { className: "h-full", children: r() }) }) })] })] }));
}
