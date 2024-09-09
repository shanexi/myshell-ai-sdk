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
exports.MTooltipArrow = exports.MTooltipContent = exports.MTooltipTrigger = exports.MTooltip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const PopoverPrimitive = __importStar(require("@radix-ui/react-popover"));
const React = __importStar(require("react"));
const utils_1 = require("../../../../lib/utils.js");
const MTooltip = PopoverPrimitive.Root;
exports.MTooltip = MTooltip;
const MTooltipTrigger = PopoverPrimitive.Trigger;
exports.MTooltipTrigger = MTooltipTrigger;
const MTooltipArrow = PopoverPrimitive.Arrow;
exports.MTooltipArrow = MTooltipArrow;
const MTooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => ((0, jsx_runtime_1.jsx)(PopoverPrimitive.Portal, { children: (0, jsx_runtime_1.jsx)(PopoverPrimitive.Content, { ref: ref, align: "center", side: "top", sideOffset: sideOffset, className: (0, utils_1.cn)('z-50 rounded-lg border border-opaque bg-surface-default px-3 py-2 text-xs text-subtle shadow-modal-default outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', className), ...props }) })));
exports.MTooltipContent = MTooltipContent;
MTooltipContent.displayName = PopoverPrimitive.Content.displayName;
