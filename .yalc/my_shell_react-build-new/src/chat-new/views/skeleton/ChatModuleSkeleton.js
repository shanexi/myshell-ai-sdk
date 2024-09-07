"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatModuleSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const separator_1 = require("../../../common/components/ui/separator.js");
const EditorSkeleton_1 = __importDefault(require("../editor/skeleton/EditorSkeleton.js"));
const MessageListSkeleton_1 = __importDefault(require("../message-list/skeleton/MessageListSkeleton.js"));
function ChatModuleSkeleton() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "grow h-full px-4 md:px-6 py-0", children: (0, jsx_runtime_1.jsx)(MessageListSkeleton_1.default, {}) }), (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "w-full bg-[var(--border)] hidden md:block" }), (0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: (0, jsx_runtime_1.jsx)(EditorSkeleton_1.default, {}) })] }));
}
