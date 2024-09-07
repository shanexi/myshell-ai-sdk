"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const Cog8ToothIcon_1 = __importDefault(require("@heroicons/react/24/outline/Cog8ToothIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowLeftIcon"));
const clsx_1 = __importDefault(require("clsx"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const react_use_1 = require("react-use");
const enums_1 = require("../../../../chat/model/enums.js");
const ChatSettingMobilePanel_1 = __importDefault(require("../../../../chat/views/chat-body/ChatSettingMobilePanel.js"));
const useGetChatSetting_1 = __importDefault(require("../../../../chat/views/hooks/useGetChatSetting.js"));
const ImageBotTabs_1 = __importDefault(require("../../../../common/components/ImageBotTabs.js"));
const typography_1 = require("../../../../common/components/ui/typography.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const utils_1 = require("../../../../lib/utils.js");
const store_1 = require("../../../../services/store/index.js");
const BotPin_1 = __importDefault(require("./BotPin.js"));
const ChatSettings_1 = __importDefault(require("../../chat-setting/ChatSettings.js"));
function TopActions({ botId, showBackArrow, showPin = true, botInfo }) {
    const router = (0, navigation_1.useRouter)();
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const t = (0, next_intl_1.useTranslations)('chat');
    const [chatSettingOpen, setChatSettingOpen] = (0, react_2.useState)(false);
    const inputType = (0, store_1.useChatStore)(state => state.inputType);
    const botChatSettingMap = (0, store_1.useBotStore)(state => state.botChatSettingMap);
    const setInputType = (0, store_1.useChatStore)(state => state.setInputType);
    const lastInputType = (0, store_1.useChatStore)(state => state.lastInputType);
    const multiBotMap = (0, store_1.useChatStore)(state => state.multiBotMap);
    const chatList = (0, react_2.useMemo)(() => {
        return multiBotMap[botId]?.chatList ?? [];
    }, [botId, multiBotMap]);
    const botChatSetting = (0, react_2.useMemo)(() => {
        return botChatSettingMap.get(botId) ?? store_1.defaultChatSetting;
    }, [botChatSettingMap, botId]);
    const selectedDeleteChatList = (0, store_1.useChatStore)(state => state.selectedDeleteChatList);
    const { getChatSetting } = (0, useGetChatSetting_1.default)();
    const isImageBot = botInfo?.isImageGenerator;
    const isPanelImageBot = !!botInfo?.isPanelImageBot;
    const allChecked = (0, react_2.useMemo)(() => {
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
    const isShare = inputType === 'share';
    const isDelete = inputType === 'delete';
    const hideTopAction = isShare || isDelete;
    const goBack = () => {
        router.replace('/m/chat');
    };
    const onCancel = () => {
        setInputType(lastInputType);
    };
    const onToggleChatSetting = (0, react_2.useCallback)((state) => {
        setChatSettingOpen(state ?? !chatSettingOpen);
    }, [chatSettingOpen, botId]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('md:relative w-full top-actions-chat z-[40] flex justify-between items-center'), children: [!hideTopAction && showBackArrow && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('absolute top-0 left-0 h-12 z-10 cursor-pointer flex items-center'), children: (0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: "ml-4 w-6 h-6 text-2xl text-primary", onClick: goBack }) })), isMobile && !hideTopAction && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-2 right-3 z-[50] flex space-x-[6px]", children: [showPin && botInfo && ((0, jsx_runtime_1.jsx)("div", { className: "px-3 py-1.5", children: (0, jsx_runtime_1.jsx)(BotPin_1.default, { botInfo: botInfo }) })), (0, jsx_runtime_1.jsx)("button", { title: "chat setting button", children: (0, jsx_runtime_1.jsx)(Cog8ToothIcon_1.default, { className: "w-6 h-6 text-primary cursor-pointer", onClick: () => {
                                        setChatSettingOpen(true);
                                    } }) })] })), isMobile && hideTopAction && ((0, jsx_runtime_1.jsxs)("div", { className: "bg-[#3A383C] flex justify-between items-center h-[48px] px-4", children: [(0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "w-8 h-8 text-[#C9C5CA]", onClick: onCancel }), isDelete && ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-[#C9C5CA]", children: t('delete_selected_messages', {
                                    num: selectedDeleteChatList.length
                                }) })), isDelete && ((0, jsx_runtime_1.jsxs)("span", { className: "text-white text-sm", onClick: () => toggleAllDeleteChat(botId, isPanelImageBot), children: [' ', t('select_all')] }))] })), isImageBot && !hideTopAction && botInfo && botInfo?.status === 'Public' && (0, jsx_runtime_1.jsx)(ImageBotTabs_1.default, { botInfo: botInfo }), inputType === 'delete' && !isMobile && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-3 right-6 h-9 z-20 py-2 px-3 border border-default rounded-full bg-surface-default flex flex-row items-center text-primary", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { color: "brand", children: t('select_all') }), (0, jsx_runtime_1.jsx)(react_1.Checkbox, { className: "circle-checkbox ml-2 text-primary", size: "md", variant: "circular", isChecked: allChecked, onChange: () => toggleAllDeleteChat(botId, isPanelImageBot) })] })), !isMobile && !hideTopAction && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('absolute top-3 right-6 z-[43] bg-surface-default h-9 rounded-full flex items-center border border-default shadow-button-basic', {
                            hidden: hideTopAction
                        }), children: [showPin && botInfo && ((0, jsx_runtime_1.jsx)("div", { className: "px-3 py-1.5", children: (0, jsx_runtime_1.jsx)(BotPin_1.default, { botInfo: botInfo }) })), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('flex justify-center items-center px-3 py-1.5', showPin && botInfo ? 'rounded-r-full border-l border-default' : 'rounded-full', {
                                    'bg-surface-pressed': chatSettingOpen
                                }), children: (0, jsx_runtime_1.jsx)(ChatSettings_1.default, { botInfo: botInfo, chatSetting: botChatSetting, isOpen: chatSettingOpen, toggleIsOpen: onToggleChatSetting }) })] }))] }), isMobile && chatSettingOpen && ((0, jsx_runtime_1.jsx)(ChatSettingMobilePanel_1.default, { selectedBot: botInfo, setOpen: setChatSettingOpen, botChatSetting: botChatSetting }))] }));
}
exports.default = TopActions;
