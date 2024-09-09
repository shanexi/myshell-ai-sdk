"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImgVideoPreview;
const jsx_runtime_1 = require("react/jsx-runtime");
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const luiContext_1 = require("../../../../../../common/components/lui/luiContext");
const modal_1 = require("../../../../../../common/components/ui/modal");
const useDevice_1 = require("../../../../../../common/hooks/useDevice");
const useNotification_1 = require("../../../../../../common/hooks/useNotification");
const usePublishGallery_1 = __importDefault(require("../../../../../../gallery/hooks/usePublishGallery"));
const GalleryPublishTipModal_1 = __importDefault(require("../../../../../../gallery/views/GalleryPublishTipModal"));
const store_1 = require("../../../../../../services/store");
const MobilePreview = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./mobile'))), {
    ssr: false
});
const PcPreview = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./pc'))), {
    ssr: false
});
function ImgVideoPreview({ imgVideoList, activeIndex, open, onClose }) {
    const { isMobile } = (0, useDevice_1.useDevice)();
    const [popupConfirmObj, setPopupConfirmObj] = (0, react_1.useState)(null);
    const [publishState, setPublishState] = (0, react_1.useState)('info');
    const { publishing, publishGalleryList } = (0, usePublishGallery_1.default)();
    const t = (0, next_intl_1.useTranslations)();
    const { msgId, selectedBot } = (0, react_1.useContext)(luiContext_1.LUIButtonInteractionContext);
    const flagUserFirstPublishGallery = (0, store_1.useUserStore)(state => state.flagUserFirstPublishGallery);
    const publishGalleryHandle = (0, react_1.useCallback)((index) => {
        const imgItem = imgVideoList[index];
        const publishObj = {
            botId: `${selectedBot?.id}`,
            imageLink: imgItem.url,
            messageId: msgId,
            naturalHeight: imgItem.mediaFileMetadata?.height || 0,
            naturalWidth: imgItem.mediaFileMetadata?.width || 0
        };
        if (flagUserFirstPublishGallery) {
            publishGalleryList(publishSuccessCb, [publishObj]);
        }
        else {
            setPopupConfirmObj(publishObj);
        }
    }, [publishGalleryList, selectedBot, msgId, flagUserFirstPublishGallery]);
    const { success } = (0, useNotification_1.useNotification)();
    const publishSuccessCb = (0, react_1.useCallback)(() => {
        if (publishState === 'info' && !flagUserFirstPublishGallery) {
            setPublishState('success');
        }
        else {
            success({
                content: t('chat.suc_send')
            });
            setPublishState('info');
            setPopupConfirmObj(null);
            onClose();
        }
    }, [setPopupConfirmObj, flagUserFirstPublishGallery, publishState]);
    const confirmHandler = (0, react_1.useCallback)(() => {
        if (publishState === 'success') {
            setPopupConfirmObj(null);
            onClose();
        }
        else {
            popupConfirmObj && publishGalleryList(publishSuccessCb, [popupConfirmObj]);
        }
    }, [publishState, publishGalleryList, publishSuccessCb]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [imgVideoList.length > 0 && ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: open, onClose: onClose, contentClassName: "w-full h-full max-h-none p-0 rounded-none bg-beta-black-10", iconClassName: "text-icon-static hover:bg-transparent focus:bg-transparent active:bg-transparent", children: (0, jsx_runtime_1.jsx)("div", { className: "overflow-hidden p-0", children: isMobile ? ((0, jsx_runtime_1.jsx)(MobilePreview, { imgVideoList: imgVideoList, activeIndex: activeIndex, onClose: onClose, publishGalleryHandle: publishGalleryHandle, publishing: publishing })) : ((0, jsx_runtime_1.jsx)(PcPreview, { imgVideoList: imgVideoList, activeIndex: activeIndex, onClose: onClose, publishGalleryHandle: publishGalleryHandle, publishing: publishing })) }) })), (0, jsx_runtime_1.jsx)(GalleryPublishTipModal_1.default, { open: !!popupConfirmObj?.botId, onClose: () => {
                    setPopupConfirmObj(null);
                    publishState === 'success' && onClose();
                }, onConfirm: confirmHandler, publishState: publishState, publishing: publishing })] }));
}
