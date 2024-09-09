"use strict";
'use client';
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
exports.ModalContent = exports.ModalOverlay = exports.ModalRoot = exports.ModalTitle = exports.Modal = void 0;
exports.ModalHeader = ModalHeader;
exports.ModalFooter = ModalFooter;
exports.ModalBody = ModalBody;
const jsx_runtime_1 = require("react/jsx-runtime");
const CheckCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/CheckCircleIcon"));
const ExclamationTriangleIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/ExclamationTriangleIcon"));
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/InformationCircleIcon"));
const XCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/XCircleIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/XMarkIcon"));
const DialogPrimitive = __importStar(require("@radix-ui/react-dialog"));
const react_focus_scope_1 = require("@radix-ui/react-focus-scope");
const class_variance_authority_1 = require("class-variance-authority");
const next_intl_1 = require("next-intl");
const React = __importStar(require("react"));
const react_use_1 = require("react-use");
const vaul_1 = require("vaul");
const utils_1 = require("../../../lib/utils");
const button_1 = require("./button");
const icon_button_1 = require("./icon-button");
const typography_1 = require("./typography");
const ModalOverlay = React.forwardRef(({ className, onClick, ...props }, ref) => ((0, jsx_runtime_1.jsx)(DialogPrimitive.Overlay, { ref: ref, className: (0, utils_1.cn)('fixed inset-0 z-50 bg-alpha-mask-desktop data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', className), onClick: e => {
        onClick && onClick(e);
    }, ...props })));
exports.ModalOverlay = ModalOverlay;
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(vaul_1.Drawer.Overlay, { ref: ref, className: (0, utils_1.cn)('fixed inset-0 z-50 bg-alpha-mask-desktop', className), ...props })));
DrawerOverlay.displayName = vaul_1.Drawer.Overlay.displayName;
const ModalContent = React.forwardRef(({ className, children, ...props }, ref) => ((0, jsx_runtime_1.jsx)(DialogPrimitive.Content, { className: (0, utils_1.cn)('absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2', 'duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] focus:outline-none', className), ...props, children: children })));
exports.ModalContent = ModalContent;
const ModalRoot = ({ children, ...props }) => ((0, jsx_runtime_1.jsx)(DialogPrimitive.Dialog, { ...props, children: (0, jsx_runtime_1.jsx)(DialogPrimitive.Portal, { children: children }) }));
exports.ModalRoot = ModalRoot;
const ModalTitle = React.forwardRef(({ className, ...props }, ref) => {
    const isMobile = (0, react_use_1.useMedia)('(max-width: 768px)');
    if (isMobile) {
        return ((0, jsx_runtime_1.jsx)(vaul_1.Drawer.Title, { ref: ref, ...props, className: (0, utils_1.cn)('text-xl text-default font-medium line-clamp-1', className) }));
    }
    return ((0, jsx_runtime_1.jsx)(DialogPrimitive.Title, { ref: ref, ...props, className: (0, utils_1.cn)('text-xl text-default font-medium line-clamp-1', className) }));
});
exports.ModalTitle = ModalTitle;
ModalTitle.displayName = DialogPrimitive.Title.displayName;
const modalVariants = (0, class_variance_authority_1.cva)('', {
    variants: {
        size: {
            lg: 'w-[750px] max-h-[640px]',
            md: 'w-[620px] max-h-[640px]',
            sm: 'w-[380px] max-h-[640px]'
        },
        zIndex: {
            9: 'z-[9]',
            99: 'z-[99]',
            999: 'z-[999]',
            9999: 'z-[9999]'
        }
    },
    defaultVariants: {
        size: 'lg',
        zIndex: 99
    }
});
const Modal = ({ title, description, size = 'lg', zIndex = 99, hideClose = false, overlayClose = true, modalOnly = true, contentClassName, overlayClassName, iconClassName, closeClassName, fullScreen = false, focusScopeOptions, isLogin = false, isNotification = false, isHorizontal = false, state, confirmLoading = false, cancelText, confirmText, children, onClose, onConfirm, ...props }) => {
    const isMobile = (0, react_use_1.useMedia)('(max-width: 768px)');
    if (isMobile && !modalOnly && !isNotification) {
        const drawerContent = ((0, jsx_runtime_1.jsxs)(vaul_1.Drawer.Content, { className: (0, utils_1.cn)('fixed inset-x-0 bottom-0 z-50 h-auto overflow-hidden no-scrollbar bg-surface-default shadow-modal-default focus:outline-none', fullScreen ? 'rounded-t-none max-h-full' : 'rounded-t-2xl max-h-[85vh]'), children: [title ? ((0, jsx_runtime_1.jsx)(ModalHeader, { children: (0, jsx_runtime_1.jsx)(ModalTitle, { children: title }) })) : null, (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('overflow-y-auto', fullScreen
                        ? title
                            ? 'max-h-[calc(100vh-60px)]'
                            : 'max-h-[100vh]'
                        : title
                            ? 'max-h-[calc(85vh-60px)]'
                            : 'max-h-[85vh]'), children: children }), !hideClose && ((0, jsx_runtime_1.jsxs)(vaul_1.Drawer.Close, { className: (0, utils_1.cn)('absolute right-4 top-3', closeClassName), onClick: () => {
                        onClose && onClose();
                    }, children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: XMarkIcon_1.default, size: "md", variant: "ghost", color: "default", className: iconClassName }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Close" })] }))] }));
        return ((0, jsx_runtime_1.jsx)(vaul_1.Drawer.Root, { ...props, children: (0, jsx_runtime_1.jsxs)(vaul_1.Drawer.Portal, { children: [(0, jsx_runtime_1.jsx)(DrawerOverlay, { onClick: () => {
                            overlayClose && onClose && onClose();
                        }, className: overlayClassName }), focusScopeOptions ? (0, jsx_runtime_1.jsx)(react_focus_scope_1.FocusScope, { ...focusScopeOptions, children: drawerContent }) : drawerContent] }) }));
    }
    const renderIcon = (state) => {
        switch (state) {
            case 'info':
                return (0, jsx_runtime_1.jsx)(InformationCircleIcon_1.default, { className: "text-icon-brand w-6 h-6" });
            case 'success':
                return (0, jsx_runtime_1.jsx)(CheckCircleIcon_1.default, { className: "text-icon-success w-6 h-6" });
            case 'warning':
                return (0, jsx_runtime_1.jsx)(ExclamationTriangleIcon_1.default, { className: "text-icon-warning w-6 h-6" });
            case 'error':
                return (0, jsx_runtime_1.jsx)(XCircleIcon_1.default, { className: "text-icon-critical w-6 h-6" });
        }
    };
    const getBackgroundColor = (state) => {
        switch (state) {
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
    const commonT = (0, next_intl_1.useTranslations)('common');
    const dialogContent = ((0, jsx_runtime_1.jsxs)(ModalContent, { className: (0, utils_1.cn)('rounded-2xl bg-surface-default shadow-modal-default overflow-hidden', !isMobile ? modalVariants({ size, zIndex }) : isLogin ? 'w-[90%]' : 'w-[80%]', isNotification && 'w-[312px] md:w-[380px]', contentClassName), children: [isNotification ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ModalHeader, { className: (0, utils_1.cn)(isNotification && 'border-none !pb-3'), children: state && ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 flex-grow-0', getBackgroundColor(state)), children: renderIcon(state) })) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1.5", children: [title ? ((0, jsx_runtime_1.jsx)("div", { className: "px-5", children: (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", children: title }) })) : null, description ? ((0, jsx_runtime_1.jsx)("div", { className: "px-5", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", children: description }) })) : null] }), (0, jsx_runtime_1.jsxs)(ModalFooter, { className: (0, utils_1.cn)('gap-x-5 min-h-[76px] p-5 border-none justify-center w-full'), children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "gray", onClick: onClose, className: "flex-1", children: cancelText || commonT('cancel') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", onClick: onConfirm, loading: confirmLoading, color: state === 'error' ? 'error' : state === 'warning' ? 'warning' : 'brand', className: "flex-1", children: confirmText || commonT('confirm') })] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [title ? ((0, jsx_runtime_1.jsx)(ModalHeader, { children: (0, jsx_runtime_1.jsx)(ModalTitle, { children: title }) })) : null, children] })), !hideClose && ((0, jsx_runtime_1.jsxs)(DialogPrimitive.Close, { className: (0, utils_1.cn)('absolute right-4 top-4', isNotification && 'top-5', closeClassName), onClick: () => {
                    onClose && onClose();
                }, children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: XMarkIcon_1.default, size: "md", variant: "ghost", color: "default", className: iconClassName }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Close" })] }))] }));
    return ((0, jsx_runtime_1.jsxs)(ModalRoot, { ...props, children: [(0, jsx_runtime_1.jsx)(ModalOverlay, { onClick: () => {
                    overlayClose && onClose && onClose();
                }, className: overlayClassName }), focusScopeOptions ? (0, jsx_runtime_1.jsx)(react_focus_scope_1.FocusScope, { ...focusScopeOptions, children: dialogContent }) : dialogContent] }));
};
exports.Modal = Modal;
function ModalHeader({ className, children, ...props }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('border-b border-default flex flex-col py-4 md:py-5 px-4 justify-center', className), ...props, children: children }));
}
ModalHeader.displayName = 'ModalHeader';
function ModalFooter({ className, children, ...props }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('border-t border-default flex justify-end p-4', className), ...props, children: children }));
}
ModalFooter.displayName = 'ModalFooter';
function ModalBody({ className, children, ...props }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('py-3', className), ...props, children: children }));
}
ModalBody.displayName = 'ModalBody';
