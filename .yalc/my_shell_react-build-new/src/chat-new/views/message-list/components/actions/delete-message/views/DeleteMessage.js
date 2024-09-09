"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DeleteMessage;
const jsx_runtime_1 = require("react/jsx-runtime");
const TrashIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/TrashIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const MessageContext_1 = require("../../../../../../../chat-new/context/MessageContext");
const StaticContext_1 = require("../../../../../../../chat-new/context/StaticContext");
const display_provider_1 = require("../../../../../../../chat-new/views/message-list/components/display-provider");
const context_menu_1 = require("../../../../../../../common/components/ui/context-menu");
const icon_button_1 = require("../../../../../../../common/components/ui/icon-button");
const modal_1 = require("../../../../../../../common/components/ui/modal");
const typography_1 = require("../../../../../../../common/components/ui/typography");
const useDeleteMessage_1 = __importDefault(require("../hooks/useDeleteMessage"));
function DeleteMessage(props) {
    const [confirming, setConfirming] = (0, react_use_1.useToggle)(false);
    const { source } = props;
    const chatLocale = (0, next_intl_1.useTranslations)('chat');
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { type, entityInfo } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { id } = entityInfo;
    const { deleteSpecifiedMessageId } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    const { message } = (0, display_provider_1.useDisplayContext)();
    const { deleting, deleteMessage } = (0, useDeleteMessage_1.default)(type, id, deleteSpecifiedMessageId);
    const onDeleteMessage = () => {
        setConfirming(true);
    };
    const confirmHandler = async () => {
        try {
            await deleteMessage(message.id);
        }
        catch (e) {
            console.error(e);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [source === 'menubar' ? ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "outline", size: "sm", color: "default", className: "rounded-lg", onClick: onDeleteMessage, children: (0, jsx_runtime_1.jsx)(TrashIcon_1.default, { className: "size-[18px] text-error" }) })) : ((0, jsx_runtime_1.jsxs)(context_menu_1.ContextMenuItem, { onClick: onDeleteMessage, children: [(0, jsx_runtime_1.jsx)(TrashIcon_1.default, { className: "size-5 text-error" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "ml-2 text-error", children: commonT('delete') })] })), confirming && ((0, jsx_runtime_1.jsx)(modal_1.Modal, { state: "warning", isNotification: true, open: confirming, onClose: () => setConfirming(false), onConfirm: confirmHandler, title: chatLocale('delete_confirmation.header'), description: chatLocale('delete_confirmation.delete_part_content', {
                    num: 1,
                    entity: type
                }), confirmLoading: deleting }))] }));
}
