"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LeaveRoom;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftEndOnRectangleIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftEndOnRectangleIcon"));
const next_intl_1 = require("next-intl");
const dropdown_menu_1 = require("../../../../common/components/ui/dropdown-menu.js");
function LeaveRoom({ disabled, onLeave, onSuccess }) {
    const t = (0, next_intl_1.useTranslations)('chat.room');
    const onClick = () => {
        onLeave();
        onSuccess?.();
    };
    return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { className: "cursor-pointer flex items-center gap-3 relative text-critical", onSelect: e => e.preventDefault(), onClick: onClick, disabled: disabled, children: [(0, jsx_runtime_1.jsx)(ArrowLeftEndOnRectangleIcon_1.default, { className: "size-5" }), t('leave')] }));
}
