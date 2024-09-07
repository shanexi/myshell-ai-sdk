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
const ArrowPathIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowPathIcon"));
const ChevronLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/ChevronLeftIcon"));
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/solid/ChevronRightIcon"));
const ExclamationCircleIcon_1 = __importDefault(require("@heroicons/react/24/solid/ExclamationCircleIcon"));
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/solid/PlayIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/solid/XMarkIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const audio_1 = __importDefault(require("../../../chat/views/editor/audio.js"));
const spinner_1 = __importDefault(require("../../../common/components/ui/spinner.js"));
const tooltip_1 = require("../../../common/components/ui/tooltip.js");
const store_1 = require("../../../services/store/index.js");
const ImgVideoPreview = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../chat/views/chat-body/file-display/img-video/preview/ImgVideoPreview.js'))), {
    ssr: false
});
function FileCard(props) {
    return ((0, jsx_runtime_1.jsx)(File, { data: props.data, onDelete: props.onDelete, onPreview: props.onPreview, uploadFiles: props.uploadFiles, index: props.index, isMobile: props.isMobile, isChoosingFile: props.isChoosingFile }));
}
function File({ data, onDelete, onPreview, uploadFiles, index, isMobile, isChoosingFile }) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { status } = data;
    const isError = status === 'error';
    const isPending = status === 'pending';
    const isSuccess = status === 'completed';
    const isFile = data.uiData.mimeType === 'application' || data.uiData.mimeType === 'text';
    const isImage = data.uiData.mimeType === 'image';
    const isAudio = data.uiData.mimeType === 'audio';
    const isVideo = data.uiData.mimeType === 'video';
    const { icon } = data.uiData;
    const { iconUrl } = data.uiData;
    const preview = (0, react_1.useMemo)(() => {
        if (data.file) {
            return ['image', 'audio', 'video'].includes(data.uiData.mimeType) ? URL.createObjectURL(data.file) : '';
        }
        return '';
    }, [isPending, index]);
    const handlePreview = (index) => {
        if (isSuccess && (isImage || isVideo)) {
            onPreview(data.id);
            if (isChoosingFile) {
                isChoosingFile.current = true;
            }
        }
        if (isError) {
            uploadFiles(data.widgetId, [{ ...data, status: 'pending' }], true);
        }
    };
    const handleDelete = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const el = document.getElementById('mobileInput');
        if (el) {
            el.focus();
        }
        onDelete(data.widgetId, data.id);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative rounded-xl group/attach first:ml-3 last:mr-3 mr-2 cursor-default', isError ? 'border-[#D72C0D]' : 'border-default', {
            border: !(isImage || isVideo) || isError,
            relative: isImage || isVideo,
            'flex justify-start items-center px-3 py-1.5': isFile,
            'w-[180px] flex justify-start items-center p-1.5 rounded-xl': isAudio
        }), onClick: e => {
            e.preventDefault();
            const el = document.getElementById('mobileInput');
            if (el) {
                el.focus();
            }
            handlePreview(index);
        }, children: [(isAudio || (!isSuccess && isFile)) && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)({
                    'absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center': isImage || isVideo,
                    'w-7 h-7 rounded-lg mr-3': !(isImage || isVideo),
                    'bg-[#D72C0D]': isError && !(isImage || isVideo),
                    'bg-[#8C9196]': isPending && !(isImage || isVideo),
                    hidden: isAudio,
                    'flex justify-center items-center': isFile
                }), style: data.uiData.bg ? { background: data.uiData.bg } : {}, children: [isError && (0, jsx_runtime_1.jsx)(ArrowPathIcon_1.default, { className: "w-4 h-4 text-white" }), isPending && ((0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-gray-400", size: "2xs" }) }))] })), isSuccess && isFile && ((0, jsx_runtime_1.jsx)("div", { className: "w-7 h-7 rounded-lg mr-3", children: (0, jsx_runtime_1.jsx)("img", { src: iconUrl }) })), isFile && ((0, jsx_runtime_1.jsxs)("div", { className: "w-[116px] flex flex-col justify-center items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-on-surface line-clamp-1 break-all font-medium", children: data.file.name }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-secondary line-clamp-1 break-all", children: data.uiData.type })] })), isImage && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-12 h-12 rounded-xl overflow-hidden', { 'border border-default': !isError }), children: [(0, jsx_runtime_1.jsx)("img", { src: preview, className: "w-full h-full  object-cover", onLoad: () => {
                            URL.revokeObjectURL(preview);
                        } }), !isSuccess && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('absolute z-[1] left-0 top-0 bottom-0 right-0  rounded-xl flex justify-center items-center', {
                            'bg-[#EC2F0D33]': isError,
                            'bg-[#FFFFFFBF] dark:bg-[#000000BF]': !isError
                        }), children: [isPending && ((0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-gray-400", size: "2xs" }) })), isError && (0, jsx_runtime_1.jsx)(ArrowPathIcon_1.default, { className: "w-4 h-4 text-white" })] }))] })), isVideo && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative w-12 h-12 rounded-xl overflow-hidden', { 'border border-default': !isError }), children: [(0, jsx_runtime_1.jsx)("video", { src: preview, className: "w-full h-full object-fill overflow-hidden", onLoad: () => {
                            URL.revokeObjectURL(preview);
                        } }), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('absolute z-[1] left-0 top-0 bottom-0 right-0 flex justify-center items-center', {
                            'bg-[#EC2F0D33]': isError,
                            'bg-[#000000BF]': !isError
                        }), children: [isSuccess && (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: " w-5 h-5 text-white" }), isPending && ((0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-gray-400", size: "2xs" }) })), isError && (0, jsx_runtime_1.jsx)(ArrowPathIcon_1.default, { className: "w-4 h-4 text-white" })] })] })), isAudio && (0, jsx_runtime_1.jsx)(audio_1.default, { data: data, preview: preview }), isError && ((0, jsx_runtime_1.jsx)("div", { className: "absolute z-[1] -right-[10px] -top-[10px] rounded-full error-icon bg-surface justify-center items-center flex group-hover/attach:hidden", children: (0, jsx_runtime_1.jsx)(ExclamationCircleIcon_1.default, { className: "w-5 h-5 text-[#D72C0D] " }) })), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: commonT('delete'), children: (0, jsx_runtime_1.jsx)("button", { className: (0, clsx_1.default)('absolute z-[1] -right-[10px] -top-[10px] w-5 h-5 border border-white rounded-full bg-secondary justify-center items-center group-hover/attach:flex', isMobile ? 'flex' : 'hidden'), onClick: e => handleDelete(e), children: (0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "w-3 h-3 text-white" }) }) })] }));
}
function WidgetAttachments({ widgetId, onDelete, isMobile, isChoosingFile }) {
    const scrollerRef = (0, react_1.useRef)(null);
    const scrollPositionRef = (0, react_1.useRef)(0);
    const timerRef = (0, react_1.useRef)();
    const [scrollState, setScrollState] = (0, react_1.useState)({
        canLeft: false,
        canRight: false
    });
    const [preview, setPreview] = (0, react_1.useState)({ visible: false, index: 0 });
    const files = (0, store_1.useWorkshopStore)(state => state.fileUpload.filesMap[widgetId]);
    const widgetUploadFiles = (0, store_1.useWorkshopStore)(state => state.widgetUploadFiles);
    const imgVideoList = (0, react_1.useMemo)(() => {
        return (files || [])
            .filter(file => ['image', 'video'].includes(file.uiData.mimeType))
            .map(file => {
            return {
                type: file.uiData.serverType,
                status: 'EMBED_OBJ_STATUS_DONE',
                title: file.uiData.name,
                url: file.url,
                id: file.id,
                extensionName: file.uiData.ex.toUpperCase(),
                mediaFileMetadata: file.meta
            };
        });
    }, [files]);
    const onSlide = (e, dir) => {
        e.preventDefault();
        const el = document.getElementById('mobileInput');
        if (el) {
            el.focus();
        }
        if (scrollerRef.current) {
            const pDistance = scrollerRef.current.clientWidth;
            const left = scrollPositionRef.current + (dir === 'left' ? -pDistance : pDistance);
            scrollerRef.current.scrollTo({
                left,
                behavior: 'smooth'
            });
        }
    };
    const setChevronVisible = (0, react_1.useCallback)(() => {
        if (scrollerRef.current) {
            scrollPositionRef.current = scrollerRef.current.scrollLeft;
            const { scrollWidth } = scrollerRef.current;
            const { clientWidth } = scrollerRef.current;
            setScrollState({
                canLeft: scrollPositionRef.current > 20,
                canRight: clientWidth + scrollPositionRef.current + 10 < scrollWidth
            });
        }
    }, []);
    const onScroll = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(function () {
            setChevronVisible();
        }, 100);
    };
    (0, react_1.useEffect)(() => {
        setChevronVisible();
    }, [files?.length]);
    const onPreview = (id) => {
        const index = imgVideoList.findIndex(file => {
            return file.id === id;
        });
        setPreview({
            visible: true,
            index
        });
    };
    const renderItems = (files) => {
        return (files || []).map((item, index) => {
            return ((0, jsx_runtime_1.jsx)(FileCard, { data: item, onDelete: onDelete, onPreview: onPreview, uploadFiles: widgetUploadFiles, index: index, isMobile: isMobile, isChoosingFile: isChoosingFile }, item.id));
        });
    };
    if ((files || []).length === 0) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "attachments relative w-full overflow-x-hidden -ml-3 -mr-3 px-3", children: [(0, jsx_runtime_1.jsx)("button", { className: (0, clsx_1.default)('absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full border border-default justify-center items-center bg-surface mt-[5px]', scrollState.canLeft ? 'flex' : 'hidden'), children: (0, jsx_runtime_1.jsx)(ChevronLeftIcon_1.default, { className: (0, clsx_1.default)('w-[18px] h-[18px] cursor-pointer text-on-surface'), onClick: e => onSlide(e, 'left') }) }), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-full flex  overflow-x-scroll no-scrollbar pt-[10px]'), ref: scrollerRef, onScroll: onScroll, children: renderItems(files) }), (0, jsx_runtime_1.jsx)("button", { className: (0, clsx_1.default)('absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full border border-default justify-center items-center bg-surface mt-[5px]', scrollState.canRight ? 'flex' : 'hidden'), children: (0, jsx_runtime_1.jsx)(ChevronRightIcon_1.default, { className: (0, clsx_1.default)('w-[18px] h-[18px] cursor-pointer text-on-surface '), onClick: e => onSlide(e, 'right') }) }), preview.visible && ((0, jsx_runtime_1.jsx)(ImgVideoPreview, { open: preview.visible, onClose: () => {
                    if (isChoosingFile) {
                        isChoosingFile.current = false;
                    }
                    setPreview({
                        visible: false,
                        index: 0
                    });
                }, imgVideoList: imgVideoList, activeIndex: preview.index }))] }));
}
exports.default = (0, react_1.memo)(WidgetAttachments);
