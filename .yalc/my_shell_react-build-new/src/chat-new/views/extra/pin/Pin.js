"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pin;
const jsx_runtime_1 = require("react/jsx-runtime");
const StarIcon_1 = __importDefault(require("@heroicons/react/24/outline/StarIcon"));
const StarIcon_2 = __importDefault(require("@heroicons/react/24/solid/StarIcon"));
const react_1 = require("react");
const StaticContext_1 = require("../../../../chat-new/context/StaticContext.js");
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const usePin_1 = __importDefault(require("./hooks/usePin.js"));
function Pin() {
    const { type, entityInfo, getList, partialUpdateDetail } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { id, pinned } = entityInfo;
    const { acting, togglePinStatus } = (0, usePin_1.default)(type, id, getList, pinned, partialUpdateDetail);
    return ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { size: "md", variant: "ghost", loading: acting, onClick: togglePinStatus, className: "rounded-none", children: pinned ? (0, jsx_runtime_1.jsx)(StarIcon_2.default, { className: "w-6 h-6 text-warning" }) : (0, jsx_runtime_1.jsx)(StarIcon_1.default, { className: "w-6 h-6 text-brand" }) }));
}
