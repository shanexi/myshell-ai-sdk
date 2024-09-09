"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MineMessage;
const jsx_runtime_1 = require("react/jsx-runtime");
const content_1 = __importDefault(require("../../../../../chat-new/views/message-list/components/content"));
const display_provider_1 = require("../../../../../chat-new/views/message-list/components/display-provider");
const menubar_1 = __importDefault(require("../../../../../chat-new/views/message-list/components/menubar"));
function MineMessage() {
    const { message } = (0, display_provider_1.useDisplayContext)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-[calc(100%-38px)] ml-[38px] group/menu gap-x-1.5 flex justify-end", children: [(0, jsx_runtime_1.jsx)(menubar_1.default, { className: "hidden md:group-hover/menu:flex" }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", { className: "min-w-12 max-w-[303px] md:max-w-[420px] lg:max-w-[476px] large:max-w-[480px] rounded-2xl rounded-tr-sm min-h-11 p-3 bg-surface-primary-subtle-hovered", children: (0, jsx_runtime_1.jsx)(content_1.default, { message: message }) }) })] }));
}
