"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const NormalCard_1 = __importDefault(require("../../common/components/NormalCard.js"));
const utils_1 = require("../../lib/utils.js");
const image_1 = require("./ui/image.js");
const link_1 = require("./ui/link.js");
const typography_1 = require("./ui/typography.js");
function FeaturedCard(props) {
    const { item, index, recommendationSpot, eventName = 'RecommendItemExposure' } = props;
    const bottomItem = (0, react_1.useMemo)(() => {
        const from = recommendationSpot ? `from=${recommendationSpot}` : '';
        return {
            title: item.featuredName,
            description: item.featuredDescription,
            logoUrl: item.featuredLogo,
            buttonTitle: item.buttonTitle || 'Chat',
            clickUrl: `${item.buttonUrl}${from ? `?${from}` : ''}`,
            buttonUrl: `${item.buttonUrl}${from ? `?${from}` : ''}`,
            buttonMobileUrl: `${item.buttonMobileUrl}${from ? `?${from}` : ''}`
        };
    }, [item, recommendationSpot]);
    const clickUrl = (0, react_1.useMemo)(() => {
        const from = recommendationSpot ? `from=${recommendationSpot}` : '';
        return `${item.gotoUrl}${from ? `?${from}` : ''}`;
    }, [item.gotoUrl, recommendationSpot]);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex justify-end flex-col bg-surface-container-hovered rounded-2xl aspect-[458/420] relative overflow-hidden cursor-pointer'), "data-sensors-exposure-event-name": eventName, "data-sensors-exposure-property-rank": index + 1, "data-sensors-exposure-property-bot_id": item.botId, "data-sensors-exposure-property-bot_name": item.botName, "data-sensors-exposure-property-article_id": item.pageId, "data-sensors-exposure-property-article_name": "", "data-sensors-exposure-property-widget_id": item.widgetId, "data-sensors-exposure-property-widget_name": "", "data-sensors-exposure-property-recommendation_spot": recommendationSpot, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end flex-col rounded-2xl aspect-[346/334] relative", children: [(0, jsx_runtime_1.jsx)(link_1.Link, { href: clickUrl, children: (0, jsx_runtime_1.jsx)(image_1.Image, { isBackgroud: true, className: "rounded-2xl overflow-hidden ease-in-out duration-300 hover:scale-105", src: item?.backgroundImageUrl, alt: `Featured Bot - ${item.description}` }) }), (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('relative z-[2] rounded-b-2xl overflow-hidden', item?.featuredName ? '' : 'h-[72px] flex flex-col justify-center items-start bg-[var(--alpha-black-30)]'), children: [(0, jsx_runtime_1.jsx)(typography_1.SubHeading, { size: "lg", lineClamp: 1, className: (0, utils_1.cn)('px-4 text-static opacity-80 leading-[0.8] uppercase'), children: item?.title }), (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "xs", lineClamp: 1, className: (0, utils_1.cn)('px-4 text-static mt-1.5', item.featuredName ? 'mb-3' : ''), dangerous: true, children: item?.description }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('w-full relative flex flex-row items-center overflow-hidden rounded-b-2xl bg-[var(--alpha-black-30)]'), children: item?.featuredName && ((0, jsx_runtime_1.jsx)(NormalCard_1.default, { inBox: true, size: "sm", isLine: false, showChat: true, item: bottomItem, className: "px-2.5" })) })] })] }) }));
}
exports.default = FeaturedCard;
