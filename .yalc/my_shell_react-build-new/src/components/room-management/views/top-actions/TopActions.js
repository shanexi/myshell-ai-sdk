"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TopActions;
const jsx_runtime_1 = require("react/jsx-runtime");
const ChatSetting_1 = __importDefault(require("../../../../chat-new/views/extra/chat-setting/ChatSetting.js"));
const Pin_1 = __importDefault(require("../../../../chat-new/views/extra/pin/Pin.js"));
const separator_1 = require("../../../../common/components/ui/separator.js");
const GoBackIcon_1 = __importDefault(require("./GoBackIcon.js"));
function TopActions() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "px-[10px] md:px-0 h-14 flex justify-between items-center md:justify-end shrink-0 md:absolute top-0 right-6 z-20", children: [(0, jsx_runtime_1.jsx)("span", { className: "md:hidden", children: (0, jsx_runtime_1.jsx)(GoBackIcon_1.default, {}) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-0 md:border md:border-default md:shadow-button-basic md:rounded-lg overflow-hidden bg-surface-default", children: [(0, jsx_runtime_1.jsx)(Pin_1.default, {}), (0, jsx_runtime_1.jsx)(separator_1.Separator, { orientation: "vertical", className: "bg-[var(--border)] hidden md:block h-9" }), (0, jsx_runtime_1.jsx)(ChatSetting_1.default, {})] })] }));
}
