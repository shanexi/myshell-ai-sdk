"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureViewInfoLayout = FeatureViewInfoLayout;
exports.default = FeatureViewInfo;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowSmallLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowSmallLeftIcon"));
const clsx_1 = __importDefault(require("clsx"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const BotCard_1 = require("../../common/components/richText/BotCard.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const Image_1 = __importDefault(require("../../components/explore/Image.js"));
const tooltip_1 = require("./ui/tooltip.js");
const useGoToChat_1 = require("../hooks/useGoToChat.js");
function FeatureViewInfoLayout({ coverImageUrl, overview, title, bot, widget, onClose, isPopup = true, children, clickCallback, featureType, from }) {
    const t = (0, next_intl_1.useTranslations)();
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const isMobile = (0, usePathLocale_1.useIsMobile)();
    return ((0, jsx_runtime_1.jsxs)("section", { className: (0, clsx_1.default)(`top-0 left-0 bg-surface z-[10] w-full h-full flex-1 flex flex-col p-0 md:p-2 overflow-hidden`, {
            absolute: isPopup
        }), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex items-center w-full h-[56px] md:h-[72px] px-4 py-2.5 md:px-5 md:py-[18px] md:rounded-t-[24px]', isMobile ? 'absolute top-0 right-0' : 'border-b border-default bg-surface'), children: [onClose && ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center items-center text-[16px] font-semibold text-on-surface cursor-pointer", onClick: onClose, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center float-right bg-surface-default rounded-full z-[1] w-9 h-9 md:w-6 md:h-6", children: (0, jsx_runtime_1.jsx)(ArrowSmallLeftIcon_1.default, { className: "text-icon md:stroke-primary w-[22px] h-[22px] md:w-6 md:h-6" }) }), !isMobile && (0, jsx_runtime_1.jsx)("div", { className: "h-[20px] w-[1px] mx-3 border-r border-default" })] })), !isMobile && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center text-[20px] leading-[1.3] text-on-surface pr-8 line-clamp-2 truncate", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-ppt", children: title }), bot?.isOfficial && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: chatT('official_bot'), children: (0, jsx_runtime_1.jsx)(image_1.default, { alt: "official bot", src: "/images/check-badge.png", width: 20, height: 20, className: "cursor-pointer" }) }))] }))] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full flex-col md:flex-row flex bg-surface overflow-y-auto md:overflow-hidden rounded-b-[24px]", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col md:flex-row", children: [isMobile ? ((0, jsx_runtime_1.jsx)(FeatureOverview, { ...overview, bot: bot, widget: widget, featureType: featureType, clickCallback: clickCallback, from: from })) : ((0, jsx_runtime_1.jsx)("div", { className: "bg-surface w-full flex justify-center items-center md:w-[50%] bg-[#F6F6F7] dark:bg-[#323339]", style: {
                                ...(coverImageUrl && { backgroundImage: `url('${coverImageUrl}')` }),
                                backgroundSize: 'cover'
                            } })), (0, jsx_runtime_1.jsx)("div", { className: "bg-surface w-full md:w-[50%] px-4 pb-4 md:px-[48px] md:pb-10 space-y-4 md:space-y-6 text-[18px] text-[#1D192B] dark:text-[#fff] overflow-y-hidden md:overflow-y-auto text-justify", children: children })] }) })] }));
}
function FeatureOverview({ cardImageUrl, title, description, bot, widget, clickCallback, featureType, from }) {
    const t = (0, next_intl_1.useTranslations)();
    const [chatLoading, setChatLoading] = (0, react_2.useState)(false);
    const goToChat = (0, useGoToChat_1.useGoToChat)();
    const featureItem = featureType === 'WIDGET' ? widget : bot;
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-end flex-col aspect-[345/300]  relative bg-cover bg-no-repeat overflow-hidden", style: {
            ...(cardImageUrl && { backgroundImage: `url('${cardImageUrl}')` })
        }, children: (0, jsx_runtime_1.jsx)("div", { className: "min-h-[288px]", children: (0, jsx_runtime_1.jsxs)("div", { className: "absolute left-0 bottom-0 w-full", children: [(0, jsx_runtime_1.jsx)("p", { className: "mx-4 text-white text-sm uppercase font-medium opacity-80 line-clamp-1", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "mx-4 text-white text-lg leading-[1.1] mt-[6px] font-bold line-clamp-1", children: description }), (0, jsx_runtime_1.jsx)("hr", { className: "px-4 w-full border-none mt-3" }), featureItem && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative p-4 flex flex-row justify-between items-center overflow-hidden md:rounded-b-[24px] bg-[#00000033] transition-all'), style: { backdropFilter: 'blur(56px)' }, children: [(0, jsx_runtime_1.jsx)(Image_1.default, { className: "self-start rounded-[10px] aspect-square !w-[48px]", src: featureItem.logoUrl ?? 'https://image.myshell.ai/image/bot/logo/20240106/default.png', placeholder: "https://image.myshell.ai/image/bot/logo/20240106/default.png", alt: "avatar" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col justify-between items-start ml-[10px] text-sm text-white", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[16px] w-[calc(90%)] leading-[20px] font-medium line-clamp-1", children: featureItem.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-[14px] w-[calc(90%)] max-w-[260px] font-medium leading-[20px] text-ellipsis line-clamp-1 mt-1", children: featureItem.description })] }), (0, jsx_runtime_1.jsx)(react_1.Button, { className: "min-w-[58px] h-[28px] py-1 px-3 bg-[var(--surface-create-bg)] text-primary font-medium text-sm leading-[20px] rounded-full", isLoading: chatLoading, _hover: {
                                    background: 'var(--surface-create-bg)'
                                }, _disabled: {
                                    opacity: 0.9,
                                    background: 'var(--surface-create-bg)'
                                }, onClick: e => {
                                    e.stopPropagation();
                                    setChatLoading(true);
                                    clickCallback && clickCallback('Chat');
                                    goToChat(`${featureItem.id}`, featureItem.name, '', () => {
                                        setChatLoading(false);
                                    }, featureType, from);
                                }, children: t('chat.chat') })] }))] }) }) }));
}
function FeatureViewInfo(pros) {
    const { onClose, item, articleId } = pros;
    const bot = item.botSummary || {};
    const botArr = [item.botSummary];
    const title = bot.name;
    const overview = {
        cardImageUrl: item?.botOverviewUrls?.[0],
        title: item.title,
        description: item.titleDescription,
        bot
    };
    const isMobile = (0, usePathLocale_1.useIsMobile)();
    return ((0, jsx_runtime_1.jsxs)(FeatureViewInfoLayout, { title: title, coverImageUrl: item.botDetailUrls[0], overview: overview, bot: bot, onClose: onClose, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[18px] md:text-[24px] font-semibold line-clamp-1", children: item.headline }), (0, jsx_runtime_1.jsx)("p", { children: item.headlineDescription }), isMobile ? ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-auto min-h-[300px]", children: item.mobileFeaturePhotoUrls?.[0] && ((0, jsx_runtime_1.jsx)(Image_1.default, { className: "w-full h-full", src: item.mobileFeaturePhotoUrls?.[0], alt: "bot img" })) })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-auto min-h-[300px]", children: (0, jsx_runtime_1.jsx)(Image_1.default, { className: "w-full h-auto min-h-[300px] object-cover", src: item.featurePhotoUrls[0], alt: "bot img" }) })), (0, jsx_runtime_1.jsx)("p", { className: "font-semibold hidden md:block", children: item.title }), (0, jsx_runtime_1.jsxs)("p", { children: [item.titleDescription, " "] }), (0, jsx_runtime_1.jsx)(BotCard_1.BotCard, { bots: botArr })] }));
}
