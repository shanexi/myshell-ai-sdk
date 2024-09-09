"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MobileEntityInfo;
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/ChevronUpIcon"));
const react_1 = require("react");
const StaticContext_1 = require("../../../chat-new/context/StaticContext");
const avatar_1 = require("../../../common/components/ui/avatar");
function MobileEntityInfo({ showMobileDetail }) {
    const { entityInfo } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { name, logoUrl } = entityInfo;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[6px]", onClick: () => showMobileDetail?.(), children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: logoUrl, size: "md", className: "shrink-0" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1 items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-1 break-all", children: name }), (0, jsx_runtime_1.jsx)(ChevronUpIcon_1.default, { className: "size-[18px] text-brand" })] })] }));
}
