'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Avatar } from '../../common/components/ui/avatar.js';
import { IconButton } from '../../common/components/ui/icon-button.js';
import { Text } from '../../common/components/ui/typography.js';
import { useNotification } from '../../common/hooks/useNotification.js';
import { useRoute } from '../../common/hooks/useRoute.js';
import { getAssetsUrl } from '../../common/utils/common-helper.js';
import { UserFollowBtn } from '../../components/profile/edit-profile/component/UserFollowBtn.js';
import { useSensors } from '../../lib/sensors/index.js';
import { cn, limitStringLength } from '../../lib/utils.js';
import { useUserStore } from '../../services/store/index.js';
import GalleryDeleteTipModal from './GalleryDeleteTipModal.js';
import GalleryMoreActions from './GalleryMoreActions.js';
import { deleteGallery } from '../modal/api.js';
export default function GalleryAuthorInfo({ isMobile, item, botId, deleteCallback, followCallback }) {
    const userId = useUserStore(state => state.userId);
    const router = useRoute();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const searchParams = useSearchParams();
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
    const { error, success } = useNotification();
    const [deleting, setDeleting] = useState(false);
    const t = useTranslations();
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
    const sensors = useSensors();
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
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "border-b border-default", children: _jsxs("div", { className: "w-full py-2.5 md:py-4 px-4 md:px-6 flex justify-between items-center space-x-3 overflow-hidden", children: [_jsxs("div", { className: "flex justify-start items-center space-x-1 w-full overflow-hidden", children: [isMobile && (_jsx("div", { className: cn('flex z-10 space-x-3 left-4'), children: _jsx(IconButton, { onClick: onClose, icon: ArrowLeftIcon, size: "md", variant: "ghost", color: "brand" }) })), _jsxs("div", { className: "flex items-center space-x-2 overflow-hidden", children: [_jsx(Avatar, { size: "md", src: getAssetsUrl(item.authInfo?.avatar) }), _jsx(Text, { size: "lg", lineClamp: 1, weight: "medium", children: limitStringLength(item.authInfo.name, 10) })] })] }), userId && userId !== item.authInfo?.userId ? (_jsx(UserFollowBtn, { size: "sm", detailData: { id: item.authInfo?.userId, followStatus: item.authInfo?.followStatus }, followCallback: (isFollow) => {
                                handleFollow(isFollow);
                            }, className: "min-w-none" })) : (_jsx("div", { className: "w-9 h-9" })), userId === item.authInfo?.userId && handleDelete && _jsx(GalleryMoreActions, { handleDelete: handleDelete })] }) }), _jsx(GalleryDeleteTipModal, { open: showDeleteModal, deleting: deleting, onClose: () => setShowDeleteModal(false), onConfirm: () => deleteGalleryItemHandle() })] }));
}
