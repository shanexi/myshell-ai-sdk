"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerItem = BannerItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const useRefCallback_1 = require("../../../common/hooks/useRefCallback.js");
const sensors_1 = require("../../../lib/sensors/index.js");
const utils_1 = require("../../../lib/utils.js");
const button_1 = require("../ui/button.js");
const link_1 = __importDefault(require("../ui/link.js"));
function BannerItem(props) {
    const { item, className } = props;
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const imgUrl = isMobile ? item.mobileImageUrl : item.imageUrl;
    const getIdFromUrl = (url) => {
        const botIdMatch = url.match(/\/(\d+)$/) || url.match(/botId=(\d+)/);
        const id = botIdMatch ? botIdMatch?.[1] : '';
        const isArticle = url.includes('/artcile/');
        return {
            botId: isArticle ? '' : id,
            articleId: isArticle ? id : ''
        };
    };
    const { botId, articleId } = getIdFromUrl(item.gotoUrl);
    const sensors = (0, sensors_1.useSensors)();
    const handleClick = (0, useRefCallback_1.useRefCallback)(() => {
        sensors.track('BannerClick', {
            banner_id: '',
            banner_name: item.title,
            article_id: articleId,
            article_name: '',
            bot_id: botId,
            bot_name: ''
        });
    });
    const gotoUrl = (0, react_1.useMemo)(() => {
        if (!item.gotoUrl.startsWith('http')) {
            return `${item.gotoUrl}${item.gotoUrl.includes('?') ? '&' : '?'}form=Explore_Banner`;
        }
        return item.gotoUrl;
    }, [item.gotoUrl]);
    return ((0, jsx_runtime_1.jsxs)(link_1.default, { className: (0, utils_1.cn)('relative block cursor-pointer w-full h-full min-h-[180px] max-h-[300px] bg-surface-container overflow-hidden px-[1.9vw] py-[0.98vw] md:py-[1.6vw] lg:px-[2.08vw] large:py-[2.91vw]', className), href: gotoUrl, "data-sensors-exposure-event-name": "RecommendItemExposure", "data-sensors-exposure-property-recommendation_spot": "Explore_Banner", "data-sensors-exposure-property-banner_name": item.title, "data-sensors-exposure-property-bot_id": botId, "data-sensors-exposure-property-bot_name": "", "data-sensors-exposure-property-article_id": articleId, "data-sensors-exposure-property-article_name": "", onClick: handleClick, children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden bg-surface-container-hovered bg-cover", style: imgUrl
                    ? {
                        backgroundImage: `url(${imgUrl})`
                    }
                    : undefined }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute bottom-4 left-0 px-4 md:px-4 md:relative md:bottom-0 md:left-0 text-white text-left md:max-w-[340px] min-h-[10.625vw] large:min-h-[185px] h-full flex flex-col justify-end items-start", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[20px] lg:text-[1.458vw] 2xl:text-4xl mb-1 large:mb-2 font-semibold text-white leading-[1.3] line-clamp-2", children: item.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm opacity-90 line-clamp-2 text-white", children: item.description }), item.buttonText && ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "static", className: "hidden md:flex mt-3 lg:mt-5 h-8 large:h-11 min-w-[110px]", children: item.buttonText }))] })] }));
}
