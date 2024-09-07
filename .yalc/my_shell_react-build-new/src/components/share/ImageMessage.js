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
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
const ImageGallery_1 = __importDefault(require("../../common/components/ImageGallery/index.js"));
const image_1 = require("../../common/utils/image.js");
const store_1 = require("../../services/store/index.js");
const AudioPlayer_1 = __importDefault(require("./AudioPlayer.js"));
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../common/components/MdViewer.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)("div", { children: "loading..." }),
    ssr: false
});
function ReplyMessage({ chat, chatSetting, isFromDownload }) {
    const transactionDisplaySet = (0, store_1.useChatStore)(state => state.transactionDisplaySet);
    const singleTranscriptionDisplayOpen = (0, react_1.useMemo)(() => {
        return transactionDisplaySet.has(chat.id);
    }, [chat.id, transactionDisplaySet]);
    const { imageGenMessageResponse } = chat;
    const { imgBatch, metadata, genStatus } = imageGenMessageResponse || {};
    const hasImages = Array.isArray(imgBatch) && imgBatch.length > 0;
    const aspectRatio = (0, image_1.divideToFraction)(Number(metadata?.width || 1), Number(metadata?.height || 1)).text;
    const aspectRatioStyle = hasImages
        ? {
            aspectRatio
        }
        : {};
    const images = (0, react_1.useMemo)(() => {
        return (hasImages ? imgBatch : []).map((batch, batchIndex) => {
            return batch.img.map((url, index) => {
                return {
                    original: url,
                    thumbnail: url,
                    batchIndex,
                    index,
                    originalHeight: String(metadata?.height ?? ''),
                    originalWidth: String(metadata?.width ?? '')
                };
            });
        });
    }, [hasImages, imgBatch, metadata]);
    const showAudio = !!(chatSetting?.isAudioOn && chat.voiceUrl);
    const renderItem = (0, react_1.useCallback)((item) => {
        if (!Array.isArray(item)) {
            return null;
        }
        const imgLen = item.length;
        let cl = '';
        switch (imgLen) {
            case 1:
                cl = 'grid-cols-1 grid-rows-1';
                break;
            case 2:
                cl = 'grid-cols-2 grid-rows-1';
                break;
            case 4:
                cl = 'grid-cols-2 grid-rows-2';
                break;
        }
        return ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('grid gap-x-px gap-y-px', cl), children: item.map((img, index) => {
                return ((0, jsx_runtime_1.jsx)("div", { className: "relative group bg-surface", style: aspectRatioStyle, children: (0, jsx_runtime_1.jsx)("img", { style: aspectRatioStyle, alt: "", src: img.original, "x-not-intercept": "1" }, index) }, index));
            }) }));
    }, [genStatus, aspectRatio, aspectRatioStyle]);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('full sm:w-3/4 flex flex-col space-y-2 rounded-lg bg-on-primary'), children: (0, jsx_runtime_1.jsxs)("div", { className: "relative rounded-[16px] py-3 bg-on-primary max-w-full", children: [(chatSetting?.isTranscriptionOn || singleTranscriptionDisplayOpen) && chat.text && !!chat.text.length && ((0, jsx_runtime_1.jsx)("div", { className: "px-3 leading-6 max-w-fit", children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col  w-full overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "text-on-surface w-full", children: (0, jsx_runtime_1.jsx)(MdViewer, { content: chat.text, status: chat.status }) }) }) })), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [showAudio && (chatSetting?.isTranscriptionOn || singleTranscriptionDisplayOpen) && ((0, jsx_runtime_1.jsx)("hr", { className: "mx-3 border-dashed border-[#DBDDDF] dark:border-[#54565E] mt-3 mb-1" })), showAudio && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { id: chat.id, direction: "left", showBottomBorder: true, borderColor: "#e9e9e9", showProgressBar: true, src: chat.voiceUrl, blobDuration: chat.voiceFileDurationSeconds }))] }), (0, jsx_runtime_1.jsx)("div", { className: "mx-3", style: aspectRatioStyle, children: (0, jsx_runtime_1.jsx)(ImageGallery_1.default, { images: images, renderItem: renderItem, showBullets: images.length > 1, showNav: images.length > 1, bulltetPosition: "outside", slideWrapperClass: "overflow-hidden rounded-xl", showFullscreenButton: false }) })] }) }));
}
exports.default = (0, react_1.memo)(ReplyMessage);
