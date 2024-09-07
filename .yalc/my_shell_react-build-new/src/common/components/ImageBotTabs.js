"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const usePublishGallery_1 = __importDefault(require("../../gallery/hooks/usePublishGallery.js"));
const utils_1 = require("../../lib/utils.js");
const store_1 = require("../../services/store/index.js");
const tabs_1 = require("./ui/tabs.js");
const usePathLocale_1 = require("../hooks/usePathLocale.js");
function ImageBotTabs({ className, botInfo }) {
    const t = (0, next_intl_1.useTranslations)();
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const isGalleryPage = pathname.startsWith('/gallery') || pathname.startsWith('/m/gallery');
    const defaultValue = isGalleryPage ? 'gallery' : 'chat';
    const flagUserFirstVisitGallery = (0, store_1.useUserStore)(state => state.flagUserFirstVisitGallery);
    const hasUnRead = (0, store_1.useChatStore)(state => state.hasUnRead);
    const { checkGalleryUpdateHandle } = (0, usePublishGallery_1.default)();
    async function checkGalleryUpdate() {
        await checkGalleryUpdateHandle(botInfo.id);
    }
    (0, react_1.useEffect)(() => {
        checkGalleryUpdate();
    }, [isGalleryPage]);
    const isShowTip = flagUserFirstVisitGallery !== '1' && flagUserFirstVisitGallery !== '0' && !isGalleryPage;
    console.log('flagUserFirstVisitGallery', flagUserFirstVisitGallery);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('absolute top-2.5 md:top-3 left-[calc(50%-109px)] flex z-20', className), children: (0, jsx_runtime_1.jsx)(tabs_1.Tabs, { isLink: true, defaultValue: defaultValue, size: "md", items: [
                {
                    label: t('chat.chat'),
                    value: 'chat',
                    link: `/chat/${botInfo?.id}`
                },
                {
                    label: t('chat.gallery'),
                    value: 'gallery',
                    link: `/gallery/${botInfo?.id}`,
                    hoverText: isShowTip ? t('chat.gallery_tab_tip') : '',
                    tooltipOpen: isShowTip,
                    hasUnRead: !isGalleryPage && hasUnRead
                }
            ] }) }));
}
exports.default = ImageBotTabs;
