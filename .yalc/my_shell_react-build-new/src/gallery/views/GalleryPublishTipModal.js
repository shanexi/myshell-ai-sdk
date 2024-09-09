"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalleryPublishTipModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const modal_1 = require("../../common/components/ui/modal");
const useRoute_1 = require("../../common/hooks/useRoute");
const UserDetailModal_1 = __importDefault(require("../../components/profile/UserDetailModal"));
const store_1 = require("../../services/store");
function GalleryPublishTipModal({ publishing, open, publishState, onClose, onConfirm }) {
    const t = (0, next_intl_1.useTranslations)();
    const router = (0, useRoute_1.useRoute)();
    const user = (0, store_1.useUserStore)(state => state.user);
    const isMobile = (0, react_use_1.useMedia)('(max-width: 768px)');
    const [showUserDetail, setShowUserDetail] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(modal_1.Modal, { overlayClose: !publishing, hideClose: publishing, open: open, onClose: onClose, onConfirm: () => {
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
                }, state: publishState || 'info', confirmText: publishState === 'success' ? t('chat.go_to_profile') : t('workshop.publish'), isNotification: true, title: publishState === 'success' ? t('chat.publish_success') : t('chat.user_tips'), description: publishState === 'success' ? t('chat.publish_success_content') : t('chat.publish_tip_content'), confirmLoading: publishing, overlayClassName: "z-[110]", contentClassName: "z-[110]" }), showUserDetail && ((0, jsx_runtime_1.jsx)(UserDetailModal_1.default, { isOpen: showUserDetail, onClose: () => setShowUserDetail(false), userName: user?.name, nameTag: user?.nameTag, defaultTab: "gallery" }))] }));
}
