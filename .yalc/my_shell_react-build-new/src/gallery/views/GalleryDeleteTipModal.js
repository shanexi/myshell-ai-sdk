import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import { Modal } from '../../common/components/ui/modal.js';
export default function GalleryDeleteTipModal({ deleting, open, onClose, onConfirm }) {
    const t = useTranslations();
    return (_jsx(Modal, { overlayClose: !deleting, hideClose: deleting, open: open, onClose: onClose, onConfirm: onConfirm, state: "warning", confirmText: t('common.delete'), isNotification: true, title: t('chat.delete_confirmation.header'), description: t('chat.delete_gallery'), confirmLoading: deleting, overlayClassName: "z-[110]", contentClassName: "z-[110]" }));
}
