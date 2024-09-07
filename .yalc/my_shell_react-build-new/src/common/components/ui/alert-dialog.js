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
exports.AlertDialogCancel = exports.AlertDialogAction = exports.AlertDialogDescription = exports.AlertDialogTitle = exports.AlertDialogContent = exports.AlertDialogTrigger = exports.AlertDialogOverlay = exports.AlertDialogPortal = exports.AlertDialog = void 0;
exports.AlertDialogHeader = AlertDialogHeader;
exports.AlertDialogFooter = AlertDialogFooter;
const jsx_runtime_1 = require("react/jsx-runtime");
const AlertDialogPrimitive = __importStar(require("@radix-ui/react-alert-dialog"));
const React = __importStar(require("react"));
const button_1 = require("../../../common/components/ui/button.js");
const utils_1 = require("../../../lib/utils.js");
const AlertDialog = AlertDialogPrimitive.Root;
exports.AlertDialog = AlertDialog;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
exports.AlertDialogPortal = AlertDialogPortal;
const AlertDialogTrigger = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Trigger, { ref: ref, className: (0, utils_1.cn)('ring-offset-surface-default focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1', className), ...props })));
exports.AlertDialogTrigger = AlertDialogTrigger;
AlertDialogTrigger.displayName = AlertDialogPrimitive.Trigger.displayName;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Overlay, { className: (0, utils_1.cn)('fixed inset-0 z-50 bg-alpha-mask-desktop data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', className), ...props, ref: ref })));
exports.AlertDialogOverlay = AlertDialogOverlay;
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(AlertDialogPortal, { children: [(0, jsx_runtime_1.jsx)(AlertDialogOverlay, {}), (0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Content, { ref: ref, className: (0, utils_1.cn)('fixed left-[50%] top-[50%] z-50 grid w-full rounded-4xl max-w-lg translate-x-[-50%] translate-y-[-50%] bg-surface-default shadow-modal-default duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] ring-offset-surface-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1', className), ...props })] })));
exports.AlertDialogContent = AlertDialogContent;
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
function AlertDialogHeader({ className, ...props }) {
    return (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex flex-col p-4 text-default', className), ...props });
}
AlertDialogHeader.displayName = 'AlertDialogHeader';
function AlertDialogFooter({ className, ...props }) {
    return (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex justify-end p-4 space-x-4', className), ...props });
}
AlertDialogFooter.displayName = 'AlertDialogFooter';
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Title, { ref: ref, className: (0, utils_1.cn)('text-xl font-normal', className), ...props })));
exports.AlertDialogTitle = AlertDialogTitle;
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Description, { ref: ref, className: (0, utils_1.cn)('text-sm text-subtle px-4', className), ...props })));
exports.AlertDialogDescription = AlertDialogDescription;
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Action, { ref: ref, className: (0, utils_1.cn)((0, button_1.buttonVariants)(), className), ...props })));
exports.AlertDialogAction = AlertDialogAction;
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Cancel, { ref: ref, className: (0, utils_1.cn)((0, button_1.buttonVariants)({ variant: 'outline' }), className), ...props })));
exports.AlertDialogCancel = AlertDialogCancel;
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
