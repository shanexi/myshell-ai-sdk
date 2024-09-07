"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toaster = Toaster;
const jsx_runtime_1 = require("react/jsx-runtime");
const CheckCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/CheckCircleIcon"));
const ExclamationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/ExclamationCircleIcon"));
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/InformationCircleIcon"));
const XCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/XCircleIcon"));
const toast_1 = require("../../../../common/components/ui/toast/toast.js");
const use_toast_1 = require("../../../../common/components/ui/toast/use-toast.js");
const utils_1 = require("../../../../lib/utils.js");
function Toaster() {
    const { toasts } = (0, use_toast_1.useToast)();
    return ((0, jsx_runtime_1.jsxs)(toast_1.ToastProvider, { children: [toasts.map(function ({ id, title, description, action, ...props }) {
                const variant = props.variant;
                const renderIcon = (variant) => {
                    switch (variant) {
                        case 'info':
                            return (0, jsx_runtime_1.jsx)(InformationCircleIcon_1.default, { className: "text-[#3E5CFA] w-6 h-6" });
                        case 'success':
                            return (0, jsx_runtime_1.jsx)(CheckCircleIcon_1.default, { className: "text-[#0EE08B] w-6 h-6" });
                        case 'warning':
                            return (0, jsx_runtime_1.jsx)(ExclamationCircleIcon_1.default, { className: "text-[#FAAC00] w-6 h-6" });
                        case 'error':
                            return (0, jsx_runtime_1.jsx)(XCircleIcon_1.default, { className: "text-[#F1285B] w-6 h-6" });
                    }
                };
                const getBackgroundColor = (variant) => {
                    switch (variant) {
                        case 'info':
                            return 'bg-surface-accent-blue-subtler';
                        case 'success':
                            return 'bg-surface-accent-green-subtler';
                        case 'warning':
                            return 'bg-surface-accent-yellow-subtler';
                        case 'error':
                            return 'bg-surface-accent-red-subtler';
                    }
                };
                return ((0, jsx_runtime_1.jsxs)(toast_1.Toast, { ...props, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3 items-start", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 flex-grow-0', getBackgroundColor(variant)), children: renderIcon(variant) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid gap-1", children: [title && (0, jsx_runtime_1.jsx)(toast_1.ToastTitle, { className: "text-base text-default", children: title }), description && (0, jsx_runtime_1.jsx)(toast_1.ToastDescription, { className: "text-sm text-subtle", children: description }), action] })] }) }), (0, jsx_runtime_1.jsx)(toast_1.ToastClose, {})] }, id));
            }), (0, jsx_runtime_1.jsx)(toast_1.ToastViewport, {})] }));
}
