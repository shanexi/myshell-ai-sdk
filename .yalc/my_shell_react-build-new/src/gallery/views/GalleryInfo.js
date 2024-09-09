'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { DocumentDuplicateIcon, ArrowDownTrayIcon, ChevronRightIcon, EyeIcon, PaperClipIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import EyeSlashIcon from '@heroicons/react/24/outline/EyeSlashIcon';
import clsx from 'clsx';
import throttle from 'lodash-es/throttle';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import NotFoundIcon from '../../common/components/icons/NotFoundIcon.js';
import { Avatar } from '../../common/components/ui/avatar.js';
import { Button } from '../../common/components/ui/button.js';
import { Icon } from '../../common/components/ui/icon.js';
import { IconButton } from '../../common/components/ui/icon-button.js';
import { Image } from '../../common/components/ui/image.js';
import { Display, Text } from '../../common/components/ui/typography.js';
import useCopyClipboard from '../../common/hooks/useCopyClipboard.js';
import useDownload from '../../common/hooks/useDownload.js';
import { useNotification } from '../../common/hooks/useNotification.js';
import { usePathLocale } from '../../common/hooks/usePathLocale.js';
import { useMemoScrollPosition, useRestoreScrollPosition } from '../../common/hooks/useRestoreScrollPosition.js';
import { useRoute } from '../../common/hooks/useRoute.js';
import { identityService } from '../../common/services/identityService.js';
import { useSensors } from '../../lib/sensors/index.js';
import { cn } from '../../lib/utils.js';
import { useUserStore } from '../../services/store/index.js';
import GalleryAuthorInfo from './GalleryAuthorInfo.js';
import GalleryShareBtn from './GalleryShareBtn.js';
import GalleryInfoSkeleon from './skeleton/GalleryInfoSkeleon.js';
import { getGalleryDetailById } from '../modal/api.js';
export default function GalleryInfo({ item, botId, galleryId, isShare = false, isMobile, deleteCallback, followCallback }) {
    const t = useTranslations();
    const router = useRoute();
    const { success } = useNotification();
    const { downloading, onDownload } = useDownload();
    const params = useSearchParams();
    const showNsfw = useUserStore(state => state.showNsfw);
    const isVisitor = useUserStore(state => state.isVisitor);
    const [info, setInfo] = useState(item);
    const [isCopied, setIsCopied] = useState(false);
    const { error } = useNotification();
    const sensors = useSensors();
    const nsfw = info?.isNsfw && (isVisitor === 1 || !(showNsfw === 1));
    const onCopySuccess = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
            handleMouseLeave();
        }, 5000);
    };
    const { onCopy } = useCopyClipboard('', '', onCopySuccess);
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseEnter = () => {
        setIsHovering(true);
    };
    const handleMouseLeave = () => {
        setIsHovering(false);
    };
    const viewCount = useMemo(() => {
        const count = info?.viewCount || 0;
        if (count >= 1000) {
            const formatCount = `${(count / 1000).toFixed(1)}k`;
            return formatCount.endsWith('.0') ? `${formatCount.slice(0, -2)}k` : `${formatCount}`;
        }
        return count;
    }, [info?.viewCount]);
    const [fetchError, setFetchError] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const getDetail = async () => {
        setFetchLoading(true);
        const res = await getGalleryDetailById(galleryId);
        if (res.success) {
            const { data } = res;
            setInfo(data.info);
        }
        else {
            setFetchError(true);
        }
        setFetchLoading(false);
    };
    const searchParams = useSearchParams();
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
    useEffect(() => {
        if (!item?.id) {
            getDetail();
        }
        else {
            setInfo(info);
        }
    }, [item?.id]);
    const code = params.get('code');
    useEffect(() => {
        if (code) {
            identityService.setSharingForumCode(code);
        }
    }, []);
    const { pathname } = usePathLocale();
    const scrollRef = useRef(null);
    const memoScrollPosition = useMemoScrollPosition(scrollRef);
    const pageId = 'gallery-info-page';
    useRestoreScrollPosition(scrollRef, true);
    useEffect(() => {
        function handleScroll() {
            isMobile && memoScrollPosition(pageId);
        }
        const containerEl = scrollRef.current;
        if (containerEl) {
            containerEl.addEventListener('scroll', throttle(handleScroll, 500), true);
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
        return _jsx(GalleryInfoSkeleon, {});
    if (!info && !fetchError)
        return null;
    return (_jsx("div", { className: "w-full h-full flex flex-col md:flex-row overflow-y-hidden md:overflow-y-auto md:overflow-hidden rounded-b-2xl", children: fetchError ? (_jsxs("div", { className: "w-full h-full flex flex-col justify-center items-center", children: [_jsx(NotFoundIcon, {}), _jsx(Display, { size: "sm", className: "mt-8 md:mt-12", children: t('invalid_link') }), _jsx(Text, { size: "sm", color: "subtle", className: "mt-1.5 text-center md:text-left", children: t('invalid_link_tip') }), _jsx(Button, { variant: "primary", size: "lg", className: "mt-6 flex justify-center items-center", onClick: () => {
                        router.openUrl(`/gallery/${botId}`);
                    }, children: t('explore') })] })) : (_jsxs(_Fragment, { children: [isMobile && info && (_jsx(GalleryAuthorInfo, { isMobile: isMobile, item: info, botId: botId, followCallback: followCallback, deleteCallback: deleteHandle })), _jsxs("div", { ref: scrollRef, id: pageId, className: "w-full h-auto flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-y-hidden z-[2]", children: [_jsxs("div", { className: "relative w-full md:w-[69.9%] max-w-[836px]", children: [_jsxs("div", { className: "w-full h-full flex justify-center items-center bg-surface-default", children: [!isMobile && code && (_jsx("div", { className: cn('absolute left-6 top-3 flex z-10 space-x-3'), children: _jsx(IconButton, { onClick: onBackGallery, icon: ArrowLeftIcon, size: "md", variant: "primary", color: "gray" }) })), info?.galleryImageLink && (_jsx(Image, { className: "w-full !h-auto object-none object-top", imgClassName: cn('max-h-[540px] min-w-[96px] min-h-[96px] md:min-h-[96px] md:max-h-[836px] md:max-w-[836px] object-contain object-center', nsfw ? 'min-h-[220px]' : 'min-h-[96px]'), src: info.galleryImageLink, alt: `ai art photo:${info?.generationInfo?.sourceText}` }))] }), nsfw && (_jsxs("div", { className: "absolute top-0 bottom-0 bg-beta-black-10 w-full h-full flex flex-col items-center justify-center space-y-1", style: {
                                        backdropFilter: 'blur(80px)',
                                        WebkitBackdropFilter: 'blur(80px)',
                                        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.80) 100%)'
                                    }, children: [_jsx(Icon, { component: EyeSlashIcon, size: "4xl", color: "static" }), _jsx(Text, { size: "lg", color: "static", children: t('workshop.nsfw_bot_text') }), _jsx(Text, { size: "sm", className: "opacity-80 text-center max-w-[248px]", color: "static", children: t('workshop.nsfw_gallery_user_content') }), _jsx(Button, { size: "md", icon: ChevronRightIcon, iconDirection: "right", color: "brand", variant: "primary", onClick: () => {
                                                router.openUrl('/profile/settings');
                                            }, className: "!mt-3", children: t('workshop.nsfw_bot_user_button') })] }))] }), _jsxs("div", { className: "flex-1 flex-shrink-0 flex flex-col bg-surface-default w-full md:w-[31.1%] min-w-[300px] text-justify md:border-l md:border-default", children: [!isMobile && info && (_jsx(GalleryAuthorInfo, { isMobile: isMobile, item: info, botId: botId, followCallback: followCallback, deleteCallback: deleteHandle })), _jsxs("div", { className: "px-3 md:px-4 space-y-4 py-4 flex-1 overflow-y-auto pb-[107px] md:pb-0", children: [_jsxs(Text, { size: "sm", color: "subtle", className: clsx('block relative md:p-2 min-h-11', {
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
                                            }, children: [info?.generationInfo?.sourceText || t('chat.no_text_input'), info?.generationInfo?.sourceText && isHovering && (_jsx("div", { className: "absolute bottom-2 right-0 p-2 h-7 rounded-full flex justify-center items-center", onClick: e => {
                                                        onCopy(`${info?.generationInfo?.sourceText}`);
                                                    }, children: _jsx(Button, { icon: DocumentDuplicateIcon, size: "sm", variant: "primary", color: "gray", "aria-label": "copy text", className: "flex-1 min-w-none", children: isCopied ? t('common.copied') : t('common.copy') }) }))] }), info?.generationInfo?.sourceImageLink && (_jsxs("div", { className: "relative w-14 h-14", onClick: () => {
                                                if (nsfw) {
                                                    router.openUrl('/profile/settings');
                                                }
                                                else {
                                                    router.openUrl(info?.generationInfo?.sourceImageLink);
                                                }
                                            }, children: [nsfw && info?.generationInfo?.sourceImageLink && (_jsx("div", { className: "absolute top-0 bottom-0 z-[1] bg-beta-black-10 w-full h-full flex flex-col items-center justify-center space-y-1 rounded-xl cursor-pointer", style: {
                                                        backdropFilter: 'blur(20px)',
                                                        background: isMobile
                                                            ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.80) 100%)'
                                                            : ''
                                                    }, children: _jsx(Icon, { component: EyeSlashIcon, size: "xl", color: "inverse" }) })), _jsx(Avatar, { size: "2xl", src: info?.generationInfo?.sourceImageLink }), _jsx("div", { className: "absolute right-0 bottom-0 w-4.5 h-4.5 bg-surface-default flex justify-center items-center rounded-md", children: _jsx(Icon, { component: PaperClipIcon, size: "xs", className: "flex justify-center items-center border-2 border-surface-default" }) })] })), _jsxs("div", { className: "md:px-2 flex-shrink-0 space-x-1 flex justify-start items-center", children: [_jsx(Icon, { component: EyeIcon, size: "md", color: "subtlest" }), _jsx(Text, { size: "sm", className: "flex-shrink-0 ", color: "subtlest", children: viewCount })] })] }), _jsx("div", { className: "border-t border-default absolute md:relative w-full left-0 bottom-0 z-10 bg-surface-default", children: _jsx("div", { className: "w-full py-4 px-4 flex justify-between items-center space-x-4", children: _jsxs("div", { className: "w-full flex justify-between items-center space-x-4", children: [_jsx(Button, { tabIndex: -1, icon: ArrowDownTrayIcon, variant: "outline", color: "default", "aria-label": "download file", loading: downloading, onClick: () => {
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
                                                    }, className: "flex-1 min-w-none", children: t('chat.Download') }), info && (_jsx(GalleryShareBtn, { id: info?.id, botId: info?.botId, successCb: () => {
                                                        sensors.track('GalleryPicShare', {
                                                            picture_id: info?.galleryImageLink,
                                                            bot_id: info?.botId,
                                                            bot_name: info?.botName,
                                                            creator_id: info?.authInfo?.userId,
                                                            creator_name: info?.authInfo?.name
                                                        });
                                                    } }))] }) }) })] })] })] })) }));
}
