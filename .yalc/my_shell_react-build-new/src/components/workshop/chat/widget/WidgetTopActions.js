"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowLeftIcon"));
const clsx_1 = __importDefault(require("clsx"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const enums_1 = require("../../../../chat/model/enums.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const store_1 = require("../../../../services/store/index.js");
const WidgetPinned_1 = __importDefault(require("../../WidgetPinned.js"));
function WidgetTopActions({ widgetInfo, showBackArrow }) {
    const router = (0, navigation_1.useRouter)();
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const t = (0, next_intl_1.useTranslations)('chat');
    const widgetStateMap = (0, store_1.useWorkshopStore)(state => state.widgetStateMap);
    const selectedWidgetDeleteChatList = (0, store_1.useWorkshopStore)(state => state.selectedWidgetDeleteChatList);
    const widgetInputType = (0, store_1.useWorkshopStore)(state => state.widgetInputType);
    const widgetChatList = (0, react_2.useMemo)(() => {
        return widgetStateMap[widgetInfo?.id ?? '']?.chatList ?? [];
    }, [widgetStateMap, widgetInfo?.id]);
    const isPanelImageBot = widgetInfo?.chatPanelType === 'BOT_CHAT_PANEL_TYPE_COMPONENT';
    const toggleWidgetAllDeleteChat = (0, store_1.useWorkshopStore)(state => state.toggleWidgetAllDeleteChat);
    const isShare = widgetInputType === 'share';
    const isDelete = widgetInputType === 'delete';
    const goBack = () => {
        router.push('/robot-workshop');
    };
    const allChecked = (0, react_2.useMemo)(() => {
        if (isPanelImageBot) {
            const chatListLen = widgetChatList
                .filter(c => c.status === enums_1.MessageStatusEnum.DONE || c.status === enums_1.MessageStatusEnum.ERROR)
                .filter(chat => chat.type === enums_1.MessageTypeEnum.REPLY ||
                chat.type === enums_1.MessageTypeEnum.VOICE_CALL_REPLY ||
                chat.type === enums_1.MessageTypeEnum.GREETING).length;
            return chatListLen === selectedWidgetDeleteChatList.length;
        }
        return (widgetChatList.filter(c => c.status === enums_1.MessageStatusEnum.DONE || c.status === enums_1.MessageStatusEnum.ERROR).length ===
            selectedWidgetDeleteChatList.length);
    }, [widgetChatList, selectedWidgetDeleteChatList.length]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "widget-top-actions z-[40]", children: [showBackArrow && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('absolute top-0 left-0 h-12 z-10 cursor-pointer flex items-center'), children: (0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: (0, clsx_1.default)('ml-4 w-8 h-8 text-2xl', 'text-primary'), onClick: goBack }) })), widgetInputType === 'delete' && !isMobile && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-[11px] right-[84px] z-20 py-2 px-3 border border-default rounded-full bg-surface flex flex-row items-cneter text-primary", children: [t('select_all'), (0, jsx_runtime_1.jsx)(react_1.Checkbox, { className: "circle-checkbox ml-2 text-primary", size: "lg", variant: "circular", isChecked: allChecked, onChange: () => toggleWidgetAllDeleteChat(widgetInfo?.id ?? '', isPanelImageBot) })] })), widgetInputType !== 'delete' && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-6 right-8 z-[43] rounded-xl bg-surface flex items-center border border-default shadow-[0_1px_2px_0_#0000001A]", children: (0, jsx_runtime_1.jsx)(WidgetPinned_1.default, { widgetInfo: widgetInfo, className: "flex justify-center items-center p-1.5 cursor-pointer" }) }))] }));
}
exports.default = WidgetTopActions;
