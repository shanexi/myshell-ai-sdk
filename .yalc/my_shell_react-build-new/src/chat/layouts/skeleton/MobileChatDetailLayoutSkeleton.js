"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MobileChatDetailLayoutSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const EditorSkeleton_1 = __importDefault(require("../../../chat-new/views/editor/skeleton/EditorSkeleton.js"));
const MessageListSkeleton_1 = __importDefault(require("../../../chat-new/views/message-list/skeleton/MessageListSkeleton.js"));
const TopActionsSkeleton_1 = __importDefault(require("../../../components/room-management/views/top-actions/skeleton/TopActionsSkeleton.js"));
function MobileChatDetailLayoutSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col bg-surface-default", children: [(0, jsx_runtime_1.jsx)("div", { className: "shrink-0", children: (0, jsx_runtime_1.jsx)(TopActionsSkeleton_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "grow px-4", children: (0, jsx_runtime_1.jsx)(MessageListSkeleton_1.default, {}) }), (0, jsx_runtime_1.jsx)(EditorSkeleton_1.default, {})] }));
}
