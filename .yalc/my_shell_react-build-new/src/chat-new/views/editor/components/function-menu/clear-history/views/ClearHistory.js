"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClearHistory;
const jsx_runtime_1 = require("react/jsx-runtime");
const TrashIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/TrashIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const MessageContext_1 = require("../../../../../../../chat-new/context/MessageContext");
const dropdown_menu_1 = require("../../../../../../../common/components/ui/dropdown-menu");
const modal_1 = require("../../../../../../../common/components/ui/modal");
const useClearHistory_1 = __importDefault(require("../hooks/useClearHistory"));
function ClearHistory({ type, id, disabled = false, onSuccess }) {
    const { deleteSpecifiedMessageId } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    const [confirming, setConfirming] = (0, react_use_1.useToggle)(false);
    const chatLocale = (0, next_intl_1.useTranslations)('chat');
    const { clearing, clearHistory } = (0, useClearHistory_1.default)(type, id, deleteSpecifiedMessageId);
    const onClick = () => {
        setConfirming(true);
    };
    const confirmHandler = async () => {
        try {
            await clearHistory();
            onSuccess();
        }
        catch (e) {
            console.error(e);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { disabled: disabled, className: "cursor-pointer flex items-center gap-3 relative text-critical", onSelect: e => e.preventDefault(), onClick: onClick, children: [(0, jsx_runtime_1.jsx)(TrashIcon_1.default, { className: "size-5 stroke-critical" }), chatLocale('delete_chat_history')] }), confirming && ((0, jsx_runtime_1.jsx)(modal_1.Modal, { state: "error", isNotification: true, open: confirming, onClose: () => setConfirming(false), onConfirm: confirmHandler, title: chatLocale('delete_confirmation.header'), description: chatLocale('delete_confirmation.delete_all_content', {
                    entity: type
                }), confirmLoading: clearing }))] }));
}
