"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalleryDeleteTipModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const modal_1 = require("../../common/components/ui/modal");
function GalleryDeleteTipModal({ deleting, open, onClose, onConfirm }) {
    const t = (0, next_intl_1.useTranslations)();
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { overlayClose: !deleting, hideClose: deleting, open: open, onClose: onClose, onConfirm: onConfirm, state: "warning", confirmText: t('common.delete'), isNotification: true, title: t('chat.delete_confirmation.header'), description: t('chat.delete_gallery'), confirmLoading: deleting, overlayClassName: "z-[110]", contentClassName: "z-[110]" }));
}
