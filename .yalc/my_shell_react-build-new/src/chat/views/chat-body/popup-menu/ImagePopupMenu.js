"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImagePopupMenu;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const bot_1 = require("../../../../apis/bot.js");
const LinkIcon_1 = __importDefault(require("../../../../common/components/icons/LinkIcon.js"));
const SaveIcon_1 = __importDefault(require("../../../../common/components/icons/SaveIcon.js"));
const CopyImageIcon_1 = __importDefault(require("../../../../common/components/icons/chat/CopyImageIcon.js"));
const PhotoStack_1 = __importDefault(require("../../../../common/components/icons/chat/PhotoStack.js"));
const luiContext_1 = require("../../../../common/components/lui/luiContext.js");
const button_1 = require("../../../../common/components/ui/button.js");
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const typography_1 = require("../../../../common/components/ui/typography.js");
const useCopyClipboard_1 = __importDefault(require("../../../../common/hooks/useCopyClipboard.js"));
const useDownload_1 = __importDefault(require("../../../../common/hooks/useDownload.js"));
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const usePublishGallery_1 = __importDefault(require("../../../../gallery/hooks/usePublishGallery.js"));
const GalleryPublishTipModal_1 = __importDefault(require("../../../../gallery/views/GalleryPublishTipModal.js"));
const sensors_1 = require("../../../../lib/sensors/index.js");
const store_1 = require("../../../../services/store/index.js");
var ActionType;
(function (ActionType) {
    ActionType["save_image"] = "Save Image";
    ActionType["copy_image"] = "Copy Image";
    ActionType["copy_image_link"] = "Copy Image Link";
    ActionType["publish_to_gallery"] = "Publish to Gallery";
})(ActionType || (ActionType = {}));
function ImagePopupMenu({ className, isOpen, onClose, children, isProconfigMd, menuPosition, xImage }) {
    const t = (0, next_intl_1.useTranslations)('chat');
    const sensors = (0, sensors_1.useSensors)();
    const { downloading, onDownload } = (0, useDownload_1.default)();
    const { msgId, selectedBot, widgetInfo } = (0, react_2.useContext)(luiContext_1.LUIButtonInteractionContext);
    const { url, imageModel, naturalHeight, naturalWidth } = (0, react_2.useMemo)(() => {
        return JSON.parse(xImage || '{}');
    }, [xImage]);
    const [left, top] = menuPosition;
    const setInputType = (0, store_1.useChatStore)(state => state.setInputType);
    const { onCopy, onCopyImage } = (0, useCopyClipboard_1.default)(url);
    const isImageBot = selectedBot?.isImageGenerator;
    const token = (0, store_1.useUserStore)(state => state.token);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const onSendSensors = (action_type) => {
        if (sensors && sensors.track) {
            if (imageModel) {
                sensors?.track('MessageAction', {
                    action_type,
                    message_id: msgId,
                    ...(widgetInfo?.id
                        ? {
                            widget_id: widgetInfo?.id,
                            widget_name: widgetInfo?.name
                        }
                        : {
                            bot_id: selectedBot?.id,
                            bot_name: selectedBot?.name
                        }),
                    image_model: imageModel
                });
            }
            else {
                (0, bot_1.mediaFileMetadata)({
                    media_file_url: url
                })
                    .then(res => {
                    sensors?.track('MessageAction', {
                        action_type,
                        message_id: msgId,
                        ...(widgetInfo?.id
                            ? {
                                widget_id: widgetInfo?.id,
                                widget_name: widgetInfo?.name
                            }
                            : {
                                bot_id: selectedBot?.id,
                                bot_name: selectedBot?.name
                            }),
                        image_model: res?.meta?.generateModel
                    });
                })
                    .catch(() => {
                    sensors?.track('MessageAction', {
                        action_type,
                        message_id: msgId,
                        ...(widgetInfo?.id
                            ? {
                                widget_id: widgetInfo?.id,
                                widget_name: widgetInfo?.name
                            }
                            : {
                                bot_id: selectedBot?.id,
                                bot_name: selectedBot?.name
                            }),
                        image_model: ''
                    });
                });
            }
        }
    };
    const onDownloadWithSensors = () => {
        onDownload(url, (0, common_helper_1.generateUUID)());
        onClose();
        onSendSensors(ActionType.save_image);
    };
    const onCopyImageWithSensors = () => {
        onCopyImage();
        onClose();
        onSendSensors(ActionType.copy_image);
    };
    const onCopyLinkWithSensors = () => {
        onCopy();
        onClose();
        onSendSensors(ActionType.copy_image_link);
    };
    const setMultiPublishMap = (0, store_1.useChatStore)(state => state.setMultiPublishMap);
    const { publishing, publishGalleryList } = (0, usePublishGallery_1.default)();
    const [publishState, setPublishState] = (0, react_2.useState)('info');
    const [popupConfirmVisible, setPopupConfirmVisible] = (0, react_2.useState)(false);
    const [popupConfirmObj, setPopupConfirmObj] = (0, react_2.useState)(null);
    const { success } = (0, useNotification_1.useNotification)();
    const flagUserFirstPublishGallery = (0, store_1.useUserStore)(state => state.flagUserFirstPublishGallery);
    const publishSuccessCb = (0, react_2.useCallback)(() => {
        if (publishState === 'info' && !flagUserFirstPublishGallery) {
            setPublishState('success');
        }
        else {
            success({
                content: t('publish_success')
            });
            setPublishState('info');
            setPopupConfirmVisible(false);
            setInputType('text');
            onClose();
        }
    }, [setInputType, setPublishState, flagUserFirstPublishGallery, publishState]);
    const confirmHandler = (0, react_2.useCallback)(() => {
        if (publishState === 'success') {
            setPublishState('info');
            setPopupConfirmVisible(false);
        }
        else {
            publishGalleryList(publishSuccessCb, [popupConfirmObj]);
        }
    }, [publishState, publishGalleryList, publishSuccessCb]);
    const publishGalleryHandle = (0, react_2.useCallback)(() => {
        if (publishing)
            return;
        const publishObj = {
            messageId: msgId,
            imageLink: url,
            botId: `${selectedBot?.id}`,
            naturalHeight,
            naturalWidth
        };
        if (flagUserFirstPublishGallery) {
            publishGalleryList(publishSuccessCb, [publishObj]);
        }
        else {
            setPopupConfirmObj(publishObj);
            setPopupConfirmVisible(true);
        }
    }, [publishGalleryList, flagUserFirstPublishGallery]);
    const onPublishToGalleryWithSensors = () => {
        if (!token) {
            toggleLoginModal(true);
            onClose();
        }
        else if (isProconfigMd) {
            publishGalleryHandle();
            onSendSensors(ActionType.publish_to_gallery);
        }
        else {
            setInputType('publish');
            onClose();
            setMultiPublishMap(url, {
                messageId: msgId,
                imageLink: url,
                botId: `${selectedBot?.id}`,
                naturalHeight,
                naturalWidth
            });
            onSendSensors(ActionType.publish_to_gallery);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [xImage && ((0, jsx_runtime_1.jsxs)(react_1.Popover, { closeOnBlur: true, closeOnEsc: true, isOpen: isOpen, onClose: onClose, isLazy: true, placement: "right-start", children: [(0, jsx_runtime_1.jsx)(react_1.PopoverAnchor, { children: (0, jsx_runtime_1.jsx)("div", { className: "absolute z-10 w-4 h-4 opacity-0", id: "popoverAnchor", style: { left: `${left}${typeof left === 'number' ? 'px' : ''}`, top: `${top}px` }, children: ' ' }) }), (0, jsx_runtime_1.jsx)(react_1.PopoverContent, { border: "none", borderRadius: "12px", w: "fit-content", className: "overflow-hidden bg-surface border-none dark:border dark:border-default dark:border-solid z-[999]", boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.10)", _focus: {
                            outline: 'none !important',
                            border: 'none',
                            boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.10)'
                        }, children: (0, jsx_runtime_1.jsx)(react_1.PopoverBody, { className: "bg-surface", p: "8px", children: (0, jsx_runtime_1.jsxs)(react_1.List, { children: [(0, jsx_runtime_1.jsx)(react_1.ListItem, { className: (0, clsx_1.default)('hover:bg-surface-container rounded-lg py-1 px-2'), onClick: onDownloadWithSensors, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { noStyle: true, className: "flex items-center py-1 gap-1", children: [downloading ? (0, jsx_runtime_1.jsx)(spinner_1.default, {}) : (0, jsx_runtime_1.jsx)(SaveIcon_1.default, { className: "w-6 h-6 text-default flex items-center " }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-default", children: t('save_image') })] }) }), (0, jsx_runtime_1.jsx)(react_1.ListItem, { className: (0, clsx_1.default)('hover:bg-surface-container rounded-lg py-1 px-2 mt-1'), onClick: () => onCopyImageWithSensors(), children: (0, jsx_runtime_1.jsxs)(button_1.Button, { noStyle: true, className: "flex items-center py-1 gap-1", children: [(0, jsx_runtime_1.jsx)(CopyImageIcon_1.default, { size: "2xl", className: "flex items-center text-default" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-default", children: t('copy_image') })] }) }), isImageBot && url && url !== '/images/light.gif' && ((0, jsx_runtime_1.jsx)(react_1.ListItem, { className: (0, clsx_1.default)('hover:bg-surface-container rounded-lg py-1 px-2 mt-1'), onClick: () => onPublishToGalleryWithSensors(), children: (0, jsx_runtime_1.jsxs)(button_1.Button, { noStyle: true, className: "flex items-center py-1 gap-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "shrink-0 w-6 h-6 flex items-center", children: publishing ? ((0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm", color: "default" })) : ((0, jsx_runtime_1.jsx)(PhotoStack_1.default, { size: "2xl", className: "flex items-center text-default" })) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-default", children: t('publish_to_gallery') })] }) })), (0, jsx_runtime_1.jsx)(react_1.ListItem, { className: (0, clsx_1.default)('hover:bg-surface-container rounded-lg py-1 px-2 mt-1'), onClick: () => onCopyLinkWithSensors(), children: (0, jsx_runtime_1.jsxs)(button_1.Button, { noStyle: true, className: "flex items-center py-1 gap-1", children: [(0, jsx_runtime_1.jsx)(LinkIcon_1.default, { className: "w-6 h-6 text-default flex items-center " }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-default", children: t('copy_image_link') })] }) })] }) }) })] })), (0, jsx_runtime_1.jsx)(GalleryPublishTipModal_1.default, { publishing: publishing, publishState: publishState, open: popupConfirmVisible, onClose: () => {
                    onClose();
                    setPopupConfirmVisible(false);
                    if (publishState === 'success') {
                        setPublishState('info');
                    }
                }, onConfirm: confirmHandler })] }));
}
