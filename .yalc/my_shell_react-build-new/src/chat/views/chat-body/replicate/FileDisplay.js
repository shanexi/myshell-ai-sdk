"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/solid/XMarkIcon"));
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const common_1 = require("../../../../apis/common.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const AudioPlayer_1 = __importDefault(require("./AudioPlayer.js"));
const ImgVideoPreview_1 = __importDefault(require("../file-display/img-video/preview/ImgVideoPreview.js"));
const FileDisplay = ({ data, onDelete }) => {
    const { status, uiData } = data;
    const isSuccess = status === 'completed';
    const isFile = uiData.mimeType === 'application' || uiData.mimeType === 'text' || uiData.mimeType === 'other';
    const isImage = uiData.mimeType === 'image';
    const isAudio = uiData.mimeType === 'audio';
    const isVideo = uiData.mimeType === 'video';
    const iconUrl = uiData.iconUrl;
    const [viewModalVisible, setViewModalVisible] = (0, react_1.useState)(false);
    const previewUrl = (0, react_1.useMemo)(() => {
        if (data?.defaultUrl)
            return data?.defaultUrl;
        if (data.file) {
            return ['image', 'audio', 'video'].includes(uiData?.mimeType) ? URL.createObjectURL(data.file) : '';
        }
        return '';
    }, []);
    const handleDelete = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const el = document.getElementById('mobileInput');
        if (el) {
            el.focus();
        }
        onDelete();
    };
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const fileName = data?.file?.name;
    let fileShowName = fileName;
    const arr = fileName.split('.');
    const len = isMobile ? 20 : 60;
    if (fileName.length > len && arr.length > 1) {
        const ex = arr[arr.length - 1];
        fileShowName = `${fileName.slice(0, len)}...${ex}`;
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative cursor-default w-full flex justify-start items-center", onClick: e => {
                    e.preventDefault();
                    const el = document.getElementById('mobileInput');
                    if (el) {
                        el.focus();
                    }
                }, children: [isFile && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isSuccess && ((0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0 w-[60px] h-[60px] rounded-[8px] mr-3", children: (0, jsx_runtime_1.jsx)("img", { src: iconUrl, className: "w-[60px] h-[60px]" }) })), (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col justify-center items-start space-y-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-[14px] text-on-surface line-clamp-1 break-all font-medium", children: data.file.name }), (0, jsx_runtime_1.jsxs)("span", { className: "text-[12px] text-secondary line-clamp-1 break-all", children: ["(", Math.ceil(data?.file.size / 1000), "KB)"] })] })] })), isImage && ((0, jsx_runtime_1.jsxs)("div", { className: 'w-full flex justify-start items-center cursor-pointer', onClick: () => {
                            setViewModalVisible(true);
                        }, children: [(0, jsx_runtime_1.jsx)("img", { src: previewUrl, className: "flex-shrink-0 w-[60px] h-[60px] object-cover rounded-[8px] overflow-hidden mr-2", onLoad: () => {
                                    URL.revokeObjectURL(previewUrl);
                                }, alt: "preview image" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-start space-y-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "mr-4 text-[14px] font-medium text-on-surface", children: fileShowName }), data?.file?.size > 0 && ((0, jsx_runtime_1.jsxs)("p", { className: "text-[12px] text-secondary", children: ["(", Math.ceil(data?.file.size / 1000), "KB)"] }))] })] })), isVideo && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative w-full flex overflow-hidden cursor-pointer'), onClick: () => {
                            setViewModalVisible(true);
                        }, children: [(0, jsx_runtime_1.jsx)("video", { src: data?.url || previewUrl, className: "flex-shrink-0 w-[60px] h-[60px] rounded-[8px] mr-2 object-fill overflow-hidden", onLoad: () => {
                                    URL.revokeObjectURL(previewUrl);
                                } }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-start space-y-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "mr-4 text-[14px] font-medium text-on-surface", children: fileShowName }), data?.file?.size > 0 && ((0, jsx_runtime_1.jsxs)("p", { className: "text-[12px] text-secondary", children: ["(", Math.ceil(data?.file.size / 1000), "KB)"] }))] })] })), isAudio && (0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { data: data, preview: previewUrl }), (0, jsx_runtime_1.jsx)("button", { className: (0, clsx_1.default)('w-5 h-5 justify-center items-center', isAudio ? 'absolute z-[1] right-0 top-[10px]' : ''), onClick: e => handleDelete(e), children: (0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "w-5 h-5 text-[var(--on-surface-btn-text)]" }) })] }), viewModalVisible && ((0, jsx_runtime_1.jsx)(ImgVideoPreview_1.default, { open: viewModalVisible, onClose: () => {
                    setViewModalVisible(false);
                }, imgVideoList: [
                    {
                        type: isVideo ? common_1.EmbedObjType.VIDEO : isImage ? common_1.EmbedObjType.IMAGE : common_1.EmbedObjType.DOC,
                        status: common_1.EmbedObjStatus.DONE,
                        iconUrl: '',
                        url: previewUrl,
                        title: '',
                        extensionName: ''
                    }
                ], activeIndex: 0 }))] }));
};
exports.default = FileDisplay;
