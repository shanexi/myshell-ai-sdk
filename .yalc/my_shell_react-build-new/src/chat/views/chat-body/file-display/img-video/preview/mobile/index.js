import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Fragment, useRef, useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EmbedObjType } from '../../../../../../../apis/common.js';
import PhotoStackIcon from '../../../../../../../common/components/icons/chat/PhotoStack.js';
import { LUIButtonInteractionContext } from '../../../../../../../common/components/lui/luiContext.js';
import useDownload from '../../../../../../../common/hooks/useDownload.js';
import { useNotification } from '../../../../../../../common/hooks/useNotification.js';
import { useSensors } from '../../../../../../../lib/sensors/index.js';
import PinchZoomImage from './PinchZoomImage.js';
import MemorizedVideoPlayer from './VideoPlayer.js';
import VideoOverview from '../../VideoOverview.js';
import 'swiper/css';
import { IconButton } from '../../../../../../../common/components/ui/icon-button.js';
export default function MobilePreview({ imgVideoList, activeIndex, publishing, onClose, publishGalleryHandle }) {
    const [index, setIndex] = useState(activeIndex);
    const [zooming, setZooming] = useState(false);
    const { downloading, onDownload } = useDownload();
    const [touchStartY, setTouchStartY] = useState(null);
    const [translateY, setTranslateY] = useState(0);
    const swiperRef = useRef(null);
    const sensors = useSensors();
    const t = useTranslations('common');
    const { success } = useNotification();
    const { msgId, selectedBot, widgetInfo } = useContext(LUIButtonInteractionContext);
    const handleThumbnailClick = (idx) => {
        const swiper = swiperRef.current;
        if (swiper) {
            swiper.slideTo(idx);
        }
        setIndex(idx);
    };
    const handleDownload = () => {
        onDownload(imgVideoList[index].url, imgVideoList[index].title || `Myshell_${selectedBot?.name}_${dayjs().format('YYMMDD_HHmmss')}`, () => {
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
    return (_jsxs("div", { className: "flex flex-col w-full h-[100svh] bg-black overflow-hidden ease-in-out", style: {
            transform: `translateY(${translateY > 0 ? translateY : 0}px)`
        }, children: [_jsxs("div", { className: "flex px-4 md:px-[6px] py-4 justify-start shrink-0", onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, children: [_jsx(IconButton, { icon: ArrowDownTrayIcon, variant: "ghost", color: "static", "aria-label": "download file", loading: downloading, onClick: handleDownload, size: "md", className: "min-w-fit w-9 h-9 rounded-full flex justify-center items-center data-[loading]:text-white", children: _jsx(ArrowDownTrayIcon, { className: "w-6 h-6 text-white" }) }), selectedBot?.isImageGenerator && (_jsx(IconButton, { icon: PhotoStackIcon, variant: "ghost", color: "static", "aria-label": "download file", loading: publishing, onClick: e => {
                            e.stopPropagation();
                            e.preventDefault();
                            publishGalleryHandle?.(index);
                        }, size: "md", className: "min-w-fit w-9 h-9 rounded-full flex justify-center items-center data-[loading]:text-white" }))] }), _jsx("div", { style: {
                    height: imgVideoList.length > 1 ? 'calc(100% - 120px)' : 'calc(100% - 56px)'
                }, children: _jsx(Swiper, { spaceBetween: 100, slidesPerView: 1, initialSlide: activeIndex, onSwiper: swiper => {
                        swiperRef.current = swiper;
                    }, onSlideChange: swiper => {
                        handleIndexChange(swiper.realIndex);
                    }, className: "grow w-full h-full", enabled: !zooming, loop: imgVideoList.length > 1, children: imgVideoList.map((item, itemIndex) => (_jsx(SwiperSlide, { children: _jsx("div", { className: clsx('touch-none', item.type === EmbedObjType.VIDEO
                                ? 'w-full h-full overflow-hidden justify-center items-center relative z-10'
                                : 'absolute w-full h-full flex justify-center items-center z-10', itemIndex === index ? 'visible' : ' invisible w-0 h-0'), children: item.type === EmbedObjType.VIDEO ? (_jsx(MemorizedVideoPlayer, { src: item.url, triggerPlay: itemIndex === index })) : (_jsx(PinchZoomImage, { imgObj: item, onPinchStart: onPinchStart, onPinchEnd: onPinchEnd })) }) }, item.url))) }) }), imgVideoList.length > 1 && (_jsx("div", { className: "flex justify-center items-center px-[6px] py-3 space-x-2 shrink-0", children: imgVideoList.length <= 4 ? (imgVideoList.map((file, idx) => (_jsx(Fragment, { children: file.type === EmbedObjType.VIDEO ? (_jsx("div", { className: clsx('rounded-md overflow-hidden h-10 object-cover cursor-pointer ease-linear duration-200 transition-[width] select-none', index === idx ? 'w-10' : 'w-7'), onClick: () => handleThumbnailClick(idx), children: _jsx(VideoOverview, { url: file.url, showPlayBtn: false, showRadius: false, showLoading: false }, file.url) })) : (_jsx(Image, { alt: "thumbnail image", src: file.url, width: 56, height: 56, className: clsx('rounded-md h-10 object-cover cursor-pointer ease-linear duration-200 transition-[width] select-none', index === idx ? 'w-10' : 'w-7'), onClick: () => handleThumbnailClick(idx) })) }, file.url)))) : (_jsx("div", { className: "flex space-x-2", children: imgVideoList.map((file, idx) => (_jsx("div", { className: clsx('rounded-full w-2 h-2', index === idx ? 'bg-white' : 'bg-[#FFFFFF33]'), onClick: () => handleThumbnailClick(idx) }, file.url))) })) }))] }));
}
