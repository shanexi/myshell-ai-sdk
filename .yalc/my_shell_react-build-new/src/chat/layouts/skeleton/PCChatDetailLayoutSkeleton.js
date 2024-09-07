"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PCChatDetailLayoutSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const ChatModuleSkeleton_1 = __importDefault(require("../../../chat-new/views/skeleton/ChatModuleSkeleton.js"));
const DetailSkeleton_1 = __importDefault(require("../../../components/chat/entity-detail/views/skeleton/DetailSkeleton.js"));
function PCChatDetailLayoutSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full overflow-hidden bg-surface-container-default rounded-3xl flex flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-[calc(100%-108px)] w-full rounded-3xl bg-surface-default shrink-0 flex flex-col", children: (0, jsx_runtime_1.jsx)(ChatModuleSkeleton_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 grow flex items-center p-6 w-full rounded-3xl bg-surface-default", children: (0, jsx_runtime_1.jsx)(DetailSkeleton_1.default, {}) })] }));
}
