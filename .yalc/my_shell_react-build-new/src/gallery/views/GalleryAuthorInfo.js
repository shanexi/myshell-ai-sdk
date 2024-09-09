"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalleryAuthorInfo;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/ArrowLeftIcon"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const avatar_1 = require("../../common/components/ui/avatar");
const icon_button_1 = require("../../common/components/ui/icon-button");
const typography_1 = require("../../common/components/ui/typography");
const useNotification_1 = require("../../common/hooks/useNotification");
const useRoute_1 = require("../../common/hooks/useRoute");
const common_helper_1 = require("../../common/utils/common-helper");
const UserFollowBtn_1 = require("../../components/profile/edit-profile/component/UserFollowBtn");
const sensors_1 = require("../../lib/sensors");
const utils_1 = require("../../lib/utils");
const store_1 = require("../../services/store");
const GalleryDeleteTipModal_1 = __importDefault(require("./GalleryDeleteTipModal"));
const GalleryMoreActions_1 = __importDefault(require("./GalleryMoreActions"));
const api_1 = require("../modal/api");
function GalleryAuthorInfo({ isMobile, item, botId, deleteCallback, followCallback }) {
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const router = (0, useRoute_1.useRoute)();
    const [showDeleteModal, setShowDeleteModal] = (0, react_1.useState)(false);
    const searchParams = (0, navigation_1.useSearchParams)();
    const onClose = () => {
        const from = searchParams.get('from');
        const prevPath = searchParams.get('prevPath');
        if (from === 'profile' && prevPath) {
            router.openUrl(`${prevPath.replace('#', '%23')}?from=gallery`);
        }
        else {
            router.openUrl(`/gallery/${botId}`);
        }
    };
    const handleDelete = () => {
        setShowDeleteModal(true);
    };
    const { error, success } = (0, useNotification_1.useNotification)();
    const [deleting, setDeleting] = (0, react_1.useState)(false);
    const t = (0, next_intl_1.useTranslations)();
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
    const sensors = (0, sensors_1.useSensors)();
    const handleFollow = (isFollow) => {
        if (isFollow) {
            sensors.track('GalleryPicFollow', {
                bot_id: item.botId,
                bot_name: item.botName,
                creator_id: item.authInfo.userId,
                creator_name: item.authInfo.name
            });
        }
        followCallback?.();
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-default", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full py-2.5 md:py-4 px-4 md:px-6 flex justify-between items-center space-x-3 overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-start items-center space-x-1 w-full overflow-hidden", children: [isMobile && ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex z-10 space-x-3 left-4'), children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: onClose, icon: ArrowLeftIcon_1.default, size: "md", variant: "ghost", color: "brand" }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 overflow-hidden", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: "md", src: (0, common_helper_1.getAssetsUrl)(item.authInfo?.avatar) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", lineClamp: 1, weight: "medium", children: (0, utils_1.limitStringLength)(item.authInfo.name, 10) })] })] }), userId && userId !== item.authInfo?.userId ? ((0, jsx_runtime_1.jsx)(UserFollowBtn_1.UserFollowBtn, { size: "sm", detailData: { id: item.authInfo?.userId, followStatus: item.authInfo?.followStatus }, followCallback: (isFollow) => {
                                handleFollow(isFollow);
                            }, className: "min-w-none" })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-9 h-9" })), userId === item.authInfo?.userId && handleDelete && (0, jsx_runtime_1.jsx)(GalleryMoreActions_1.default, { handleDelete: handleDelete })] }) }), (0, jsx_runtime_1.jsx)(GalleryDeleteTipModal_1.default, { open: showDeleteModal, deleting: deleting, onClose: () => setShowDeleteModal(false), onConfirm: () => deleteGalleryItemHandle() })] }));
}
