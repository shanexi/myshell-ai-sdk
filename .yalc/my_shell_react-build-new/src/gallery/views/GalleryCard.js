"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalleryCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const outline_1 = require("@heroicons/react/24/outline");
const EyeSlashIcon_1 = __importDefault(require("@heroicons/react/24/outline/EyeSlashIcon"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const avatar_1 = require("../../common/components/ui/avatar.js");
const icon_1 = require("../../common/components/ui/icon.js");
const image_1 = require("../../common/components/ui/image.js");
const link_1 = __importDefault(require("../../common/components/ui/link.js"));
const modal_1 = require("../../common/components/ui/modal.js");
const typography_1 = require("../../common/components/ui/typography.js");
const useNotification_1 = require("../../common/hooks/useNotification.js");
const common_helper_1 = require("../../common/utils/common-helper.js");
const sensors_1 = require("../../lib/sensors/index.js");
const utils_1 = require("../../lib/utils.js");
const store_1 = require("../../services/store/index.js");
const GalleryDeleteTipModal_1 = __importDefault(require("./GalleryDeleteTipModal.js"));
const GalleryInfo_1 = __importDefault(require("./GalleryInfo.js"));
const api_1 = require("../modal/api.js");
function GalleryCard({ item, from = 'gallery', deleteCallback, followCallback }) {
    const isMobile = (0, react_use_1.useMedia)('(max-width: 768px)');
    const router = (0, navigation_1.useRouter)();
    const t = (0, next_intl_1.useTranslations)();
    const [showInfo, setShowInfo] = (0, react_1.useState)(false);
    const [showDeleteModal, setShowDeleteModal] = (0, react_1.useState)(false);
    const pathName = (0, navigation_1.usePathname)();
    const showNsfw = (0, store_1.useUserStore)(state => state.showNsfw);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const nsfw = item?.isNsfw && (isVisitor === 1 || !(showNsfw === 1));
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const sensors = (0, sensors_1.useSensors)();
    const viewCount = (0, react_1.useMemo)(() => {
        const count = item?.viewCount;
        if (count >= 1000) {
            const formatCount = `${(item.viewCount / 1000).toFixed(1)}k`;
            return formatCount.endsWith('.0') ? `${formatCount.slice(0, -2)}k` : `${formatCount}`;
        }
        return count;
    }, [item?.viewCount]);
    const [isHovering, setIsHovering] = (0, react_1.useState)(false);
    const handleMouseEnter = () => {
        setIsHovering(true);
    };
    const handleMouseLeave = () => {
        setIsHovering(false);
    };
    const showDeleteModalHandle = () => {
        setShowDeleteModal(true);
    };
    const { error, success } = (0, useNotification_1.useNotification)();
    const [deleting, setDeleting] = (0, react_1.useState)(false);
    const deleteGalleryItemHandle = async () => {
        setDeleting(true);
        const res = await (0, api_1.deleteGallery)(item.id);
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
    (0, react_1.useEffect)(() => {
        if (!showInfo) {
            document.body.style.pointerEvents = '';
        }
    }, [showInfo]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(link_1.default, { href: `${isMobile ? '/m' : ''}/gallery/${item.botId}/${item.id}?from=${from}&prevPath=${pathName}`, className: "block relative rounded-xl overflow-hidden cursor-pointer", onMouseEnter: () => {
                    if (!isMobile) {
                        handleMouseEnter();
                    }
                }, onMouseLeave: () => {
                    if (!isMobile) {
                        handleMouseLeave();
                    }
                }, onClick: cardClickHandle, children: [(0, jsx_runtime_1.jsx)("div", { className: "rounded-xl overflow-hidden ease-in-out duration-300 hover:scale-105", children: (0, jsx_runtime_1.jsx)(image_1.Image, { className: "rounded-xl min-h-[220px] max-h-[360px] md:max-h-[440px] bg-surface-container-low overflow-hidden", imgClassName: "min-h-[220px] max-h-[360px] md:max-h-[440px] object-cover", src: item.galleryImageLink, alt: `ai art photo:${item?.generationInfo?.sourceText}` }) }), (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('absolute z-10 w-full p-3 overflow-hidden', nsfw ? 'bottom-0 left-0 h-full flex flex-col justify-end rounded-xl' : 'bottom-0 left-0 rounded-b-xl'), style: {
                            backdropFilter: nsfw ? 'blur(32px)' : '',
                            WebkitBackdropFilter: nsfw ? 'blur(32px)' : '',
                            background: nsfw
                                ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.80) 100%)'
                                : 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 100%)'
                        }, children: [nsfw && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-0 left-0 p-5 w-full h-full flex flex-col justify-center items-center space-y-1 rounded-xl", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: EyeSlashIcon_1.default, size: "4xl", color: "static" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", color: "static", children: t('workshop.nsfw_bot_text') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", className: "opacity-60 text-center", color: "static", children: t('workshop.nsfw_gallery_user_content') })] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex justify-start items-center space-x-1.5 max-w-[70%]", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: "xs", src: (0, common_helper_1.getAssetsUrl)(item.authInfo.avatar) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", className: "w-full", weight: "medium", color: "static", lineClamp: 1, children: isMobile ? item.authInfo.name : (0, utils_1.limitStringLength)(item.authInfo.name, 10) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-shrink-0 space-x-1 flex justify-end items-center", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: outline_1.EyeIcon, size: isMobile ? 'xs' : 'md', color: "static" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: isMobile ? 'xs' : 'sm', className: "flex-shrink-0 ", color: "static", children: viewCount })] })] })] }), userId === item.authInfo.userId && isHovering && ((0, jsx_runtime_1.jsx)("div", { className: "absolute z-20 top-2 right-2 p-2 rounded-full bg-beta-black-20 h-9 w-9 flex justify-center items-center", style: { backdropFilter: 'blur(12px)' }, onClick: e => {
                            e.stopPropagation();
                            e.preventDefault();
                            showDeleteModalHandle();
                        }, children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: outline_1.TrashIcon, color: "static" }) }))] }), (0, jsx_runtime_1.jsx)(modal_1.Modal, { open: showInfo, onClose: () => {
                    setShowInfo(false);
                }, onOpenChange: open => {
                    !open && setShowInfo(false);
                }, overlayClassName: "z-[90]", contentClassName: "w-[90%] max-w-[1197px] h-[calc(100vh-64px)] max-h-[836px] overflow-hidden rounded-2xl z-[100] bg-transparent", fullScreen: true, hideClose: true, children: (0, jsx_runtime_1.jsx)("div", { className: "relative overflow-hidden w-full h-full rounded-2xl", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full relative overflow-hidden", children: (0, jsx_runtime_1.jsx)(GalleryInfo_1.default, { item: item, botId: item.botId, galleryId: item.id, deleteCallback: () => {
                                setShowInfo(false);
                                deleteCallback?.(item.id);
                            }, followCallback: followCallback }) }) }) }), (0, jsx_runtime_1.jsx)(GalleryDeleteTipModal_1.default, { open: showDeleteModal, deleting: deleting, onClose: () => setShowDeleteModal(false), onConfirm: () => deleteGalleryItemHandle() })] }));
}
