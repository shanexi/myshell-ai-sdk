"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowUpOnSquareIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowUpOnSquareIcon"));
const Bars3Icon_1 = __importDefault(require("@heroicons/react/24/outline/Bars3Icon"));
const TrashIcon_1 = __importDefault(require("@heroicons/react/24/outline/TrashIcon"));
const XCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/XCircleIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const useMedia_1 = __importDefault(require("react-use/lib/useMedia"));
const useDeleteChatHistory_1 = __importDefault(require("../../../../chat/views/hooks/useDeleteChatHistory.js"));
const ActionConfirmationModal_1 = __importDefault(require("../../../../common/components/ActionConfirmationModal.js"));
const SvgIcon_1 = __importDefault(require("../../../../common/components/SvgIcon.js"));
const dropdown_menu_1 = require("../../../../common/components/ui/dropdown-menu.js");
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const typography_1 = require("../../../../common/components/ui/typography.js");
const useChangeBotList_1 = __importDefault(require("../../../../hooks/bot/useChangeBotList.js"));
const useClearMemory_1 = __importDefault(require("../../../../hooks/bot/useClearMemory.js"));
const store_1 = require("../../../../services/store/index.js");
function FunctionMenu({ isWorkshop, botInfo }) {
    const setInputType = (0, store_1.useChatStore)(state => state.setInputType);
    const clearChatID = (0, store_1.useChatStore)(state => state.clearChatID);
    const myBotList = (0, store_1.useWorkshopStore)(state => state.sidebarMyBotList || []);
    const toolboxList = (0, store_1.useWorkshopStore)(state => state.sidebarToolboxList || []);
    const { botId, toolboxId } = (0, navigation_1.useParams)();
    const myBotInfo = (0, react_1.useMemo)(() => {
        return [...myBotList, ...toolboxList].find(bot => bot.id === botId || bot.id === toolboxId);
    }, [myBotList, toolboxList, botId, toolboxId]);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const { removing, removeBot } = (0, useChangeBotList_1.default)(botInfo);
    const clearMemory = (0, useClearMemory_1.default)(myBotInfo ?? botInfo);
    const { deleting, deleteAll } = (0, useDeleteChatHistory_1.default)();
    const t = (0, next_intl_1.useTranslations)('chat');
    const [popupConfirmVisible, setPopupConfirmVisible] = (0, react_1.useState)(false);
    const [showMenu, setShowMenu] = (0, react_1.useState)(false);
    const deleteSuccessCb = () => {
        setPopupConfirmVisible(false);
    };
    const confirmHandler = (0, react_1.useCallback)(() => {
        deleteAll((myBotInfo || botInfo), deleteSuccessCb);
    }, [deleteAll, myBotInfo, botInfo]);
    const isDesktop = (0, useMedia_1.default)('(min-width: 768px)');
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { open: showMenu, children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", size: "md", icon: showMenu ? XMarkIcon_1.default : Bars3Icon_1.default, onClick: () => {
                                setShowMenu(!showMenu);
                            }, className: "text-brand data-[state=open]:bg-surface-hovered" }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { className: "w-[calc(100vw-32px)] md:w-fit space-y-1", side: "top", align: "start", sideOffset: isDesktop ? 8 : 56, collisionPadding: { left: 16, right: 16 }, onInteractOutside: () => {
                            setShowMenu(false);
                        }, onCloseAutoFocus: e => e.preventDefault(), children: [botInfo && botInfo.author.id !== '0' && !isWorkshop && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('rounded-lg px-2 py-1 text-sm cursor-pointer hover:bg-surface-container-selected-default text-default flex justify-start items-center', removing && 'opacity-30 cursor-not-allowed justify-center'), onClick: () => {
                                    removeBot();
                                    setShowMenu(false);
                                }, children: removing ? ((0, jsx_runtime_1.jsx)(spinner_1.default, { size: "md" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(XCircleIcon_1.default, { className: "mr-2 w-5 stroke-icon" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", children: t('remove_from_list') })] })) })), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-lg py-1 px-2 cursor-pointer hover:bg-surface-container-selected-default text-default flex justify-start", onClick: () => {
                                    setInputType('share');
                                    clearChatID();
                                }, children: [(0, jsx_runtime_1.jsx)(ArrowUpOnSquareIcon_1.default, { className: "mr-2 w-5 stroke-icon text-default " }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", children: t('share_chat_records') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-lg px-2 py-1 cursor-pointer hover:bg-surface-container-selected-default text-default text-sm flex justify-start", onClick: () => {
                                    setShowMenu(false);
                                    clearMemory();
                                }, children: [(0, jsx_runtime_1.jsx)(SvgIcon_1.default, { src: "/icons/brush.svg", className: "mr-2 w-5 h-5 bg-icon" }), " ", t('clear_memory')] }), isVisitor === 2 && ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-lg px-2 py-1 cursor-pointer hover:bg-surface-container-selected-default text-critical flex justify-start", onClick: () => {
                                    setPopupConfirmVisible(true);
                                    setShowMenu(false);
                                }, children: [(0, jsx_runtime_1.jsx)(TrashIcon_1.default, { className: "mr-2 w-5 stroke-critical" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", color: "critical", children: t('delete_chat_history') })] }))] })] }), popupConfirmVisible && ((0, jsx_runtime_1.jsx)(ActionConfirmationModal_1.default, { isOpen: popupConfirmVisible, onClose: () => setPopupConfirmVisible(false), onConfirm: confirmHandler, title: t('delete_confirmation.header'), content: t('delete_confirmation.delete_all_content', {
                    entity: 'bot'
                }), acting: deleting }))] }));
}
exports.default = FunctionMenu;
