"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatPublish;
const jsx_runtime_1 = require("react/jsx-runtime");
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const PhotoStack_1 = __importDefault(require("../../../common/components/icons/chat/PhotoStack.js"));
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const usePublishGallery_1 = __importDefault(require("../../../gallery/hooks/usePublishGallery.js"));
const GalleryPublishTipModal_1 = __importDefault(require("../../../gallery/views/GalleryPublishTipModal.js"));
const store_1 = require("../../../services/store/index.js");
function ChatPublish() {
    const t = (0, next_intl_1.useTranslations)();
    const multiPublishMap = (0, store_1.useChatStore)(state => state.multiPublishMap);
    const clearMultiPublishMap = (0, store_1.useChatStore)(state => state.clearMultiPublishMap);
    const setInputType = (0, store_1.useChatStore)(state => state.setInputType);
    const inputType = (0, store_1.useChatStore)(state => state.inputType);
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const { publishing, publishGalleryList } = (0, usePublishGallery_1.default)();
    const [publishState, setPublishState] = (0, react_1.useState)('info');
    const [popupConfirmVisible, setPopupConfirmVisible] = (0, react_1.useState)(false);
    const { success } = (0, useNotification_1.useNotification)();
    const flagUserFirstPublishGallery = (0, store_1.useUserStore)(state => state.flagUserFirstPublishGallery);
    const publishSuccessCb = (0, react_1.useCallback)(() => {
        if (publishState === 'info' && !flagUserFirstPublishGallery) {
            setPublishState('success');
        }
        else {
            success({
                content: t('chat.publish_success')
            });
            setPublishState('info');
            setPopupConfirmVisible(false);
            setInputType('text');
        }
    }, [setInputType, setPublishState, flagUserFirstPublishGallery, publishState]);
    const confirmHandler = (0, react_1.useCallback)(() => {
        if (publishState === 'success') {
            setPublishState('info');
            setPopupConfirmVisible(false);
        }
        else {
            publishGalleryList(publishSuccessCb);
        }
    }, [publishState, publishGalleryList, publishSuccessCb]);
    const handlePublish = () => {
        if (!Object.keys(multiPublishMap).length) {
            return;
        }
        if (flagUserFirstPublishGallery) {
            publishGalleryList(publishSuccessCb);
        }
        else {
            setPopupConfirmVisible(true);
        }
    };
    const handleBackToPreviousInputType = () => {
        setInputType('text');
        clearMultiPublishMap();
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [inputType === 'publish' && ((0, jsx_runtime_1.jsx)("div", { className: "w-full z-10 border-t border-default", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative chat-share bg-surface-default w-full flex justify-center items-center flex-col', isMobile ? ' h-[116px]' : 'h-[108px] px-24'), children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "primary", icon: PhotoStack_1.default, size: isMobile ? 'sm' : 'lg', onClick: handlePublish, color: "default", className: "rounded-xl", loading: publishing, disabled: Object.keys(multiPublishMap)?.length === 0 }), (0, jsx_runtime_1.jsx)("span", { className: "text-default mt-1.5", children: t('chat.publish_to_gallery') })] }), !isMobile && ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", icon: XMarkIcon_1.default, size: "md", onClick: () => handleBackToPreviousInputType(), color: "default", className: "absolute top-4 right-6" }))] }) })), (0, jsx_runtime_1.jsx)(GalleryPublishTipModal_1.default, { publishing: publishing, publishState: publishState, open: popupConfirmVisible, onClose: () => {
                    setPopupConfirmVisible(false);
                    if (publishState === 'success') {
                        setInputType('text');
                        setPublishState('info');
                    }
                }, onConfirm: confirmHandler })] }));
}
