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
const ChevronLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/ChevronLeftIcon"));
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/ChevronRightIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
const react_use_1 = require("react-use");
const StaticContext_1 = require("../../../../../chat-new/context/StaticContext");
const useNewChatStore_1 = require("../../../../../chat-new/services/useNewChatStore");
const file_card_1 = __importDefault(require("./file-card"));
const ImgVideoPreview = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../../chat/views/chat-body/file-display/img-video/preview/ImgVideoPreview'))), {
    ssr: false
});
const Attachments = (0, react_1.memo)(() => {
    const isMobile = (0, react_use_1.useMedia)('(max-width: 768px)');
    const scrollerRef = (0, react_1.useRef)(null);
    const scrollPositionRef = (0, react_1.useRef)(0);
    const timerRef = (0, react_1.useRef)();
    const { entityInfo: { id: botId } } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const [scrollState, setScrollState] = (0, react_1.useState)({ canLeft: false, canRight: false });
    const [preview, setPreview] = (0, react_1.useState)({ visible: false, index: 0 });
    const files = (0, useNewChatStore_1.useNewChatStore)(state => state.fileUpload.filesMap[botId]);
    const uploadFiles = (0, useNewChatStore_1.useNewChatStore)(state => state.uploadFiles);
    const deleteUploadFiles = (0, useNewChatStore_1.useNewChatStore)(state => state.deleteUploadFiles);
    const imgVideoList = (0, react_1.useMemo)(() => {
        return (files || [])
            .filter(file => ['image', 'video'].includes(file.uiData.mimeType))
            .map(file => ({
            type: file.uiData.serverType,
            status: 'EMBED_OBJ_STATUS_DONE',
            title: file.uiData.name,
            url: file.url,
            id: file.id,
            extensionName: file.uiData.ex.toUpperCase(),
            mediaFileMetadata: file.meta
        }));
    }, [files]);
    const onSlide = (e, dir) => {
        e.preventDefault();
        document.getElementById('mobileInput')?.focus();
        if (scrollerRef.current) {
            const pDistance = scrollerRef.current.clientWidth;
            const left = scrollPositionRef.current + (dir === 'left' ? -pDistance : pDistance);
            scrollerRef.current.scrollTo({ left, behavior: 'smooth' });
        }
    };
    const setChevronVisible = (0, react_1.useCallback)(() => {
        if (scrollerRef.current) {
            scrollPositionRef.current = scrollerRef.current.scrollLeft;
            const { scrollWidth, clientWidth } = scrollerRef.current;
            setScrollState({
                canLeft: scrollPositionRef.current > 20,
                canRight: clientWidth + scrollPositionRef.current + 10 < scrollWidth
            });
        }
    }, []);
    const onScroll = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(setChevronVisible, 100);
    };
    (0, react_1.useEffect)(() => {
        setChevronVisible();
    }, [files?.length]);
    const onPreview = (id) => {
        const index = imgVideoList.findIndex(file => file.id === id);
        setPreview({ visible: true, index });
    };
    const isChoosingFile = (0, react_1.useRef)(false);
    const renderItems = (files) => {
        return (files || []).map((item, index) => ((0, jsx_runtime_1.jsx)(file_card_1.default, { data: item, onDelete: deleteUploadFiles, onPreview: onPreview, uploadFiles: uploadFiles, index: index, isMobile: isMobile, isChoosingFile: isChoosingFile }, item.id)));
    };
    if ((files || []).length === 0) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "attachments relative w-full overflow-x-hidden -ml-3 -mr-3 px-3", children: [(0, jsx_runtime_1.jsx)("button", { className: (0, clsx_1.default)('absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full border border-outline justify-center items-center bg-surface mt-[5px]', scrollState.canLeft ? 'flex' : 'hidden'), children: (0, jsx_runtime_1.jsx)(ChevronLeftIcon_1.default, { className: (0, clsx_1.default)('w-[18px] h-[18px] cursor-pointer text-on-surface'), onClick: e => onSlide(e, 'left') }) }), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-full flex overflow-x-scroll no-scrollbar pt-[10px]'), ref: scrollerRef, onScroll: onScroll, children: renderItems(files) }), (0, jsx_runtime_1.jsx)("button", { className: (0, clsx_1.default)('absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full border border-outline justify-center items-center bg-surface mt-[5px]', scrollState.canRight ? 'flex' : 'hidden'), children: (0, jsx_runtime_1.jsx)(ChevronRightIcon_1.default, { className: (0, clsx_1.default)('w-[18px] h-[18px] cursor-pointer text-on-surface'), onClick: e => onSlide(e, 'right') }) }), preview.visible && ((0, jsx_runtime_1.jsx)(ImgVideoPreview, { open: preview.visible, onClose: () => {
                    setPreview({ visible: false, index: 0 });
                }, imgVideoList: imgVideoList, activeIndex: preview.index }))] }));
});
Attachments.displayName = 'Attachments';
exports.default = Attachments;
