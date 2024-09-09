"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MobilePreview;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowDownTrayIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowDownTrayIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dayjs_1 = __importDefault(require("dayjs"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_2 = require("swiper/react");
const common_1 = require("../../../../../../../apis/common.js");
const PhotoStack_1 = __importDefault(require("../../../../../../../common/components/icons/chat/PhotoStack.js"));
const luiContext_1 = require("../../../../../../../common/components/lui/luiContext.js");
const useDownload_1 = __importDefault(require("../../../../../../../common/hooks/useDownload.js"));
const useNotification_1 = require("../../../../../../../common/hooks/useNotification.js");
const sensors_1 = require("../../../../../../../lib/sensors/index.js");
const PinchZoomImage_1 = __importDefault(require("./PinchZoomImage.js"));
const VideoPlayer_1 = __importDefault(require("./VideoPlayer.js"));
const VideoOverview_1 = __importDefault(require("../../VideoOverview.js"));
require("swiper/css");
const icon_button_1 = require("../../../../../../../common/components/ui/icon-button.js");
function MobilePreview({ imgVideoList, activeIndex, publishing, onClose, publishGalleryHandle }) {
    const [index, setIndex] = (0, react_1.useState)(activeIndex);
    const [zooming, setZooming] = (0, react_1.useState)(false);
    const { downloading, onDownload } = (0, useDownload_1.default)();
    const [touchStartY, setTouchStartY] = (0, react_1.useState)(null);
    const [translateY, setTranslateY] = (0, react_1.useState)(0);
    const swiperRef = (0, react_1.useRef)(null);
    const sensors = (0, sensors_1.useSensors)();
    const t = (0, next_intl_1.useTranslations)('common');
    const { success } = (0, useNotification_1.useNotification)();
    const { msgId, selectedBot, widgetInfo } = (0, react_1.useContext)(luiContext_1.LUIButtonInteractionContext);
    const handleThumbnailClick = (idx) => {
        const swiper = swiperRef.current;
        if (swiper) {
            swiper.slideTo(idx);
        }
        setIndex(idx);
    };
    const handleDownload = () => {
        onDownload(imgVideoList[index].url, imgVideoList[index].title || `Myshell_${selectedBot?.name}_${(0, dayjs_1.default)().format('YYMMDD_HHmmss')}`, () => {
            success({ content: t('download_success') });
        });
        if (sensors && sensors.track) {
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
                image_model: imgVideoList[index]?.mediaFileMetadata?.generateModel
            });
        }
    };
    const handleIndexChange = (index) => {
        setIndex(index);
    };
    const onPinchStart = () => {
        setZooming(true);
    };
    const onPinchEnd = () => {
        setZooming(false);
    };
    const handleTouchStart = (event) => {
        event.stopPropagation();
        if (event.touches.length > 1)
            return;
        setTouchStartY(event.touches[0].clientY);
    };
    const handleTouchMove = (event) => {
        event.stopPropagation();
        if (touchStartY === null)
            return;
        const currentY = event.touches[0].clientY;
        const deltaY = currentY - touchStartY;
        setTranslateY(deltaY);
    };
    const handleTouchEnd = () => {
        if (translateY > 100) {
            onClose();
        }
        setTranslateY(0);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full h-[100svh] bg-black overflow-hidden ease-in-out", style: {
            transform: `translateY(${translateY > 0 ? translateY : 0}px)`
        }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex px-4 md:px-[6px] py-4 justify-start shrink-0", onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: ArrowDownTrayIcon_1.default, variant: "ghost", color: "static", "aria-label": "download file", loading: downloading, onClick: handleDownload, size: "md", className: "min-w-fit w-9 h-9 rounded-full flex justify-center items-center data-[loading]:text-white", children: (0, jsx_runtime_1.jsx)(ArrowDownTrayIcon_1.default, { className: "w-6 h-6 text-white" }) }), selectedBot?.isImageGenerator && ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: PhotoStack_1.default, variant: "ghost", color: "static", "aria-label": "download file", loading: publishing, onClick: e => {
                            e.stopPropagation();
                            e.preventDefault();
                            publishGalleryHandle?.(index);
                        }, size: "md", className: "min-w-fit w-9 h-9 rounded-full flex justify-center items-center data-[loading]:text-white" }))] }), (0, jsx_runtime_1.jsx)("div", { style: {
                    height: imgVideoList.length > 1 ? 'calc(100% - 120px)' : 'calc(100% - 56px)'
                }, children: (0, jsx_runtime_1.jsx)(react_2.Swiper, { spaceBetween: 100, slidesPerView: 1, initialSlide: activeIndex, onSwiper: swiper => {
                        swiperRef.current = swiper;
                    }, onSlideChange: swiper => {
                        handleIndexChange(swiper.realIndex);
                    }, className: "grow w-full h-full", enabled: !zooming, loop: imgVideoList.length > 1, children: imgVideoList.map((item, itemIndex) => ((0, jsx_runtime_1.jsx)(react_2.SwiperSlide, { children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('touch-none', item.type === common_1.EmbedObjType.VIDEO
                                ? 'w-full h-full overflow-hidden justify-center items-center relative z-10'
                                : 'absolute w-full h-full flex justify-center items-center z-10', itemIndex === index ? 'visible' : ' invisible w-0 h-0'), children: item.type === common_1.EmbedObjType.VIDEO ? ((0, jsx_runtime_1.jsx)(VideoPlayer_1.default, { src: item.url, triggerPlay: itemIndex === index })) : ((0, jsx_runtime_1.jsx)(PinchZoomImage_1.default, { imgObj: item, onPinchStart: onPinchStart, onPinchEnd: onPinchEnd })) }) }, item.url))) }) }), imgVideoList.length > 1 && ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center px-[6px] py-3 space-x-2 shrink-0", children: imgVideoList.length <= 4 ? (imgVideoList.map((file, idx) => ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: file.type === common_1.EmbedObjType.VIDEO ? ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('rounded-md overflow-hidden h-10 object-cover cursor-pointer ease-linear duration-200 transition-[width] select-none', index === idx ? 'w-10' : 'w-7'), onClick: () => handleThumbnailClick(idx), children: (0, jsx_runtime_1.jsx)(VideoOverview_1.default, { url: file.url, showPlayBtn: false, showRadius: false, showLoading: false }, file.url) })) : ((0, jsx_runtime_1.jsx)(image_1.default, { alt: "thumbnail image", src: file.url, width: 56, height: 56, className: (0, clsx_1.default)('rounded-md h-10 object-cover cursor-pointer ease-linear duration-200 transition-[width] select-none', index === idx ? 'w-10' : 'w-7'), onClick: () => handleThumbnailClick(idx) })) }, file.url)))) : ((0, jsx_runtime_1.jsx)("div", { className: "flex space-x-2", children: imgVideoList.map((file, idx) => ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('rounded-full w-2 h-2', index === idx ? 'bg-white' : 'bg-[#FFFFFF33]'), onClick: () => handleThumbnailClick(idx) }, file.url))) })) }))] }));
}
