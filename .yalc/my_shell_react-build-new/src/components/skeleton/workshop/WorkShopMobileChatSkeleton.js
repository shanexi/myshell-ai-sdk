"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkShopMobileChatSkeleton;
const jsx_runtime_1 = require("react/jsx-runtime");
const WorkShopChatSkeleton_1 = __importDefault(require("../../../components/skeleton/workshop/WorkShopChatSkeleton.js"));
function WorkShopMobileChatSkeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "grow overflow-y-auto", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full", children: (0, jsx_runtime_1.jsx)(WorkShopChatSkeleton_1.default, { isMobile: true }) }) }));
}
