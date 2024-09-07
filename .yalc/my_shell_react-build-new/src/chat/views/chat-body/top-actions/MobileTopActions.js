"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Cog8ToothIcon_1 = __importDefault(require("@heroicons/react/24/outline/Cog8ToothIcon"));
const EllipsisHorizontalIcon_1 = __importDefault(require("@heroicons/react/24/outline/EllipsisHorizontalIcon"));
const StarIcon_1 = __importDefault(require("@heroicons/react/24/outline/StarIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowLeftIcon"));
const StarIcon_2 = __importDefault(require("@heroicons/react/24/solid/StarIcon"));
const clsx_1 = __importDefault(require("clsx"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const enums_1 = require("../../../../chat/model/enums.js");
const ChatSettingMobilePanel_1 = __importDefault(require("../../../../chat/views/chat-body/ChatSettingMobilePanel.js"));
const useGetChatSetting_1 = __importDefault(require("../../../../chat/views/hooks/useGetChatSetting.js"));
const ImageBotTabs_1 = __importDefault(require("../../../../common/components/ImageBotTabs.js"));
const dropdown_menu_1 = require("../../../../common/components/ui/dropdown-menu.js");
const icon_1 = require("../../../../common/components/ui/icon.js");
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const useChangeBotList_1 = __importDefault(require("../../../../hooks/bot/useChangeBotList.js"));
const store_1 = require("../../../../services/store/index.js");
function MobileTopActions({ botId, showPin = true, botInfo }) {
    const router = (0, navigation_1.useRouter)();
    const t = (0, next_intl_1.useTranslations)();
    const [chatSettingOpen, setChatSettingOpen] = (0, react_1.useState)(false);
    const inputType = (0, store_1.useChatStore)(state => state.inputType);
    const botChatSettingMap = (0, store_1.useBotStore)(state => state.botChatSettingMap);
    const setInputType = (0, store_1.useChatStore)(state => state.setInputType);
    const lastInputType = (0, store_1.useChatStore)(state => state.lastInputType);
    const multiBotMap = (0, store_1.useChatStore)(state => state.multiBotMap);
    const chatList = (0, react_1.useMemo)(() => {
        return multiBotMap[botId]?.chatList ?? [];
    }, [botId, multiBotMap]);
    const botChatSetting = (0, react_1.useMemo)(() => {
        return botChatSettingMap.get(botId) ?? store_1.defaultChatSetting;
    }, [botChatSettingMap, botId]);
    const selectedDeleteChatList = (0, store_1.useChatStore)(state => state.selectedDeleteChatList);
    const { getChatSetting } = (0, useGetChatSetting_1.default)();
    const isImageBot = botInfo?.isImageGenerator;
    const isPanelImageBot = !!botInfo?.isPanelImageBot;
    const allChecked = (0, react_1.useMemo)(() => {
        if (isPanelImageBot) {
            const chatListLen = chatList
                .filter(c => c.status === enums_1.MessageStatusEnum.DONE || c.status === enums_1.MessageStatusEnum.ERROR)
                .filter(chat => chat.type === enums_1.MessageTypeEnum.REPLY ||
                chat.type === enums_1.MessageTypeEnum.VOICE_CALL_REPLY ||
                chat.type === enums_1.MessageTypeEnum.GREETING).length;
            return chatListLen === selectedDeleteChatList.length;
        }
        return (chatList.filter(c => c.status === enums_1.MessageStatusEnum.DONE || c.status === enums_1.MessageStatusEnum.ERROR).length ===
            selectedDeleteChatList.length);
    }, [chatList, selectedDeleteChatList.length]);
    (0, react_use_1.useEffectOnce)(() => {
        getChatSetting(botId);
    });
    const toggleAllDeleteChat = (0, store_1.useChatStore)(state => state.toggleAllDeleteChat);
    const sumUnReadMessageCount = (0, store_1.useBotStore)(state => state.sumUnReadMessageCount);
    const isShare = inputType === 'share';
    const isDelete = inputType === 'delete';
    const isPublish = inputType === 'publish';
    const hideTopAction = isShare || isDelete || isPublish;
    const goBack = () => {
        router.replace('/m/chat');
    };
    const onCancel = () => {
        setInputType(lastInputType);
    };
    const { pinActing, setBotPinned } = (0, useChangeBotList_1.default)(botInfo);
    const onToggleChatSetting = (0, react_1.useCallback)((state) => {
        setChatSettingOpen(state ?? !chatSettingOpen);
    }, [chatSettingOpen, botId]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('mobile-top-actions-chat z-[40] h-[56px] px-4 py-[10px] flex items-center justify-between', hideTopAction && isDelete && 'bg-[#3A383C]'), children: [!hideTopAction && ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: goBack, icon: ArrowLeftIcon_1.default, size: "md", variant: "ghost", color: "brand" }), sumUnReadMessageCount ? ((0, jsx_runtime_1.jsx)("p", { className: "w-6 h-6 flex justify-center items-center rounded-full bg-surface-accent-gray-subtlest", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", color: "default", children: sumUnReadMessageCount }) })) : null] })), !hideTopAction && ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, className: "data-[state=open]:bg-surface-hovered", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: EllipsisHorizontalIcon_1.default, size: "md", variant: "ghost", className: "text-brand" }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { side: "bottom", align: "end", children: [showPin && botInfo && ((0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-start items-center space-x-1.5", onClick: () => {
                                                if (pinActing)
                                                    return;
                                                setBotPinned(!(botInfo && botInfo.pinned));
                                            }, children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: botInfo?.pinned ? StarIcon_2.default : StarIcon_1.default, size: "xl", className: botInfo?.pinned ? '!text-[#FAAC00]' : 'text-icon' }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", children: t('workshop.favorite') })] }) })), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-start items-center space-x-1.5", onClick: () => {
                                                setChatSettingOpen(true);
                                            }, children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: Cog8ToothIcon_1.default, size: "xl", color: "default" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", children: t('chat.chat_setting.title') })] }) })] })] })), hideTopAction && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { size: "md", icon: XMarkIcon_1.default, variant: "ghost", color: "brand", onClick: onCancel }), isDelete && ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-[rgb(201,197,202)]", children: t('chat.delete_selected_messages', {
                                    num: selectedDeleteChatList.length
                                }) })), isDelete && ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-white", onClick: () => toggleAllDeleteChat(botId, isPanelImageBot), children: t('chat.select_all') }))] }))] }), !hideTopAction && isImageBot && botInfo && botInfo.status === 'Public' && (0, jsx_runtime_1.jsx)(ImageBotTabs_1.default, { botInfo: botInfo }), chatSettingOpen && ((0, jsx_runtime_1.jsx)(ChatSettingMobilePanel_1.default, { selectedBot: botInfo, setOpen: setChatSettingOpen, botChatSetting: botChatSetting }))] }));
}
exports.default = MobileTopActions;
