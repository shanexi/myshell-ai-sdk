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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogDescription = exports.DialogTitle = exports.DialogContent = exports.DialogTrigger = exports.DialogClose = exports.DialogOverlay = exports.DialogPortal = exports.Dialog = void 0;
exports.DialogHeader = DialogHeader;
exports.DialogFooter = DialogFooter;
const jsx_runtime_1 = require("react/jsx-runtime");
const DialogPrimitive = __importStar(require("@radix-ui/react-dialog"));
const lucide_react_1 = require("lucide-react");
const React = __importStar(require("react"));
const utils_1 = require("../../../lib/utils.js");
const Dialog = DialogPrimitive.Root;
exports.Dialog = Dialog;
const DialogPortal = DialogPrimitive.Portal;
exports.DialogPortal = DialogPortal;
const DialogClose = DialogPrimitive.Close;
exports.DialogClose = DialogClose;
const DialogTrigger = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(DialogPrimitive.Trigger, { ref: ref, className: (0, utils_1.cn)('ring-offset-surface-default focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1', className), ...props })));
exports.DialogTrigger = DialogTrigger;
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(DialogPrimitive.Overlay, { ref: ref, className: (0, utils_1.cn)('fixed inset-0 z-50 bg-opacity-90 md:bg-opacity-75 bg-alpha-mask-desktop data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', className), ...props })));
exports.DialogOverlay = DialogOverlay;
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, hideClose = false, maskClosable = true, overlayClose = true, onClose, overlayClassName, iconClassName, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(DialogPortal, { children: [(0, jsx_runtime_1.jsx)(DialogOverlay, { onClick: () => {
                maskClosable && overlayClose && onClose && onClose();
            }, className: overlayClassName }), (0, jsx_runtime_1.jsxs)(DialogPrimitive.Content, { ref: ref, className: (0, utils_1.cn)('fixed left-[50%] top-[50%] z-50 grid w-[90%] rounded-4xl max-w-lg translate-x-[-50%] translate-y-[-50%] bg-surface-default shadow-modal-default duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] ring-offset-surface-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 focus-visible:outline-0', className), ...props, children: [children, !hideClose && ((0, jsx_runtime_1.jsxs)(DialogPrimitive.Close, { className: (0, utils_1.cn)('w-9 h-9 absolute right-5 top-3 flex justify-center items-center focus-visible:outline-0 rounded-full hover:bg-surface-hovered', iconClassName), onClick: () => {
                        onClose && onClose();
                    }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "w-6 h-6 text-icon-subtle" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Close" })] }))] })] })));
exports.DialogContent = DialogContent;
DialogContent.displayName = DialogPrimitive.Content.displayName;
function DialogHeader({ className, ...props }) {
    return (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex flex-col p-4', className), ...props });
}
DialogHeader.displayName = 'DialogHeader';
function DialogFooter({ className, ...props }) {
    return (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex justify-end p-4', className), ...props });
}
DialogFooter.displayName = 'DialogFooter';
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(DialogPrimitive.Title, { ref: ref, className: (0, utils_1.cn)('text-xl font-normal', className), ...props })));
exports.DialogTitle = DialogTitle;
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(DialogPrimitive.Description, { ref: ref, className: (0, utils_1.cn)('text-sm text-subtle p-4', className), ...props })));
exports.DialogDescription = DialogDescription;
DialogDescription.displayName = DialogPrimitive.Description.displayName;
