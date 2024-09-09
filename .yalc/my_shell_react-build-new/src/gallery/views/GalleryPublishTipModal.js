import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useMedia } from 'react-use';
import { Modal } from '../../common/components/ui/modal.js';
import { useRoute } from '../../common/hooks/useRoute.js';
import UserDetailModal from '../../components/profile/UserDetailModal.js';
import { useUserStore } from '../../services/store/index.js';
export default function GalleryPublishTipModal({ publishing, open, publishState, onClose, onConfirm }) {
    const t = useTranslations();
    const router = useRoute();
    const user = useUserStore(state => state.user);
    const isMobile = useMedia('(max-width: 768px)');
    const [showUserDetail, setShowUserDetail] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Modal, { overlayClose: !publishing, hideClose: publishing, open: open, onClose: onClose, onConfirm: () => {
                    if (publishState === 'success' && user) {
                        if (isMobile) {
                            router.openUrl(`/m/explore/profile/${encodeURIComponent(user.name)}/${encodeURIComponent(user.nameTag)}?from=gallery`);
                        }
                        else {
                            setShowUserDetail(true);
                            onClose();
                        }
                    }
                    else {
                        onConfirm();
                    }
                }, state: publishState || 'info', confirmText: publishState === 'success' ? t('chat.go_to_profile') : t('workshop.publish'), isNotification: true, title: publishState === 'success' ? t('chat.publish_success') : t('chat.user_tips'), description: publishState === 'success' ? t('chat.publish_success_content') : t('chat.publish_tip_content'), confirmLoading: publishing, overlayClassName: "z-[110]", contentClassName: "z-[110]" }), showUserDetail && (_jsx(UserDetailModal, { isOpen: showUserDetail, onClose: () => setShowUserDetail(false), userName: user?.name, nameTag: user?.nameTag, defaultTab: "gallery" }))] }));
}
