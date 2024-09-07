"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalleryInfo;
const jsx_runtime_1 = require("react/jsx-runtime");
const outline_1 = require("@heroicons/react/24/outline");
const EyeSlashIcon_1 = __importDefault(require("@heroicons/react/24/outline/EyeSlashIcon"));
const clsx_1 = __importDefault(require("clsx"));
const throttle_1 = __importDefault(require("lodash-es/throttle"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const NotFoundIcon_1 = __importDefault(require("../../common/components/icons/NotFoundIcon.js"));
const avatar_1 = require("../../common/components/ui/avatar.js");
const button_1 = require("../../common/components/ui/button.js");
const icon_1 = require("../../common/components/ui/icon.js");
const icon_button_1 = require("../../common/components/ui/icon-button.js");
const image_1 = require("../../common/components/ui/image.js");
const typography_1 = require("../../common/components/ui/typography.js");
const useCopyClipboard_1 = __importDefault(require("../../common/hooks/useCopyClipboard.js"));
const useDownload_1 = __importDefault(require("../../common/hooks/useDownload.js"));
const useNotification_1 = require("../../common/hooks/useNotification.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const useRestoreScrollPosition_1 = require("../../common/hooks/useRestoreScrollPosition.js");
const useRoute_1 = require("../../common/hooks/useRoute.js");
const identityService_1 = require("../../common/services/identityService.js");
const sensors_1 = require("../../lib/sensors/index.js");
const utils_1 = require("../../lib/utils.js");
const store_1 = require("../../services/store/index.js");
const GalleryAuthorInfo_1 = __importDefault(require("./GalleryAuthorInfo.js"));
const GalleryShareBtn_1 = __importDefault(require("./GalleryShareBtn.js"));
const GalleryInfoSkeleon_1 = __importDefault(require("../../../app/[locale]/(pc)/gallery/[botId]/[galleryId]/GalleryInfoSkeleon.js"));
const api_1 = require("../modal/api.js");
function GalleryInfo({ item, botId, galleryId, isShare = false, isMobile, deleteCallback, followCallback }) {
    const t = (0, next_intl_1.useTranslations)();
    const router = (0, useRoute_1.useRoute)();
    const { success } = (0, useNotification_1.useNotification)();
    const { downloading, onDownload } = (0, useDownload_1.default)();
    const params = (0, navigation_1.useSearchParams)();
    const showNsfw = (0, store_1.useUserStore)(state => state.showNsfw);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const [info, setInfo] = (0, react_1.useState)(item);
    const [isCopied, setIsCopied] = (0, react_1.useState)(false);
    const { error } = (0, useNotification_1.useNotification)();
    const sensors = (0, sensors_1.useSensors)();
    const nsfw = info?.isNsfw && (isVisitor === 1 || !(showNsfw === 1));
    const onCopySuccess = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
            handleMouseLeave();
        }, 5000);
    };
    const { onCopy } = (0, useCopyClipboard_1.default)('', '', onCopySuccess);
    const [isHovering, setIsHovering] = (0, react_1.useState)(false);
    const handleMouseEnter = () => {
        setIsHovering(true);
    };
    const handleMouseLeave = () => {
        setIsHovering(false);
    };
    const viewCount = (0, react_1.useMemo)(() => {
        const count = info?.viewCount || 0;
        if (count >= 1000) {
            const formatCount = `${(count / 1000).toFixed(1)}k`;
            return formatCount.endsWith('.0') ? `${formatCount.slice(0, -2)}k` : `${formatCount}`;
        }
        return count;
    }, [info?.viewCount]);
    const [fetchError, setFetchError] = (0, react_1.useState)(false);
    const [fetchLoading, setFetchLoading] = (0, react_1.useState)(false);
    const getDetail = async () => {
        setFetchLoading(true);
        const res = await (0, api_1.getGalleryDetailById)(galleryId);
        if (res.success) {
            const { data } = res;
            setInfo(data.info);
        }
        else {
            setFetchError(true);
        }
        setFetchLoading(false);
    };
    const searchParams = (0, navigation_1.useSearchParams)();
    const deleteHandle = (galleryId) => {
        const from = searchParams.get('from');
        if (deleteCallback) {
            deleteCallback(galleryId);
        }
        if (isMobile) {
            const prevPath = searchParams.get('prevPath');
            if (from === 'profile' && prevPath) {
                router.openUrl(`${prevPath.replace('#', '%23')}?from=gallery`);
            }
            else if (isShare) {
                router.openUrl(`${isMobile ? '/m' : ''}/gallery/${botId}`);
            }
        }
    };
    (0, react_1.useEffect)(() => {
        if (!item?.id) {
            getDetail();
        }
        else {
            setInfo(info);
        }
    }, [item?.id]);
    const code = params.get('code');
    (0, react_1.useEffect)(() => {
        if (code) {
            identityService_1.identityService.setSharingForumCode(code);
        }
    }, []);
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const scrollRef = (0, react_1.useRef)(null);
    const memoScrollPosition = (0, useRestoreScrollPosition_1.useMemoScrollPosition)(scrollRef);
    const pageId = 'gallery-info-page';
    (0, useRestoreScrollPosition_1.useRestoreScrollPosition)(scrollRef, true);
    (0, react_1.useEffect)(() => {
        function handleScroll() {
            isMobile && memoScrollPosition(pageId);
        }
        const containerEl = scrollRef.current;
        if (containerEl) {
            containerEl.addEventListener('scroll', (0, throttle_1.default)(handleScroll, 500), true);
        }
        const handleUnload = () => {
            sessionStorage.setItem(`scrollPos:${pathname}`, '0');
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            if (containerEl) {
                containerEl.removeEventListener('scroll', handleScroll, true);
            }
        };
    }, []);
    const onBackGallery = () => {
        router.push(`/gallery/${botId}`);
    };
    if (fetchLoading)
        return (0, jsx_runtime_1.jsx)(GalleryInfoSkeleon_1.default, {});
    if (!info && !fetchError)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full flex flex-col md:flex-row overflow-y-hidden md:overflow-y-auto md:overflow-hidden rounded-b-2xl", children: fetchError ? ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col justify-center items-center", children: [(0, jsx_runtime_1.jsx)(NotFoundIcon_1.default, {}), (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", className: "mt-8 md:mt-12", children: t('invalid_link') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtle", className: "mt-1.5 text-center md:text-left", children: t('invalid_link_tip') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", size: "lg", className: "mt-6 flex justify-center items-center", onClick: () => {
                        router.openUrl(`/gallery/${botId}`);
                    }, children: t('explore') })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isMobile && info && ((0, jsx_runtime_1.jsx)(GalleryAuthorInfo_1.default, { isMobile: isMobile, item: info, botId: botId, followCallback: followCallback, deleteCallback: deleteHandle })), (0, jsx_runtime_1.jsxs)("div", { ref: scrollRef, id: pageId, className: "w-full h-auto flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-y-hidden z-[2]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative w-full md:w-[69.9%] max-w-[836px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex justify-center items-center bg-surface-default", children: [!isMobile && code && ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('absolute left-6 top-3 flex z-10 space-x-3'), children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: onBackGallery, icon: outline_1.ArrowLeftIcon, size: "md", variant: "primary", color: "gray" }) })), info?.galleryImageLink && ((0, jsx_runtime_1.jsx)(image_1.Image, { className: "w-full !h-auto object-none object-top", imgClassName: (0, utils_1.cn)('max-h-[540px] min-w-[96px] min-h-[96px] md:min-h-[96px] md:max-h-[836px] md:max-w-[836px] object-contain object-center', nsfw ? 'min-h-[220px]' : 'min-h-[96px]'), src: info.galleryImageLink, alt: `ai art photo:${info?.generationInfo?.sourceText}` }))] }), nsfw && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-0 bottom-0 bg-beta-black-10 w-full h-full flex flex-col items-center justify-center space-y-1", style: {
                                        backdropFilter: 'blur(80px)',
                                        WebkitBackdropFilter: 'blur(80px)',
                                        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.80) 100%)'
                                    }, children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: EyeSlashIcon_1.default, size: "4xl", color: "static" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", color: "static", children: t('workshop.nsfw_bot_text') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", className: "opacity-80 text-center max-w-[248px]", color: "static", children: t('workshop.nsfw_gallery_user_content') }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", icon: outline_1.ChevronRightIcon, iconDirection: "right", color: "brand", variant: "primary", onClick: () => {
                                                router.openUrl('/profile/settings');
                                            }, className: "!mt-3", children: t('workshop.nsfw_bot_user_button') })] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex-shrink-0 flex flex-col bg-surface-default w-full md:w-[31.1%] min-w-[300px] text-justify md:border-l md:border-default", children: [!isMobile && info && ((0, jsx_runtime_1.jsx)(GalleryAuthorInfo_1.default, { isMobile: isMobile, item: info, botId: botId, followCallback: followCallback, deleteCallback: deleteHandle })), (0, jsx_runtime_1.jsxs)("div", { className: "px-3 md:px-4 space-y-4 py-4 flex-1 overflow-y-auto pb-[107px] md:pb-0", children: [(0, jsx_runtime_1.jsxs)(typography_1.Text, { size: "sm", color: "subtle", className: (0, clsx_1.default)('block relative md:p-2 min-h-11', {
                                                'bg-surface-hovered rounded-md': isHovering
                                            }), onClick: () => {
                                                if (isMobile) {
                                                    onCopy(`${info?.generationInfo?.sourceText}`);
                                                }
                                            }, onMouseEnter: () => {
                                                if (!isMobile) {
                                                    handleMouseEnter();
                                                }
                                            }, onMouseLeave: () => {
                                                if (!isMobile) {
                                                    handleMouseLeave();
                                                }
                                            }, children: [info?.generationInfo?.sourceText || t('chat.no_text_input'), info?.generationInfo?.sourceText && isHovering && ((0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-2 right-0 p-2 h-7 rounded-full flex justify-center items-center", onClick: e => {
                                                        onCopy(`${info?.generationInfo?.sourceText}`);
                                                    }, children: (0, jsx_runtime_1.jsx)(button_1.Button, { icon: outline_1.DocumentDuplicateIcon, size: "sm", variant: "primary", color: "gray", "aria-label": "copy text", className: "flex-1 min-w-none", children: isCopied ? t('common.copied') : t('common.copy') }) }))] }), info?.generationInfo?.sourceImageLink && ((0, jsx_runtime_1.jsxs)("div", { className: "relative w-14 h-14", onClick: () => {
                                                if (nsfw) {
                                                    router.openUrl('/profile/settings');
                                                }
                                                else {
                                                    router.openUrl(info?.generationInfo?.sourceImageLink);
                                                }
                                            }, children: [nsfw && info?.generationInfo?.sourceImageLink && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 bottom-0 z-[1] bg-beta-black-10 w-full h-full flex flex-col items-center justify-center space-y-1 rounded-xl cursor-pointer", style: {
                                                        backdropFilter: 'blur(20px)',
                                                        background: isMobile
                                                            ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.80) 100%)'
                                                            : ''
                                                    }, children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: EyeSlashIcon_1.default, size: "xl", color: "inverse" }) })), (0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: "2xl", src: info?.generationInfo?.sourceImageLink }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-0 bottom-0 w-4.5 h-4.5 bg-surface-default flex justify-center items-center rounded-md", children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: outline_1.PaperClipIcon, size: "xs", className: "flex justify-center items-center border-2 border-surface-default" }) })] })), (0, jsx_runtime_1.jsxs)("div", { className: "md:px-2 flex-shrink-0 space-x-1 flex justify-start items-center", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: outline_1.EyeIcon, size: "md", color: "subtlest" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", className: "flex-shrink-0 ", color: "subtlest", children: viewCount })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "border-t border-default absolute md:relative w-full left-0 bottom-0 z-10 bg-surface-default", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full py-4 px-4 flex justify-between items-center space-x-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-between items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { tabIndex: -1, icon: outline_1.ArrowDownTrayIcon, variant: "outline", color: "default", "aria-label": "download file", loading: downloading, onClick: () => {
                                                        if (info) {
                                                            onDownload(info?.galleryImageLink, info?.id, () => {
                                                                sensors.track('GalleryPicDownload', {
                                                                    picture_id: info?.galleryImageLink,
                                                                    bot_id: info?.botId,
                                                                    bot_name: info?.botName,
                                                                    creator_id: info.authInfo?.userId,
                                                                    creator_name: info.authInfo?.name
                                                                });
                                                            });
                                                        }
                                                    }, className: "flex-1 min-w-none", children: t('chat.Download') }), info && ((0, jsx_runtime_1.jsx)(GalleryShareBtn_1.default, { id: info?.id, botId: info?.botId, successCb: () => {
                                                        sensors.track('GalleryPicShare', {
                                                            picture_id: info?.galleryImageLink,
                                                            bot_id: info?.botId,
                                                            bot_name: info?.botName,
                                                            creator_id: info?.authInfo?.userId,
                                                            creator_name: info?.authInfo?.name
                                                        });
                                                    } }))] }) }) })] })] })] })) }));
}
