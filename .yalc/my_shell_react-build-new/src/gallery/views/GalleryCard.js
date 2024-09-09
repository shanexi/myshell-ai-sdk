import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import EyeSlashIcon from '@heroicons/react/24/outline/EyeSlashIcon';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { useMedia } from 'react-use';
import { Avatar } from '../../common/components/ui/avatar.js';
import { Icon } from '../../common/components/ui/icon.js';
import { Image } from '../../common/components/ui/image.js';
import Link from '../../common/components/ui/link.js';
import { Modal } from '../../common/components/ui/modal.js';
import { Text } from '../../common/components/ui/typography.js';
import { useNotification } from '../../common/hooks/useNotification.js';
import { getAssetsUrl } from '../../common/utils/common-helper.js';
import { useSensors } from '../../lib/sensors/index.js';
import { cn, limitStringLength } from '../../lib/utils.js';
import { useUserStore } from '../../services/store/index.js';
import GalleryDeleteTipModal from './GalleryDeleteTipModal.js';
import GalleryInfo from './GalleryInfo.js';
import { deleteGallery } from '../modal/api.js';
export default function GalleryCard({ item, from = 'gallery', deleteCallback, followCallback }) {
    const isMobile = useMedia('(max-width: 768px)');
    const router = useRouter();
    const t = useTranslations();
    const [showInfo, setShowInfo] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const pathName = usePathname();
    const showNsfw = useUserStore(state => state.showNsfw);
    const isVisitor = useUserStore(state => state.isVisitor);
    const nsfw = item?.isNsfw && (isVisitor === 1 || !(showNsfw === 1));
    const userId = useUserStore(state => state.userId);
    const sensors = useSensors();
    const viewCount = useMemo(() => {
        const count = item?.viewCount;
        if (count >= 1000) {
            const formatCount = `${(item.viewCount / 1000).toFixed(1)}k`;
            return formatCount.endsWith('.0') ? `${formatCount.slice(0, -2)}k` : `${formatCount}`;
        }
        return count;
    }, [item?.viewCount]);
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseEnter = () => {
        setIsHovering(true);
    };
    const handleMouseLeave = () => {
        setIsHovering(false);
    };
    const showDeleteModalHandle = () => {
        setShowDeleteModal(true);
    };
    const { error, success } = useNotification();
    const [deleting, setDeleting] = useState(false);
    const deleteGalleryItemHandle = async () => {
        setDeleting(true);
        const res = await deleteGallery(item.id);
        if (res.success) {
            success({
                content: t('common.delete_success')
            });
            setDeleting(false);
            setShowDeleteModal(false);
            deleteCallback?.(item.id);
        }
        else {
            error({
                content: t('common.delete_error')
            });
            setDeleting(false);
        }
    };
    const cardClickHandle = (e) => {
        sensors.track('GalleryPicClick', {
            bot_id: item.botId,
            bot_name: item.botName,
            picture_id: item.galleryImageLink,
            creator_id: item.authInfo.userId,
            creator_name: item.authInfo.name
        });
        if (!isMobile) {
            e.preventDefault();
            e.stopPropagation();
            setShowInfo(true);
        }
    };
    useEffect(() => {
        if (!showInfo) {
            document.body.style.pointerEvents = '';
        }
    }, [showInfo]);
    return (_jsxs(_Fragment, { children: [_jsxs(Link, { href: `${isMobile ? '/m' : ''}/gallery/${item.botId}/${item.id}?from=${from}&prevPath=${pathName}`, className: "block relative rounded-xl overflow-hidden cursor-pointer", onMouseEnter: () => {
                    if (!isMobile) {
                        handleMouseEnter();
                    }
                }, onMouseLeave: () => {
                    if (!isMobile) {
                        handleMouseLeave();
                    }
                }, onClick: cardClickHandle, children: [_jsx("div", { className: "rounded-xl overflow-hidden ease-in-out duration-300 hover:scale-105", children: _jsx(Image, { className: "rounded-xl min-h-[220px] max-h-[360px] md:max-h-[440px] bg-surface-container-low overflow-hidden", imgClassName: "min-h-[220px] max-h-[360px] md:max-h-[440px] object-cover", src: item.galleryImageLink, alt: `ai art photo:${item?.generationInfo?.sourceText}` }) }), _jsxs("div", { className: cn('absolute z-10 w-full p-3 overflow-hidden', nsfw ? 'bottom-0 left-0 h-full flex flex-col justify-end rounded-xl' : 'bottom-0 left-0 rounded-b-xl'), style: {
                            backdropFilter: nsfw ? 'blur(32px)' : '',
                            WebkitBackdropFilter: nsfw ? 'blur(32px)' : '',
                            background: nsfw
                                ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.80) 100%)'
                                : 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 100%)'
                        }, children: [nsfw && (_jsxs("div", { className: "absolute top-0 left-0 p-5 w-full h-full flex flex-col justify-center items-center space-y-1 rounded-xl", children: [_jsx(Icon, { component: EyeSlashIcon, size: "4xl", color: "static" }), _jsx(Text, { size: "lg", color: "static", children: t('workshop.nsfw_bot_text') }), _jsx(Text, { size: "sm", className: "opacity-60 text-center", color: "static", children: t('workshop.nsfw_gallery_user_content') })] })), _jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { className: "flex-1 flex justify-start items-center space-x-1.5 max-w-[70%]", children: [_jsx(Avatar, { size: "xs", src: getAssetsUrl(item.authInfo.avatar) }), _jsx(Text, { size: "sm", className: "w-full", weight: "medium", color: "static", lineClamp: 1, children: isMobile ? item.authInfo.name : limitStringLength(item.authInfo.name, 10) })] }), _jsxs("div", { className: "flex-shrink-0 space-x-1 flex justify-end items-center", children: [_jsx(Icon, { component: EyeIcon, size: isMobile ? 'xs' : 'md', color: "static" }), _jsx(Text, { size: isMobile ? 'xs' : 'sm', className: "flex-shrink-0 ", color: "static", children: viewCount })] })] })] }), userId === item.authInfo.userId && isHovering && (_jsx("div", { className: "absolute z-20 top-2 right-2 p-2 rounded-full bg-beta-black-20 h-9 w-9 flex justify-center items-center", style: { backdropFilter: 'blur(12px)' }, onClick: e => {
                            e.stopPropagation();
                            e.preventDefault();
                            showDeleteModalHandle();
                        }, children: _jsx(Icon, { component: TrashIcon, color: "static" }) }))] }), _jsx(Modal, { open: showInfo, onClose: () => {
                    setShowInfo(false);
                }, onOpenChange: open => {
                    !open && setShowInfo(false);
                }, overlayClassName: "z-[90]", contentClassName: "w-[90%] max-w-[1197px] h-[calc(100vh-64px)] max-h-[836px] overflow-hidden rounded-2xl z-[100] bg-transparent", fullScreen: true, hideClose: true, children: _jsx("div", { className: "relative overflow-hidden w-full h-full rounded-2xl", children: _jsx("div", { className: "w-full h-full relative overflow-hidden", children: _jsx(GalleryInfo, { item: item, botId: item.botId, galleryId: item.id, deleteCallback: () => {
                                setShowInfo(false);
                                deleteCallback?.(item.id);
                            }, followCallback: followCallback }) }) }) }), _jsx(GalleryDeleteTipModal, { open: showDeleteModal, deleting: deleting, onClose: () => setShowDeleteModal(false), onConfirm: () => deleteGalleryItemHandle() })] }));
}
