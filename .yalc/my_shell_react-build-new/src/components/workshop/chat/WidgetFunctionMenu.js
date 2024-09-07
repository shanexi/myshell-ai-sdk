"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WidgetFunctionMenu;
const jsx_runtime_1 = require("react/jsx-runtime");
const Bars3Icon_1 = __importDefault(require("@heroicons/react/24/outline/Bars3Icon"));
const TrashIcon_1 = __importDefault(require("@heroicons/react/24/outline/TrashIcon"));
const XCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/XCircleIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const useMedia_1 = __importDefault(require("react-use/lib/useMedia"));
const ActionConfirmationModal_1 = __importDefault(require("../../../common/components/ActionConfirmationModal.js"));
const SvgIcon_1 = __importDefault(require("../../../common/components/SvgIcon.js"));
const dropdown_menu_1 = require("../../../common/components/ui/dropdown-menu.js");
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const typography_1 = require("../../../common/components/ui/typography.js");
const useWidgetChangeList_1 = __importDefault(require("../../../hooks/workshop/chat/useWidgetChangeList.js"));
const useWidgetClearMemory_1 = __importDefault(require("../../../hooks/workshop/chat/useWidgetClearMemory.js"));
const useWidgetDeleteChatHistory_1 = __importDefault(require("../../../hooks/workshop/chat/useWidgetDeleteChatHistory.js"));
const store_1 = require("../../../services/store/index.js");
function WidgetFunctionMenu({ widgetInfo }) {
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const { removeBot } = (0, useWidgetChangeList_1.default)(widgetInfo);
    const { deleting, deleteAll } = (0, useWidgetDeleteChatHistory_1.default)();
    const t = (0, next_intl_1.useTranslations)('chat');
    const workshopT = (0, next_intl_1.useTranslations)('workshop');
    const [showMenu, setShowMenu] = (0, react_1.useState)(false);
    const clearWidgetMemory = (0, useWidgetClearMemory_1.default)(widgetInfo);
    const [popupConfirmVisible, setPopupConfirmVisible] = (0, react_1.useState)(false);
    const deleteSuccessCb = () => {
        setPopupConfirmVisible(false);
    };
    const confirmHandler = (0, react_1.useCallback)(() => {
        widgetInfo?.id && deleteAll(widgetInfo.id, deleteSuccessCb);
    }, [deleteAll, widgetInfo?.id]);
    const isDesktop = (0, useMedia_1.default)('(min-width: 768px)');
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { open: showMenu, children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", size: "md", icon: showMenu ? XMarkIcon_1.default : Bars3Icon_1.default, onClick: () => {
                                setShowMenu(!showMenu);
                            }, className: "text-brand data-[state=open]:bg-surface-hovered" }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuContent, { className: "w-[calc(100vw-32px)] md:w-fit", side: "top", align: "start", sideOffset: isDesktop ? 8 : 56, collisionPadding: { left: 16, right: 16 }, onInteractOutside: () => {
                            setShowMenu(false);
                        }, onCloseAutoFocus: e => e.preventDefault(), children: (0, jsx_runtime_1.jsxs)("div", { className: "w-[calc(100vw-32px)] md:w-fit space-y-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "rounded-lg px-2 py-1 cursor-pointer hover:bg-surface-container-selected-default text-critical flex justify-start", onClick: () => {
                                        setShowMenu(false);
                                        removeBot();
                                    }, children: [(0, jsx_runtime_1.jsx)(XCircleIcon_1.default, { className: "mr-2 w-5" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", children: t('remove_from_list') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-lg px-2 py-1 cursor-pointer hover:bg-surface-container-selected-default text-critical flex justify-start", onClick: () => {
                                        setShowMenu(false);
                                        clearWidgetMemory();
                                    }, children: [(0, jsx_runtime_1.jsx)(SvgIcon_1.default, { src: "/icons/brush.svg", className: "mr-2 w-[20px] h-[20px] bg-on-surface-variant" }), ' ', (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", children: t('clear_memory') })] }), isVisitor === 2 && ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-lg px-2 py-1 cursor-pointer hover:bg-surface-container-selected-default text-critical flex justify-start", onClick: () => {
                                        setShowMenu(false);
                                        setPopupConfirmVisible(true);
                                    }, children: [(0, jsx_runtime_1.jsx)(TrashIcon_1.default, { className: "mr-2 w-5 stroke-critical" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", color: "critical", children: t('delete_chat_history') })] }))] }) })] }), popupConfirmVisible && ((0, jsx_runtime_1.jsx)(ActionConfirmationModal_1.default, { isOpen: popupConfirmVisible, onClose: () => setPopupConfirmVisible(false), onConfirm: confirmHandler, title: workshopT('delete_widget_chat_title'), content: workshopT('delete_widget_chat_all_content'), acting: deleting }))] }));
}
