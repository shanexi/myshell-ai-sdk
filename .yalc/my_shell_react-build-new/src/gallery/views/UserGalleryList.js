import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';
import { useMedia } from 'react-use';
import ErrorState from '../../common/components/ErrorState.js';
import PhotoStackIcon from '../../common/components/icons/chat/PhotoStack.js';
import { Icon } from '../../common/components/ui/icon.js';
import Masonry from '../../common/components/ui/masonry.js';
import { Skeleton } from '../../common/components/ui/skeleton.js';
import { Display, Text } from '../../common/components/ui/typography.js';
import { FollowStatus } from '../../common/constants/enums/user.js';
import { useGalleryStore } from '../../services/store/gallery.js';
import GalleryCard from './GalleryCard.js';
import GalleryListSkeleton from './skeleton/GalleryListSkeleton.js';
import useGetGalleryList from '../hooks/useGetGalleryList.js';
export default function GalleryList({ className, userId, containerRef }) {
    const t = useTranslations();
    const isMobile = useMedia('(max-width: 768px)');
    const galleryUserList = useGalleryStore(state => state.galleryUserList);
    const setGalleryUserList = useGalleryStore(state => state.setGalleryUserList);
    const { fetchEmpty, fetchError, loading, getGalleryData, hasMore, nextPageToken } = useGetGalleryList({
        userId
    });
    useEffect(() => {
        getGalleryData('0');
    }, []);
    const handleScroll = useCallback(() => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                getGalleryData(nextPageToken);
            }
        }
    }, [nextPageToken]);
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);
    const deleteCallback = (id) => {
        const galleryListFilter = galleryUserList?.filter(item => item.id !== id);
        setGalleryUserList(galleryListFilter);
    };
    const followCallback = (userId) => {
        const galleryListUpdate = galleryUserList?.map(item => {
            const status = item.authInfo.followStatus === FollowStatus.FOLLOWED ? FollowStatus.NOT_FOLLOWED : FollowStatus.FOLLOWED;
            item.authInfo.userId === userId && (item.authInfo.followStatus = status);
            return item;
        });
        setGalleryUserList(galleryListUpdate);
    };
    if (!userId) {
        return null;
    }
    return (_jsxs("div", { className: "px-2 md:px-3.5", children: [loading && galleryUserList.length === 0 && _jsx(GalleryListSkeleton, { isMobile: isMobile }), !fetchError && galleryUserList?.length > 0 ? (_jsxs(Masonry, { className: "my-masonry-grid", columnClassName: "my-masonry-grid_column", children: [galleryUserList?.map((item, i) => {
                        return (_jsx(GalleryCard, { item: item, deleteCallback: (id) => deleteCallback(id), followCallback: () => {
                                followCallback(item.authInfo.userId);
                            }, from: "profile" }, item.id));
                    }), hasMore &&
                        loading &&
                        [...Array(15)].map((_, index) => {
                            const height = Math.random() * 500;
                            return (_jsx(Skeleton, { style: {
                                    height: height < 300 ? 300 : height
                                } }, index));
                        })] })) : null, !loading && !fetchError && (fetchEmpty || galleryUserList.length === 0) && (_jsxs("div", { className: "w-full h-full flex flex-col justify-center items-center px-10 space-y-3", children: [_jsx(Icon, { component: PhotoStackIcon, size: "4xl", color: "subtlest" }), _jsxs("div", { className: "flex flex-col justify-center items-center space-y-1", children: [_jsx(Display, { size: "sm", color: "default", children: t('chat.no_content_yet') }), _jsx(Text, { size: "sm", color: "subtlest", children: t('chat.be_fist_publish') })] })] })), fetchError && (_jsx(ErrorState, { onClick: () => {
                    getGalleryData('0');
                }, className: "pt-20" }))] }));
}
