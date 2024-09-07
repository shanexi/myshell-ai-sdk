"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ListItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const CheckBadgeIcon_1 = __importDefault(require("@heroicons/react/24/solid/CheckBadgeIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dayjs_1 = __importDefault(require("dayjs"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const mainnet_svg_1 = __importDefault(require("@/common/assets/icons/mainnet.svg"));
const testnet_svg_1 = __importDefault(require("@/common/assets/icons/testnet.svg"));
const avatar_1 = require("../../../../common/components/ui/avatar.js");
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const WidgetDesc_1 = __importDefault(require("../../../../components/chat/entity-detail/views/widget/WidgetDesc.js"));
const store_1 = require("../../../../services/store/index.js");
function ListItem({ botInfo, selectedType, selectedId }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const botLastMessageMap = (0, store_1.useBotStore)(state => state.botLastMessageMap);
    const draftBotIds = (0, store_1.useWorkshopStore)(state => state.draftBotIds);
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const isDraft = draftBotIds.has(botInfo?.id);
    const botLastMessage = (0, react_1.useMemo)(() => {
        return botLastMessageMap.get(botInfo.id);
    }, [botInfo.id, botLastMessageMap]);
    const isSelected = (0, react_1.useMemo)(() => {
        return selectedType === 'bot' && selectedId === botInfo.id;
    }, [botInfo.id, selectedId, selectedType]);
    return ((0, jsx_runtime_1.jsxs)("div", { id: `bot-${botInfo.id}`, className: (0, clsx_1.default)('w-full rounded-xl overflow-hidden p-3 flex space-x-2 items-center text-default', isSelected ? 'bg-surface-accent-blue-subtler' : 'bg-transparent hover:bg-surface-container-hovered'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-fit shrink-0 relative", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: isMobile ? '2xl' : 'xl', src: botInfo.logoUrl
                            ? (0, common_helper_1.getAssetsUrlV2)(botInfo.logoUrl)
                            : 'https://image.myshell.ai/image/bot/logo/20240106/default.png', alt: "bot avatar" }), !botInfo.isOfficalAssistantBot ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: botInfo?.botSetting?.publishBot ? ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('mainnet'), side: "top", triggerClassName: "border-[1px] border-white bg-white absolute right-0 bottom-0 w-[12px] h-[12px] rounded-full block", children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "share", src: mainnet_svg_1.default, width: 10 }) })) : ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('testnet'), side: "top", triggerClassName: "border-[1px] border-white absolute bg-white right-0 bottom-0 w-[12px] h-[12px] rounded-full", children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "share", src: testnet_svg_1.default, width: 10 }) })) })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col grow overflow-hidden space-y-1 md:space-y-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-[86%] flex items-center space-x-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "truncate", children: [!isSelected && isDraft && (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-[#EC2F0D] mr-1", children: chatT('draft') }), (0, jsx_runtime_1.jsx)("span", { children: botInfo.name })] }), botInfo?.isOfficial && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: chatT('official_bot'), children: (0, jsx_runtime_1.jsx)(CheckBadgeIcon_1.default, { className: "w-4 h-4 fill-icon-brand" }) }))] }), (0, jsx_runtime_1.jsx)("span", { className: (0, clsx_1.default)('text-xs leading-[14px] shrink-0 text-subtlest'), children: botLastMessage
                                    ? (0, dayjs_1.default)().isSame((0, dayjs_1.default)(botLastMessage.createdDateUnix ? Number(botLastMessage.createdDateUnix) : botLastMessage.createdDate), 'day')
                                        ? (0, dayjs_1.default)(botLastMessage.createdDateUnix ? Number(botLastMessage.createdDateUnix) : botLastMessage.createdDate).format('HH:mm')
                                        : (0, dayjs_1.default)().isSame((0, dayjs_1.default)(botLastMessage.createdDateUnix
                                            ? Number(botLastMessage.createdDateUnix)
                                            : botLastMessage.createdDate), 'year')
                                            ? (0, dayjs_1.default)(botLastMessage.createdDateUnix ? Number(botLastMessage.createdDateUnix) : botLastMessage.createdDate).format('MM-DD')
                                            : (0, dayjs_1.default)(botLastMessage.createdDateUnix ? Number(botLastMessage.createdDateUnix) : botLastMessage.createdDate).format('YYYY-MM-DD')
                                    : '' })] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full text-sm overflow-hidden flex items-center space-x-1 space-y-0.5', selectedType === 'bot' && selectedId === botInfo.id ? 'text-white' : 'text-secondary'), children: [!!botInfo.allTagList.slice(0, 1).length &&
                                botInfo.allTagList.slice(0, 1).map(tag => {
                                    return ((0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 shrink-0", children: (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: (0, jsx_runtime_1.jsx)(WidgetDesc_1.default, {}), disabled: !tag.extra?.isShowHover, children: tag.iconUrl && ((0, jsx_runtime_1.jsx)(image_1.default, { src: tag.iconUrl, width: 16, height: 16, alt: "emoji img", className: "w-4 h-4 shrink-0" })) }) }, tag.id));
                                }), (0, jsx_runtime_1.jsx)("div", { className: "truncate text-subtler text-sm", children: botLastMessage?.text })] })] })] }));
}
