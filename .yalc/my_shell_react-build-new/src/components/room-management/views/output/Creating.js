"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Creating;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ChatStaticContext_1 = __importDefault(require("../../../../chat/ChatStaticContext.js"));
const LoadingIcon_1 = __importDefault(require("../../../../common/components/icons/LoadingIcon.js"));
const avatar_1 = require("../../../../common/components/ui/avatar.js");
const CreateSlashMessage_1 = __importDefault(require("./CreateSlashMessage.js"));
function Creating() {
    const { logoUrl } = (0, react_1.useContext)(ChatStaticContext_1.default);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-5 md:gap-6", children: [(0, jsx_runtime_1.jsx)(CreateSlashMessage_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex gap-[6px] items-start", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: logoUrl, size: "md" }), (0, jsx_runtime_1.jsx)("p", { className: "min-h-11 p-3 bg-surface-special rounded-2xl rounded-tl-sm w-fit", children: (0, jsx_runtime_1.jsx)(LoadingIcon_1.default, {}) })] })] }));
}
