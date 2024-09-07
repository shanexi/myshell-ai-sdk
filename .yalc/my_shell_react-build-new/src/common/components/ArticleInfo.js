"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleInfo = ArticleInfo;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_es_1 = require("lodash-es");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_use_1 = require("react-use");
const rxjs_1 = require("rxjs");
const bot_1 = require("../../apis/bot.js");
const explore_1 = require("../../apis/explore.js");
const workshop_1 = require("../../apis/workshop.js");
const ArticleShare_1 = __importDefault(require("../../article/views/ArticleShare.js"));
const ArticleSkeleton_1 = require("../../article/views/ArticleSkeleton.js");
const BotCard_1 = require("../../common/components/richText/BotCard.js");
const NotionRenderer_1 = require("../../common/components/richText/NotionRenderer.js");
const useBackToHome_1 = require("../../common/hooks/useBackToHome.js");
const identityService_1 = require("../../common/services/identityService.js");
const sensors_1 = require("../../lib/sensors/index.js");
const FeatureViewInfo_1 = require("./FeatureViewInfo.js");
const NotFound_1 = __importDefault(require("./NotFound.js"));
const WidgetCard_1 = require("./richText/WidgetCard.js");
function ArticleInfo({ articleId }) {
    const sensors = (0, sensors_1.useSensors)();
    const params = (0, navigation_1.useSearchParams)();
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(false);
    const post = (0, react_use_1.useAsync)(async () => {
        if (articleId) {
            const res = await (0, explore_1.getPost)(articleId);
            if (res.success) {
                setLoading(false);
                const data = res.data;
                const pageMeta = data?.pageMeta;
                sensors.track('ArticleView', {
                    article_id: articleId,
                    article_name: pageMeta?.feature_title || pageMeta?.bot_name
                });
                return data;
            }
            setError(true);
            setLoading(false);
        }
    }, [articleId]);
    const pageMeta = post.value?.pageMeta;
    const pageTitle = pageMeta?.feature_title ?? '';
    const botId = pageMeta?.feature_id_type === 'BOT' ? pageMeta?.feature_id : undefined;
    const botReq = (0, react_use_1.useAsync)(async () => {
        if (!botId)
            return;
        const botDetail = await (0, rxjs_1.lastValueFrom)((0, bot_1.getBotInfo)(botId));
        return botDetail.bots?.[botId]?.summary;
    }, [botId]);
    const widgetId = pageMeta?.feature_id_type === 'WIDGET' ? pageMeta?.feature_id : undefined;
    const widgetReq = (0, react_use_1.useAsync)(async () => {
        if (!widgetId)
            return;
        const res = await (0, workshop_1.getWidgetInfo)(widgetId);
        if (res.success) {
            return res.data;
        }
    }, [widgetId]);
    const back = (0, useBackToHome_1.useBackToHome)();
    (0, react_use_1.useEffectOnce)(() => {
        const code = params.get('code');
        if (code) {
            identityService_1.identityService.setSharingArticleCode(code);
        }
    });
    const clickCallback = (clickArea, chatId, chatName, chatType) => {
        sensors.track('ArticleClick', {
            click_area: clickArea,
            article_id: articleId,
            article_name: pageTitle,
            bot_id: chatType == 'WIDGET' ? '' : chatId,
            bot_name: chatType == 'WIDGET' ? '' : chatName,
            widget_id: chatType == 'WIDGET' ? chatId : '',
            widget_name: chatType == 'WIDGET' ? chatName : ''
        });
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: loading ? ((0, jsx_runtime_1.jsx)(ArticleSkeleton_1.ArticleSkeleton, {})) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: error ? ((0, jsx_runtime_1.jsx)(NotFound_1.default, {})) : ((0, jsx_runtime_1.jsxs)(FeatureViewInfo_1.FeatureViewInfoLayout, { title: pageMeta?.bot_name ?? '', coverImageUrl: pageMeta?.inside_image ?? '', overview: {
                    cardImageUrl: pageMeta?.card_image,
                    title: pageTitle,
                    description: pageMeta?.card_type_desc ?? ''
                }, bot: botReq.value, widget: widgetReq.value, featureType: pageMeta?.feature_id_type, isPopup: false, onClose: back, from: "article_content", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-2.5 md:top-6 right-4 md:right-8 w-9 h-9 bg-surface-default rounded-full z-[1]", children: (0, jsx_runtime_1.jsx)(ArticleShare_1.default, { articleSeoId: articleId, articleId: post?.value?.id, articleName: pageTitle, clickCallback: clickCallback }) }), !(0, lodash_es_1.isEmpty)(post.value?.pageContent) && ((0, jsx_runtime_1.jsx)(NotionRenderer_1.NotionRenderer, { className: "text-default space-y-2 text-left text-base font-mona-sans", recordMap: post.value.pageContent, options: {
                            renderEntity: {
                                collection: (node, children) => {
                                    const block = node.data;
                                    const botIds = block.items.filter(bot => bot.Type === 'bot').map(bot => bot.Id);
                                    const widgetIds = block.items
                                        .filter(bot => bot.Type === 'widget')
                                        .map(bot => bot.Id);
                                    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [botIds?.length ? ((0, jsx_runtime_1.jsx)(BotCard_1.BotCard, { botIds: botIds, clickCallback: clickCallback, itemClickCallback: clickCallback })) : null, widgetIds?.length ? ((0, jsx_runtime_1.jsx)(WidgetCard_1.WidgetCard, { widgetIds: widgetIds, clickCallback: clickCallback, itemClickCallback: clickCallback })) : null] }));
                                }
                            }
                        } }))] })) })) }));
}
