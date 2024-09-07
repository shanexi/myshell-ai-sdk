"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyBotTopActions;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowLeftIcon"));
const clsx_1 = __importDefault(require("clsx"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const enums_1 = require("../../../../chat/model/enums.js");
const ChatSettings_1 = __importDefault(require("../../../../chat/views/chat-setting/ChatSettings.js"));
const useGetChatSetting_1 = __importDefault(require("../../../../chat/views/hooks/useGetChatSetting.js"));
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const store_1 = require("../../../../services/store/index.js");
function MyBotTopActions({ botInfo, showBackArrow }) {
    const botId = botInfo.id;
    const multiBotMap = (0, store_1.useChatStore)(state => state.multiBotMap);
    const router = (0, navigation_1.useRouter)();
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const t = (0, next_intl_1.useTranslations)('chat');
    const [chatSettingOpen, setChatSettingOpen] = (0, react_2.useState)(false);
    const inputType = (0, store_1.useChatStore)(state => state.inputType);
    const botChatSettingMap = (0, store_1.useBotStore)(state => state.botChatSettingMap);
    const setInputType = (0, store_1.useChatStore)(state => state.setInputType);
    const lastInputType = (0, store_1.useChatStore)(state => state.lastInputType);
    const selectedDeleteChatList = (0, store_1.useChatStore)(state => state.selectedDeleteChatList);
    const chatList = (0, react_2.useMemo)(() => {
        return multiBotMap[botId]?.chatList ?? [];
    }, [botId, multiBotMap]);
    const botChatSetting = (0, react_2.useMemo)(() => {
        return botChatSettingMap.get(botId) ?? store_1.defaultChatSetting;
    }, [botChatSettingMap, botId]);
    const { getChatSetting } = (0, useGetChatSetting_1.default)();
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
    (0, react_2.useEffect)(() => {
        if (!botChatSettingMap.has(botId)) {
            getChatSetting(botId);
        }
    }, [botId]);
    const toggleAllDeleteChat = (0, store_1.useChatStore)(state => state.toggleAllDeleteChat);
    const isShare = inputType === 'share';
    const isDelete = inputType === 'delete';
    const hideTopAction = isShare || isDelete;
    const goBack = () => {
        router.push('/robot-workshop');
    };
    const onCancel = () => {
        setInputType(lastInputType);
    };
    const onToggleChatSetting = (0, react_2.useCallback)((state) => {
        setChatSettingOpen(state ?? !chatSettingOpen);
    }, [chatSettingOpen]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "top-actions-workshop z-[40]", children: [!hideTopAction && showBackArrow && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('absolute top-1 left-0  h-12 z-10 cursor-pointer flex items-center'), children: (0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: (0, clsx_1.default)('ml-4 w-8 h-8  text-2xl', 'text-primary'), onClick: goBack }) })), isMobile && hideTopAction && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-0 left-0 w-full bg-[#3A383C] flex justify-between items-center h-[48px] px-4", children: [(0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "w-8 h-8 text-[#C9C5CA]", onClick: onCancel }), isDelete && ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-[#C9C5CA]", children: t('delete_selected_messages', {
                            num: selectedDeleteChatList.length
                        }) })), isDelete && ((0, jsx_runtime_1.jsxs)("span", { className: "text-white text-sm", onClick: () => toggleAllDeleteChat(String(botInfo?.id), isPanelImageBot), children: [' ', t('select_all')] }))] })), inputType === 'delete' && !isMobile && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-[11px] right-[84px] z-20 py-2 px-3 border border-default rounded-full bg-surface flex flex-row items-cneter text-primary", children: [t('select_all'), (0, jsx_runtime_1.jsx)(react_1.Checkbox, { className: "circle-checkbox ml-2 text-primary", size: "lg", variant: "circular", isChecked: allChecked, onChange: () => toggleAllDeleteChat(String(botInfo?.id), isPanelImageBot) })] })), !isMobile && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('absolute top-6 right-6 z-[43] rounded-xl bg-surface flex items-center border border-default shadow-[0_1px_2px_0_#0000001A]', hideTopAction && 'hidden'), children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('flex justify-center items-center p-1.5 rounded-xl', {
                        'bg-secondary-container': chatSettingOpen
                    }), children: (0, jsx_runtime_1.jsx)(ChatSettings_1.default, { botInfo: botInfo, chatSetting: botChatSetting, isOpen: chatSettingOpen, toggleIsOpen: onToggleChatSetting }) }) }))] }));
}
