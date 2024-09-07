"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NormalPopDetail;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const CheckBadgeIcon_1 = __importDefault(require("@heroicons/react/24/solid/CheckBadgeIcon"));
const LockClosedIcon_1 = __importDefault(require("@heroicons/react/24/solid/LockClosedIcon"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const BotDetailBg_png_1 = __importDefault(require("@/common/assets/images/workshop/BotDetailBg.png"));
const spinner_1 = __importDefault(require("../../common/components/ui/spinner.js"));
const bot_1 = require("../../common/constants/enums/bot.js");
const useRoute_1 = require("../../common/hooks/useRoute.js");
const Description_1 = __importDefault(require("../../components/chat/entity-detail/views/common/description/Description.js"));
const BotTags_1 = require("../../components/workshop/bot-detail/BotTags.js");
const GetPassModal_1 = __importDefault(require("../../components/workshop/bot-detail/actions/GetPassModal.js"));
const tooltip_1 = require("./ui/tooltip.js");
function NormalPopDetail({ showInsideScroller = false, item, isMobile }) {
    const popData = item?.detail || item;
    const t = (0, next_intl_1.useTranslations)();
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const [chatLoading, setChatLoading] = (0, react_2.useState)(false);
    const [showGetPass, setShowGetPass] = (0, react_2.useState)(false);
    const { openUrl } = (0, useRoute_1.useRoute)();
    const bgPhoto = popData?.backgroundImageUrl ||
        ((popData?.photos &&
            popData.photos.filter((p) => p.type === bot_1.BotPhotoTypeEnum.BACKGROUND)[0]?.originImageUrl) ??
            null);
    const hoverButton = item?.baseSubCard?.hoverButton || {};
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: `NormalPopDetail ${showInsideScroller ? 'overflow-hidden h-full md:overflow-auto' : 'h-full overflow-hidden'} flex w-full flex-col flex-nowrap text-on-surface relative md:rounded-4xl`, children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col flex-grow items-center relative overflow-hidden md:overflow-auto", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full pb-[20px] overflow-hidden bg-surface text-on-surface", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full relative h-[102px]", children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "bot detail background image", src: bgPhoto || BotDetailBg_png_1.default, width: 200, height: 100, className: "object-cover w-full h-full bg-[#eee] dark:bg-[#414345]" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0 rounded-[16px] w-[72px] h-[72px] overflow-hidden ml-5 -mt-[22px] z-0 border-[2px] border-white", children: (0, jsx_runtime_1.jsx)("img", { src: popData?.logoUrl || 'https://image.myshell.ai/image/bot/logo/20240106/default.png', alt: "bot avatar", className: "object-cover w-[72px] h-[72px] bg-[#eee] dark:bg-[#414345]" }) }), hoverButton?.title && ((0, jsx_runtime_1.jsx)(react_1.Button, { onClick: e => {
                                                    e.stopPropagation();
                                                    if (popData?.membershipChatConfig?.isLockByMembershipType) {
                                                        setShowGetPass(true);
                                                    }
                                                    else {
                                                        setChatLoading(true);
                                                        openUrl(isMobile ? hoverButton?.jumpMobileUrl : hoverButton?.jumpUrl);
                                                    }
                                                }, isLoading: chatLoading, spinner: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "xs" }), className: "cursor-pointer py-1 px-3 bg-primary min-w-[88px] h-[28px] mr-5 text-white font-medium text-sm leading-[20px] rounded-full", _hover: {
                                                    background: 'bg-primary'
                                                }, children: popData?.membershipChatConfig?.isLockByMembershipType ? ((0, jsx_runtime_1.jsx)(LockClosedIcon_1.default, { className: "w-5 h-5 fill-white" })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: hoverButton?.title })) }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-3 flex w-full items-center space-x-2 px-[20px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-[20px] leading-[1.3] text-on-surface line-clamp-1 break-all", children: popData?.name }), popData?.isOfficial && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: chatT('official_bot'), children: (0, jsx_runtime_1.jsx)(CheckBadgeIcon_1.default, { className: "w-[24px] h-[24px] leading-[1.3] fill-primary cursor-pointer" }) }))] }), (0, jsx_runtime_1.jsx)(BotTags_1.BotTags, { bot: { tagList: popData.tags || item.tags }, className: "px-5 mt-4" }), popData?.description && ((0, jsx_runtime_1.jsx)("div", { className: "px-5 mt-4", children: (0, jsx_runtime_1.jsx)(Description_1.default, { showMore: false, desc: popData?.description }) }))] }) }) }), popData?.membershipChatConfig?.isLockByMembershipType && showGetPass && ((0, jsx_runtime_1.jsx)(GetPassModal_1.default, { isOpen: showGetPass, onClose: () => {
                    setShowGetPass(false);
                } }))] }));
}
