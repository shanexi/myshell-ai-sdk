"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BotDetail;
const jsx_runtime_1 = require("react/jsx-runtime");
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const typography_1 = require("../../../../../../common/components/ui/typography.js");
const bot_1 = require("../../../../../../common/constants/enums/bot.js");
const bot_widget_list_1 = __importDefault(require("../../../../../../components/workshop/bot-detail/bot-widget-list/index.js"));
const utils_1 = require("../../../../../../lib/utils.js");
const store_1 = require("../../../../../../services/store/index.js");
const ExtraInfoSkeleton_1 = __importDefault(require("./bot-extra-info/skeleton/ExtraInfoSkeleton.js"));
const BotGallerySkeleton_1 = __importDefault(require("./photos/skeleton/BotGallerySkeleton.js"));
const AuthorSkeleton_1 = __importDefault(require("../../common/author/skeleton/AuthorSkeleton.js"));
const DescriptionSkeleton_1 = __importDefault(require("../../common/description/skeleton/DescriptionSkeleton.js"));
const LogoSkeleton_1 = __importDefault(require("../../common/logo/skeleton/LogoSkeleton.js"));
const TagsSkeleton_1 = __importDefault(require("../../common/tags/skeleton/TagsSkeleton.js"));
const Logo = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../common/logo/Logo.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)(LogoSkeleton_1.default, {})
});
const BotExtraInfo = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./bot-extra-info/BotExtraInfo.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)(ExtraInfoSkeleton_1.default, {}),
    ssr: false
});
const Author = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../common/author/Author.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)(AuthorSkeleton_1.default, {})
});
const Tags = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../common/tags/Tags.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)(TagsSkeleton_1.default, {})
});
const Description = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../common/description/Description.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)(DescriptionSkeleton_1.default, {})
});
const BotGallery = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../../../components/chat/entity-detail/views/bot/views/photos/BotGallery.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)(BotGallerySkeleton_1.default, {}),
    ssr: false
});
const ShareKeyInfo = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./share-key/views/ShareKeyInfo.js'))), {
    loading: () => null,
    ssr: false
});
function BotDetail({ type, active, id, logoUrl, isOfficial, tags = [], photos, name, description, author, widgets, curve, tgName, model, githubUrl, buttonSlot, tradeSlot, isSticky, hideBottomEmpty }) {
    const commonLocale = (0, next_intl_1.useTranslations)('common');
    const shareKeyLocale = (0, next_intl_1.useTranslations)('share_key');
    const workshopLocale = (0, next_intl_1.useTranslations)('workshop');
    const user = (0, store_1.useUserStore)(state => state.user);
    const [activeContent, setActiveContent] = (0, react_1.useState)(active || 'photos');
    const [photoList, setPhotoList] = (0, react_1.useState)(photos ?? []);
    const canUploadPhotos = type === 'ugc' && author?.id === user?.id;
    const galleryPhotos = photoList.filter(photo => photo.type === bot_1.BotPhotoTypeEnum.OTHER);
    (0, react_1.useEffect)(() => {
        if (photos?.length) {
            setPhotoList(photos);
        }
    }, [photos]);
    const tabItems = (0, react_1.useMemo)(() => {
        return [
            {
                tabKey: 'shares',
                label: shareKeyLocale('aipp_store'),
                invisible: !curve || !curve?.detail
            },
            {
                tabKey: 'photos',
                label: commonLocale('photos')
            },
            {
                tabKey: 'widgets',
                label: workshopLocale('widget')
            }
        ];
    }, [commonLocale, shareKeyLocale, workshopLocale, curve]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 md:gap-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 md:gap-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(Logo, { src: logoUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 grow overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", color: "default", children: name }), (0, jsx_runtime_1.jsx)(BotExtraInfo, { isOfficial: isOfficial, logoUrl: logoUrl, tgName: tgName, model: model, githubUrl: githubUrl })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex", children: (0, jsx_runtime_1.jsx)(Author, { name: author?.name, nameTag: author?.nameTag }) })] }), buttonSlot && (0, jsx_runtime_1.jsx)("div", { className: "h-full flex items-center gap-3", children: buttonSlot })] }), (!!tags.length || description) && ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-3 md:gap-4", children: [(0, jsx_runtime_1.jsx)(Tags, { tags: tags }), (0, jsx_runtime_1.jsx)(Description, { desc: description })] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex justify-between items-center relative border-b border-default', isSticky && 'sticky top-0 bg-surface-default z-50'), children: (0, jsx_runtime_1.jsx)("div", { className: "flex gap-6 md:gap-5 items-center w-full", children: tabItems.map(({ tabKey, label, invisible }) => ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex flex-col py-1.5 cursor-pointer border-b-2', invisible && 'hidden', activeContent === tabKey ? 'border-brand' : 'border-transparent'), onClick: () => setActiveContent(tabKey), children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", className: "text-center", color: activeContent === tabKey ? 'brand' : 'subtler', children: label }) }, tabKey))) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "py-5", children: [activeContent === 'photos' && ((0, jsx_runtime_1.jsx)(BotGallery, { id: id, photos: galleryPhotos, canUpload: canUploadPhotos, onActionSuccess: (p) => {
                                    setPhotoList(p);
                                } })), activeContent === 'shares' && curve && curve.detail && ((0, jsx_runtime_1.jsx)(ShareKeyInfo, { id: id, name: name, topHolers: curve?.detail?.topHolders, topTradeOrders: curve?.detail?.topTradeOrders, ticker: curve?.detail?.boundingCurveSummary?.symbol, price: curve?.detail?.boundingCurveSummary?.price, priceInUSD: curve?.detail?.boundingCurveSummary?.priceInU, holdersCount: curve?.detail?.boundingCurveSummary?.holdersCount, curve: curve.detail.boundingCurveSummary, isSticky: isSticky })), activeContent === 'widgets' && (0, jsx_runtime_1.jsx)(bot_widget_list_1.default, { widgets: widgets })] })] }), tradeSlot ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full bg-surface-default fixed py-4 px-4 bottom-0 left-0 right-0 border-t border-default z-50", children: tradeSlot }), hideBottomEmpty ? null : ((0, jsx_runtime_1.jsx)("div", { className: "w-full py-3 px-4", children: (0, jsx_runtime_1.jsx)("div", { className: "h-11" }) }))] })) : null] }));
}
