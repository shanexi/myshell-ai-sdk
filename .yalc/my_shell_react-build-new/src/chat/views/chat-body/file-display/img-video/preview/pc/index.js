"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Preview;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowDownTrayIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/ArrowDownTrayIcon"));
const ChevronLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/ChevronLeftIcon"));
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/ChevronRightIcon"));
const MinusSmallIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/MinusSmallIcon"));
const PlusSmallIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/PlusSmallIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dayjs_1 = __importDefault(require("dayjs"));
const framer_motion_1 = require("framer-motion");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const bot_1 = require("../../../../../../../apis/bot");
const common_1 = require("../../../../../../../apis/common");
const PhotoStack_1 = __importDefault(require("../../../../../../../common/components/icons/chat/PhotoStack"));
const luiContext_1 = require("../../../../../../../common/components/lui/luiContext");
const icon_button_1 = require("../../../../../../../common/components/ui/icon-button");
const tooltip_1 = require("../../../../../../../common/components/ui/tooltip");
const useDownload_1 = __importDefault(require("../../../../../../../common/hooks/useDownload"));
const useNotification_1 = require("../../../../../../../common/hooks/useNotification");
const sensors_1 = require("../../../../../../../lib/sensors");
const store_1 = require("../../../../../../../services/store");
const ImageItem_1 = __importDefault(require("./ImageItem"));
const VideoPlayer_1 = __importDefault(require("./VideoPlayer"));
const VideoOverview_1 = __importDefault(require("../../VideoOverview"));
function Preview({ imgVideoList, activeIndex, publishing, onClose, publishGalleryHandle }) {
    const [index, setIndex] = (0, react_2.useState)(activeIndex);
    const [scaleValue, setScaleValue] = (0, react_2.useState)(1);
    const scaleStep = 0.1;
    const t = (0, next_intl_1.useTranslations)('common');
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const sensors = (0, sensors_1.useSensors)();
    const { downloading, onDownload } = (0, useDownload_1.default)();
    const { success } = (0, useNotification_1.useNotification)();
    const { msgId, selectedBot, widgetInfo } = (0, react_2.useContext)(luiContext_1.LUIButtonInteractionContext);
    const flagUserFirstPublishGallery = (0, store_1.useUserStore)(state => state.flagUserFirstPublishGallery);
    const handleDownload = () => {
        const media_file_url = imgVideoList[index].url;
        onDownload(media_file_url, imgVideoList[index].title || `Myshell_${selectedBot?.name || widgetInfo?.name}_${(0, dayjs_1.default)().format('YYMMDD_HHmmss')}`);
        if (sensors && sensors.track) {
            const imageModel = imgVideoList[index].mediaFileMetadata?.generateModel;
            if (imageModel) {
                sensors?.track('MessageAction', {
                    action_type: 'Save Image',
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
                    media_file_url
                })
                    .then(res => {
                    sensors?.track('MessageAction', {
                        action_type: 'Save Image',
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
                        action_type: 'Save Image',
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
    const selectedItem = (0, react_2.useMemo)(() => {
        return imgVideoList[index];
    }, [imgVideoList, index]);
    (0, react_2.useEffect)(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    handleGoToPrev();
                    break;
                case 'ArrowRight':
                    handleGoToNext();
                    break;
                case 'ArrowUp':
                    handleZoomIn();
                    break;
                case 'ArrowDown':
                    handleZoomOut();
                    break;
                default:
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    const resetScaleValue = () => {
        setScaleValue(1);
    };
    (0, react_2.useEffect)(() => {
        setScaleValue(1);
    }, [index]);
    const handleZoomIn = (0, react_2.useCallback)(() => {
        if (scaleValue >= 3) {
        }
        else {
            setScaleValue(scaleValue + scaleStep);
        }
    }, [scaleValue]);
    const handleZoomOut = (0, react_2.useCallback)(() => {
        if (scaleValue <= 0.5) {
        }
        else {
            setScaleValue(scaleValue - scaleStep);
        }
    }, [scaleValue]);
    const handleGoToPrev = (0, react_2.useCallback)(() => {
        setIndex(index < 1 ? imgVideoList.length - 1 : index - 1);
    }, [imgVideoList.length, index]);
    const handleGoToNext = (0, react_2.useCallback)(() => {
        setIndex(index === imgVideoList.length - 1 ? 0 : index + 1);
    }, [imgVideoList.length, index]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-screen overflow-hidden flex flex-col", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex justify-center w-full", style: {
                    height: 'calc(100vh - 80px)'
                }, onClick: onClose, children: [(0, jsx_runtime_1.jsx)("div", { className: "img-video-index absolute w-full h-full top-0 left-0 z-[1]" }), imgVideoList.length > 1 && ((0, jsx_runtime_1.jsx)("div", { onClick: handleGoToPrev, className: "flex justify-center items-center w-9 h-9 rounded-full absolute left-6 md:left-6 top-1/2 -translate-y-1/2 bg-surface cursor-pointer z-20 shadow-button-basic border border-default", children: (0, jsx_runtime_1.jsx)(ChevronLeftIcon_1.default, { className: "text-[var(--on-surface-btn-text)] w-6 h-6" }) })), (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, { mode: "popLayout", children: imgVideoList.map((item, itemIndex) => ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: itemIndex === index ? 1 : 0 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, className: (0, clsx_1.default)(item.type === common_1.EmbedObjType.VIDEO
                                ? 'max-w-3/4 h-full overflow-hidden justify-center items-center relative z-10'
                                : 'absolute w-full h-full flex justify-center items-center z-10', itemIndex === index ? 'visible' : ' invisible w-0 h-0'), style: {
                                scale: scaleValue
                            }, children: item.type === common_1.EmbedObjType.VIDEO ? ((0, jsx_runtime_1.jsx)(VideoPlayer_1.default, { videoObj: item, triggerPlay: itemIndex === index, onClose: onClose })) : ((0, jsx_runtime_1.jsx)(ImageItem_1.default, { imgObj: item, handleZoomIn: handleZoomIn, handleZoomOut: handleZoomOut, resetScaleValue: resetScaleValue, onClose: onClose })) }, item.url))) }), imgVideoList.length > 1 && ((0, jsx_runtime_1.jsx)("div", { onClick: handleGoToNext, className: "flex justify-center items-center w-9 h-9 rounded-full absolute right-6 md:right-11 top-1/2 -translate-y-1/2 bg-surface cursor-pointer z-20 shadow-button-basic border border-default", children: (0, jsx_runtime_1.jsx)(ChevronRightIcon_1.default, { className: "text-[var(--on-surface-btn-text)] w-6 h-6" }) }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "h-20 w-full px-6 py-3 flex justify-between items-center shrink-0 relative z-20", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute w-full h-full top-0 left-0 z-30", onClick: onClose }), selectedItem.type === common_1.EmbedObjType.IMAGE ? ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-end items-center space-x-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "rounded-xl bg-beta-black-20 px-3 flex space-x-[6px] items-center h-[38px] relative z-50", style: {
                                backdropFilter: 'blur(12px)'
                            }, children: [(0, jsx_runtime_1.jsx)(MinusSmallIcon_1.default, { className: "w-5 h-5 text-beta-white-70 cursor-pointer", onClick: handleZoomOut }), (0, jsx_runtime_1.jsxs)(react_1.Slider, { width: "72px", value: scaleValue, min: 0.5, max: 3, step: scaleStep, onChange: (value) => {
                                        setScaleValue(value);
                                    }, focusThumbOnChange: false, children: [(0, jsx_runtime_1.jsx)(react_1.SliderTrack, { className: "bg-[#EDF0F5] dark:bg-[#22242E]", children: (0, jsx_runtime_1.jsx)(react_1.SliderFilledTrack, { className: "bg-primary" }) }), (0, jsx_runtime_1.jsx)(react_1.SliderThumb, { className: "bg-primary border-[2px] border-surface", zIndex: 0 })] }), (0, jsx_runtime_1.jsx)(PlusSmallIcon_1.default, { className: "w-5 h-5 text-beta-white-70 cursor-pointer", onClick: handleZoomIn })] }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-[150px]", onClick: onClose })), imgVideoList.length > 1 && ((0, jsx_runtime_1.jsx)("div", { className: "flex space-x-2 relative z-50", children: imgVideoList.map((file, idx) => ((0, jsx_runtime_1.jsx)(react_2.Fragment, { children: file.type === common_1.EmbedObjType.VIDEO ? ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('rounded-md overflow-hidden h-14 object-cover cursor-pointer ease-linear duration-200 transition-[width] select-none', index === idx ? 'w-14' : 'w-7'), onClick: () => setIndex(idx), children: (0, jsx_runtime_1.jsx)(VideoOverview_1.default, { url: file.url, showPlayBtn: false, showRadius: false, showLoading: false }, file.url) })) : ((0, jsx_runtime_1.jsx)(image_1.default, { alt: "thumbnail image", src: file.url, width: 56, height: 56, className: (0, clsx_1.default)('rounded-md h-14 object-cover cursor-pointer ease-linear duration-200 transition-[width] select-none', index === idx ? 'w-14' : 'w-7'), onClick: () => setIndex(idx) })) }, file.url))) })), selectedBot?.isImageGenerator && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { open: !flagUserFirstPublishGallery ? true : undefined, description: flagUserFirstPublishGallery ? chatT('publish_to_gallery') : chatT('publish_battery'), variant: flagUserFirstPublishGallery ? 'default' : 'message', children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: PhotoStack_1.default, loading: publishing, onClick: e => {
                                e.stopPropagation();
                                e.preventDefault();
                                publishGalleryHandle?.(index);
                            }, variant: "primary", color: "brand", size: "md", className: "relative z-30 bg-beta-black-20 ml-2" }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end relative z-50", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute w-full h-full top-0 left-0", onClick: onClose }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "primary", color: "brand", size: "md", "aria-label": "download file", loading: downloading, onClick: handleDownload, className: "relative z-30 bg-beta-black-20 ml-2", icon: ArrowDownTrayIcon_1.default })] })] })] }));
}
