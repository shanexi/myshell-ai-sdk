"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatDelete;
const jsx_runtime_1 = require("react/jsx-runtime");
const TrashIcon_1 = __importDefault(require("@heroicons/react/24/outline/TrashIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const useDeleteChatHistory_1 = __importDefault(require("../../../chat/views/hooks/useDeleteChatHistory.js"));
const ActionConfirmationModal_1 = __importDefault(require("../../../common/components/ActionConfirmationModal.js"));
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const store_1 = require("../../../services/store/index.js");
function ChatDelete() {
    const t = (0, next_intl_1.useTranslations)('chat');
    const tCommon = (0, next_intl_1.useTranslations)('common');
    const selectedDeleteChatList = (0, store_1.useChatStore)(state => state.selectedDeleteChatList);
    const setInputType = (0, store_1.useChatStore)(state => state.setInputType);
    const lastInputType = (0, store_1.useChatStore)(state => state.lastInputType);
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const { deleting, deleteSelectedChatHistory } = (0, useDeleteChatHistory_1.default)();
    const [popupConfirmVisible, setPopupConfirmVisible] = (0, react_1.useState)(false);
    const deleteSuccessCb = (0, react_1.useCallback)(() => {
        setPopupConfirmVisible(false);
        setInputType(lastInputType);
    }, [lastInputType, setInputType]);
    const confirmHandler = (0, react_1.useCallback)(() => {
        deleteSelectedChatHistory(deleteSuccessCb);
    }, [deleteSelectedChatHistory, deleteSuccessCb]);
    const handleDelete = () => {
        if (!selectedDeleteChatList.length) {
            return;
        }
        setPopupConfirmVisible(true);
    };
    const handleBackToPreviousInputType = () => {
        setInputType(lastInputType);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative chat-share bg-surface w-full flex justify-center items-center flex-col', isMobile ? ' h-[100px]' : 'h-[159px]'), children: [!isMobile && ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface-variant", children: t('delete_selected_messages', {
                            num: selectedDeleteChatList.length
                        }) })), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center w-[40px] h-[40px] border border-default rounded-xl mt-3 cursor-pointer", onClick: handleDelete, children: (0, jsx_runtime_1.jsx)(TrashIcon_1.default, { className: "w-6 h-6 text-error " }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-error mt-2", children: tCommon('delete') })] }), !isMobile && ((0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "absolute top-4 right-4 z-10 w-6 h-6 text-gray-500 cursor-pointer", onClick: () => handleBackToPreviousInputType() })), popupConfirmVisible && ((0, jsx_runtime_1.jsx)(ActionConfirmationModal_1.default, { isOpen: popupConfirmVisible, onClose: () => setPopupConfirmVisible(false), onConfirm: confirmHandler, title: t('delete_confirmation.header'), content: t('delete_confirmation.delete_part_content', {
                    num: selectedDeleteChatList.length,
                    entity: 'bot'
                }), acting: deleting }))] }));
}
