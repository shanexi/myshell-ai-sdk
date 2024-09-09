"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RemoveFromList;
const jsx_runtime_1 = require("react/jsx-runtime");
const XCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/XCircleIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const StaticContext_1 = require("../../../../../../../chat-new/context/StaticContext.js");
const dropdown_menu_1 = require("../../../../../../../common/components/ui/dropdown-menu.js");
const spinner_1 = __importDefault(require("../../../../../../../common/components/ui/spinner.js"));
const useRemoveFromList_1 = __importDefault(require("../hooks/useRemoveFromList.js"));
function RemoveFromList({ type, id, disabled = false, onSuccess }) {
    const { getList } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const chatLocale = (0, next_intl_1.useTranslations)('chat');
    const { removing, remove } = (0, useRemoveFromList_1.default)(type, id, getList);
    const onClick = async () => {
        try {
            await remove();
            onSuccess();
        }
        catch (e) {
            console.error(e);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { disabled: disabled || removing, className: "cursor-pointer flex items-center gap-3 relative", onSelect: e => e.preventDefault(), onClick: onClick, children: [removing ? (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm" }) : (0, jsx_runtime_1.jsx)(XCircleIcon_1.default, { className: "size-5" }), chatLocale('remove_from_list')] }));
}
