"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalleryList;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const ErrorState_1 = __importDefault(require("../../common/components/ErrorState.js"));
const PhotoStack_1 = __importDefault(require("../../common/components/icons/chat/PhotoStack.js"));
const icon_1 = require("../../common/components/ui/icon.js");
const masonry_1 = __importDefault(require("../../common/components/ui/masonry.js"));
const skeleton_1 = require("../../common/components/ui/skeleton.js");
const typography_1 = require("../../common/components/ui/typography.js");
const user_1 = require("../../common/constants/enums/user.js");
const gallery_1 = require("../../services/store/gallery.js");
const GalleryCard_1 = __importDefault(require("./GalleryCard.js"));
const GalleryListSkeleton_1 = __importDefault(require("./skeleton/GalleryListSkeleton.js"));
const useGetGalleryList_1 = __importDefault(require("../hooks/useGetGalleryList.js"));
function GalleryList({ className, userId, containerRef }) {
    const t = (0, next_intl_1.useTranslations)();
    const isMobile = (0, react_use_1.useMedia)('(max-width: 768px)');
    const galleryUserList = (0, gallery_1.useGalleryStore)(state => state.galleryUserList);
    const setGalleryUserList = (0, gallery_1.useGalleryStore)(state => state.setGalleryUserList);
    const { fetchEmpty, fetchError, loading, getGalleryData, hasMore, nextPageToken } = (0, useGetGalleryList_1.default)({
        userId
    });
    (0, react_1.useEffect)(() => {
        getGalleryData('0');
    }, []);
    const handleScroll = (0, react_1.useCallback)(() => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                getGalleryData(nextPageToken);
            }
        }
    }, [nextPageToken]);
    (0, react_1.useEffect)(() => {
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
            const status = item.authInfo.followStatus === user_1.FollowStatus.FOLLOWED ? user_1.FollowStatus.NOT_FOLLOWED : user_1.FollowStatus.FOLLOWED;
            item.authInfo.userId === userId && (item.authInfo.followStatus = status);
            return item;
        });
        setGalleryUserList(galleryListUpdate);
    };
    if (!userId) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "px-2 md:px-3.5", children: [loading && galleryUserList.length === 0 && (0, jsx_runtime_1.jsx)(GalleryListSkeleton_1.default, { isMobile: isMobile }), !fetchError && galleryUserList?.length > 0 ? ((0, jsx_runtime_1.jsxs)(masonry_1.default, { className: "my-masonry-grid", columnClassName: "my-masonry-grid_column", children: [galleryUserList?.map((item, i) => {
                        return ((0, jsx_runtime_1.jsx)(GalleryCard_1.default, { item: item, deleteCallback: (id) => deleteCallback(id), followCallback: () => {
                                followCallback(item.authInfo.userId);
                            }, from: "profile" }, item.id));
                    }), hasMore &&
                        loading &&
                        [...Array(15)].map((_, index) => {
                            const height = Math.random() * 500;
                            return ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { style: {
                                    height: height < 300 ? 300 : height
                                } }, index));
                        })] })) : null, !loading && !fetchError && (fetchEmpty || galleryUserList.length === 0) && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col justify-center items-center px-10 space-y-3", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: PhotoStack_1.default, size: "4xl", color: "subtlest" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-center space-y-1", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", color: "default", children: t('chat.no_content_yet') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtlest", children: t('chat.be_fist_publish') })] })] })), fetchError && ((0, jsx_runtime_1.jsx)(ErrorState_1.default, { onClick: () => {
                    getGalleryData('0');
                }, className: "pt-20" }))] }));
}
