"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UploadError;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowPathIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowPathIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const DocumentIcon_1 = __importDefault(require("@heroicons/react/24/solid/DocumentIcon"));
const icon_button_1 = require("../../../../../../common/components/ui/icon-button.js");
function UploadError({ name, onRetry, onDelete }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-[10px] bg-surface-accent-red-subtler flex justify-center items-center shrink-0", children: (0, jsx_runtime_1.jsx)(DocumentIcon_1.default, { className: "w-6 h-6 text-icon-critical" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1 grow overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-default truncate", children: name }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-subtler truncate", children: "Upload failed, please try again" })] }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { size: "sm", variant: "ghost", className: "text-icon-critical shrink-0", icon: ArrowPathIcon_1.default, onClick: onRetry }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { className: "shrink-0", size: "sm", variant: "ghost", icon: XMarkIcon_1.default, onClick: onDelete })] }));
}
