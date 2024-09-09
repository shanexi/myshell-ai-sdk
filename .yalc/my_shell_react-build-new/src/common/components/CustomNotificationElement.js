"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomNotificationElement;
const jsx_runtime_1 = require("react/jsx-runtime");
const outline_1 = require("@heroicons/react/24/outline");
const CheckCircleIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/CheckCircleIcon"));
const ExclamationCircleIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/ExclamationCircleIcon"));
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/InformationCircleIcon"));
const XCircleIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/XCircleIcon"));
const next_intl_1 = require("next-intl");
const react_hot_toast_1 = require("react-hot-toast");
const common_helper_1 = require("../../common/utils/common-helper");
const icon_button_1 = require("./ui/icon-button");
const typography_1 = require("./ui/typography");
function CustomNotificationElement({ tProps, customProps }) {
    const { type, title, content, isClosable = false, translateInToast } = customProps;
    const { id } = tProps;
    const t = (0, next_intl_1.useTranslations)();
    const displayedContent = !(0, common_helper_1.isString)(content) ? JSON.stringify(content) : content;
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { id: id, className: "z-[10000000] min-h-10 w-fit max-w-[90vw] md:max-w-[560px] rounded-full bg-surface-search-field border-opaque border shadow-modal-default py-2 px-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center w-full space-x-2", children: [type && ((0, jsx_runtime_1.jsxs)("div", { className: "flex-shrink-0 flex items-center", children: [type === 'info' && (0, jsx_runtime_1.jsx)(InformationCircleIcon_1.default, { className: "text-surface-info-default w-6 h-6" }), type === 'success' && (0, jsx_runtime_1.jsx)(CheckCircleIcon_1.default, { className: "text-surface-success-default w-6 h-6" }), type === 'warning' && (0, jsx_runtime_1.jsx)(ExclamationCircleIcon_1.default, { className: "text-surface-warning-default w-6 h-6" }), type === 'error' && (0, jsx_runtime_1.jsx)(XCircleIcon_1.default, { className: "text-icon-critical w-6 h-6" })] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col flex-grow overflow-hidden space-y-1", children: [title && ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", color: "default", children: title }) })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", color: "default", children: translateInToast ? t(displayedContent) : displayedContent }) })] }), isClosable && ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", icon: outline_1.XMarkIcon, onClick: () => react_hot_toast_1.toast.dismiss(id), className: "w-4 h-4 text-icon-subtlest" }))] }) }) }));
}
