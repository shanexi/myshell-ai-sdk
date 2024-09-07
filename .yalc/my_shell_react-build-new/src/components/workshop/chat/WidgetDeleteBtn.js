"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WidgetDeleteBtn;
const jsx_runtime_1 = require("react/jsx-runtime");
const TrashIcon_1 = __importDefault(require("@heroicons/react/24/outline/TrashIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const ActionConfirmationModal_1 = __importDefault(require("../../../common/components/ActionConfirmationModal.js"));
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const useWidgetDeleteChatHistory_1 = __importDefault(require("../../../hooks/workshop/chat/useWidgetDeleteChatHistory.js"));
const store_1 = require("../../../services/store/index.js");
function WidgetDeleteBtn() {
    const workshopT = (0, next_intl_1.useTranslations)('workshop');
    const t = (0, next_intl_1.useTranslations)('chat');
    const commonT = (0, next_intl_1.useTranslations)('common');
    const selectedWidgetDeleteChatList = (0, store_1.useWorkshopStore)(state => state.selectedWidgetDeleteChatList);
    const setWidgetInputType = (0, store_1.useWorkshopStore)(state => state.setWidgetInputType);
    const lastWidgetInputType = (0, store_1.useWorkshopStore)(state => state.lastWidgetInputType);
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const { deleting, deleteSelectedWidgetHistory } = (0, useWidgetDeleteChatHistory_1.default)();
    const [popupConfirmVisible, setPopupConfirmVisible] = (0, react_1.useState)(false);
    const deleteSuccessCb = (0, react_1.useCallback)(() => {
        setPopupConfirmVisible(false);
        setWidgetInputType(lastWidgetInputType);
    }, [lastWidgetInputType, setWidgetInputType]);
    const confirmHandler = (0, react_1.useCallback)(() => {
        deleteSelectedWidgetHistory(deleteSuccessCb);
    }, [deleteSelectedWidgetHistory, deleteSuccessCb]);
    const handleDelete = () => {
        if (!selectedWidgetDeleteChatList.length) {
            return;
        }
        setPopupConfirmVisible(true);
    };
    const handleBackToPreviousInputType = () => {
        setWidgetInputType(lastWidgetInputType);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative chat-share bg-surface w-full flex justify-center items-center flex-col', isMobile ? ' h-[100px]' : 'h-[159px]'), children: [!isMobile && ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface-variant", children: t('delete_selected_messages', {
                            num: selectedWidgetDeleteChatList.length
                        }) })), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center w-[40px] h-[40px] border border-default rounded-xl mt-3 cursor-pointer", onClick: handleDelete, children: (0, jsx_runtime_1.jsx)(TrashIcon_1.default, { className: "w-6 h-6 text-error " }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-error mt-2", children: commonT('delete') })] }), !isMobile && ((0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "absolute top-4 right-4 z-10 w-6 h-6 text-gray-500 cursor-pointer", onClick: () => handleBackToPreviousInputType() })), popupConfirmVisible && ((0, jsx_runtime_1.jsx)(ActionConfirmationModal_1.default, { isOpen: popupConfirmVisible, onClose: () => setPopupConfirmVisible(false), onConfirm: confirmHandler, title: workshopT('delete_widget_chat_title'), content: workshopT('delete_widget_chat_part_content', {
                    num: selectedWidgetDeleteChatList.length
                }), acting: deleting }))] }));
}
