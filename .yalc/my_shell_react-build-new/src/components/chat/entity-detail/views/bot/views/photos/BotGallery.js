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
exports.default = BotGallery;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const bot_1 = require("../../../../../../../apis/bot.js");
const common_1 = require("../../../../../../../apis/common.js");
const useNotification_1 = require("../../../../../../../common/hooks/useNotification.js");
const PhotoUploader_1 = __importDefault(require("../../../../../../../components/chat/entity-detail/views/bot/views/photos/PhotoUploader.js"));
const ImgDisplay_1 = __importDefault(require("./ImgDisplay.js"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const ActionConfirmationModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../../../../common/components/ActionConfirmationModal.js'))), {
    ssr: false
});
const ImgSwiper = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./img-swiper/ImgSwiper.js'))), { ssr: false });
function BotGallery({ id, photos = [], onActionSuccess, canUpload = false }) {
    const [imgSwiperModalVisible, setImgSwiperModalVisible] = (0, react_1.useState)(false);
    const [activeImg, setActiveImg] = (0, react_1.useState)();
    const [deleting, setDeleting] = (0, react_1.useState)(false);
    const { warning } = (0, useNotification_1.useNotification)();
    const commonT = (0, next_intl_1.useTranslations)('common');
    const [deleteConfirmationModalVisible, setDeleteConfirmationModalVisible] = (0, react_1.useState)(false);
    const [deleteId, setDeleteId] = (0, react_1.useState)();
    const showUpload = canUpload && photos.length < 12;
    const onUpload = (f, fileSuffix, endCb, successCb) => {
        (0, common_1.uploadFileToS3)(common_1.Scenario.SCENARIO_BOT_PHOTO, fileSuffix, f)
            .then(res => {
            return (0, bot_1.uploadBotPhoto)(id, [res.objectKey], 'OTHER');
        })
            .then(res => {
            if (res.success && onActionSuccess) {
                onActionSuccess(res.data.photos);
                successCb();
            }
        })
            .catch(() => {
            warning({
                content: 'Upload Failed!'
            });
        })
            .finally(() => {
            endCb();
        });
    };
    const openImgSwiperModal = (index) => {
        setActiveImg(index);
        setImgSwiperModalVisible(true);
    };
    const handleDelete = (photoId) => {
        setDeleting(true);
        (0, bot_1.removeBotPhoto)({
            botId: id,
            photoIds: [String(photoId)]
        })
            .then(res => {
            if (res.success) {
                onActionSuccess(res.data.photos);
                return;
            }
            throw new Error('delete bot photo failed');
        })
            .catch(() => {
            warning({
                content: commonT('download_failed')
            });
        })
            .finally(() => {
            setDeleting(false);
            setDeleteConfirmationModalVisible(false);
        });
    };
    (0, react_1.useEffect)(() => {
        if (!imgSwiperModalVisible) {
            setActiveImg(undefined);
        }
    }, [imgSwiperModalVisible]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-3 md:grid-cols-4 gap-[2px] relative", children: [imgSwiperModalVisible && (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full absolute top-0 left-0 bg-surface z-[1]" }), showUpload && (0, jsx_runtime_1.jsx)(PhotoUploader_1.default, { onFileReadyToUpload: onUpload }), photos.map((img, index) => ((0, jsx_runtime_1.jsx)("div", { className: "aspect-square", children: (0, jsx_runtime_1.jsx)(ImgDisplay_1.default, { imgSrc: img.thumbnailUrl, onOpenImgSwiperModal: () => openImgSwiperModal(index), onDeleteImg: () => {
                                setDeleteConfirmationModalVisible(true);
                                setDeleteId(img.id);
                            }, deletable: canUpload }) }, img.id)))] }), !showUpload && !photos.length && ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center h-[120px] text-on-surface", children: commonT('no_photos') })), imgSwiperModalVisible && ((0, jsx_runtime_1.jsx)(ImgSwiper, { open: imgSwiperModalVisible, onClose: () => setImgSwiperModalVisible(false), imgList: photos, activeIndex: activeImg || 0, onDelete: (delId) => {
                    setDeleteConfirmationModalVisible(true);
                    setDeleteId(delId);
                }, deleting: deleting, deletable: canUpload })), deleteConfirmationModalVisible && ((0, jsx_runtime_1.jsx)(ActionConfirmationModal, { isOpen: deleteConfirmationModalVisible, onClose: () => setDeleteConfirmationModalVisible(false), title: "", content: commonT('delete_photo_tip'), onConfirm: () => handleDelete(deleteId), acting: deleting }))] }));
}
