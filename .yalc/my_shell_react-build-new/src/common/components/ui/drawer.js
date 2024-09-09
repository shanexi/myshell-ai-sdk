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
exports.DrawerDescription = exports.DrawerTitle = exports.DrawerContent = exports.DrawerClose = exports.DrawerTrigger = exports.DrawerOverlay = exports.DrawerPortal = void 0;
exports.Drawer = Drawer;
exports.DrawerHeader = DrawerHeader;
exports.DrawerFooter = DrawerFooter;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const vaul_1 = require("vaul");
const utils_1 = require("../../../lib/utils.js");
function Drawer({ shouldScaleBackground = false, ...props }) {
    return (0, jsx_runtime_1.jsx)(vaul_1.Drawer.Root, { shouldScaleBackground: shouldScaleBackground, ...props });
}
Drawer.displayName = 'Drawer';
const DrawerTrigger = vaul_1.Drawer.Trigger;
exports.DrawerTrigger = DrawerTrigger;
const DrawerPortal = vaul_1.Drawer.Portal;
exports.DrawerPortal = DrawerPortal;
const DrawerClose = vaul_1.Drawer.Close;
exports.DrawerClose = DrawerClose;
const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(vaul_1.Drawer.Overlay, { ref: ref, className: (0, utils_1.cn)('fixed inset-0 z-50 bg-alpha-mask-mobile', className), ...props })));
exports.DrawerOverlay = DrawerOverlay;
DrawerOverlay.displayName = vaul_1.Drawer.Overlay.displayName;
const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(DrawerPortal, { children: [(0, jsx_runtime_1.jsx)(DrawerOverlay, {}), (0, jsx_runtime_1.jsx)(vaul_1.Drawer.Content, { ref: ref, className: (0, utils_1.cn)('fixed inset-x-0 bottom-0 z-50 flex h-auto max-h-[70%] flex-col rounded-t-2xl bg-surface-default shadow-modal-default', className), ...props, children: children })] })));
exports.DrawerContent = DrawerContent;
DrawerContent.displayName = 'DrawerContent';
function DrawerHeader({ className, ...props }) {
    return (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('p-4', className), ...props });
}
DrawerHeader.displayName = 'DrawerHeader';
function DrawerFooter({ className, ...props }) {
    return (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('p-4', className), ...props });
}
DrawerFooter.displayName = 'DrawerFooter';
const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(vaul_1.Drawer.Title, { ref: ref, className: (0, utils_1.cn)('text-xl font-normal text-default', className), ...props })));
exports.DrawerTitle = DrawerTitle;
DrawerTitle.displayName = vaul_1.Drawer.Title.displayName;
const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(vaul_1.Drawer.Description, { ref: ref, className: (0, utils_1.cn)('text-sm text-subtle', className), ...props })));
exports.DrawerDescription = DrawerDescription;
DrawerDescription.displayName = vaul_1.Drawer.Description.displayName;
