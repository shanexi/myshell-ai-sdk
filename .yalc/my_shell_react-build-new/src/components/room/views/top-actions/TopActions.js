"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TopActions;
const jsx_runtime_1 = require("react/jsx-runtime");
const ChatSetting_1 = __importDefault(require("../../../../chat-new/views/extra/chat-setting/ChatSetting.js"));
const GoBackIcon_1 = __importDefault(require("../../../../components/room-management/views/top-actions/GoBackIcon.js"));
function TopActions() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-14 px-4 md:px-0 flex justify-between items-center md:justify-end shrink-0 md:absolute top-0 right-6 z-20 bg-surface-default md:bg-transparent", children: [(0, jsx_runtime_1.jsx)("span", { className: "md:hidden", children: (0, jsx_runtime_1.jsx)(GoBackIcon_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-[10px] md:gap-0 md:border md:border-default md:shadow-button-basic md:rounded-lg overflow-hidden bg-surface-default", children: (0, jsx_runtime_1.jsx)(ChatSetting_1.default, {}) })] }));
}
