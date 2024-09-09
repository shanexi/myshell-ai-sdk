import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon';
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import MinusSmallIcon from '@heroicons/react/24/outline/MinusSmallIcon';
import PlusSmallIcon from '@heroicons/react/24/outline/PlusSmallIcon';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { mediaFileMetadata } from '../../../../../../../apis/bot.js';
import { EmbedObjType } from '../../../../../../../apis/common.js';
import PhotoStackIcon from '../../../../../../../common/components/icons/chat/PhotoStack.js';
import { LUIButtonInteractionContext } from '../../../../../../../common/components/lui/luiContext.js';
import { IconButton } from '../../../../../../../common/components/ui/icon-button.js';
import { Tooltip } from '../../../../../../../common/components/ui/tooltip.js';
import useDownload from '../../../../../../../common/hooks/useDownload.js';
import { useNotification } from '../../../../../../../common/hooks/useNotification.js';
import { useSensors } from '../../../../../../../lib/sensors/index.js';
import { useUserStore } from '../../../../../../../services/store/index.js';
import ImageItem from './ImageItem.js';
import VideoPlayer from './VideoPlayer.js';
import VideoOverview from '../../VideoOverview.js';
export default function Preview({ imgVideoList, activeIndex, publishing, onClose, publishGalleryHandle }) {
    const [index, setIndex] = useState(activeIndex);
    const [scaleValue, setScaleValue] = useState(1);
    const scaleStep = 0.1;
    const t = useTranslations('common');
    const chatT = useTranslations('chat');
    const sensors = useSensors();
    const { downloading, onDownload } = useDownload();
    const { success } = useNotification();
    const { msgId, selectedBot, widgetInfo } = useContext(LUIButtonInteractionContext);
    const flagUserFirstPublishGallery = useUserStore(state => state.flagUserFirstPublishGallery);
    const handleDownload = () => {
        const media_file_url = imgVideoList[index].url;
        onDownload(media_file_url, imgVideoList[index].title || `Myshell_${selectedBot?.name || widgetInfo?.name}_${dayjs().format('YYMMDD_HHmmss')}`);
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
                mediaFileMetadata({
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
    const selectedItem = useMemo(() => {
        return imgVideoList[index];
    }, [imgVideoList, index]);
    useEffect(() => {
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
    useEffect(() => {
        setScaleValue(1);
    }, [index]);
    const handleZoomIn = useCallback(() => {
        if (scaleValue >= 3) {
        }
        else {
            setScaleValue(scaleValue + scaleStep);
        }
    }, [scaleValue]);
    const handleZoomOut = useCallback(() => {
        if (scaleValue <= 0.5) {
        }
        else {
            setScaleValue(scaleValue - scaleStep);
        }
    }, [scaleValue]);
    const handleGoToPrev = useCallback(() => {
        setIndex(index < 1 ? imgVideoList.length - 1 : index - 1);
    }, [imgVideoList.length, index]);
    const handleGoToNext = useCallback(() => {
        setIndex(index === imgVideoList.length - 1 ? 0 : index + 1);
    }, [imgVideoList.length, index]);
    return (_jsxs("div", { className: "w-full h-screen overflow-hidden flex flex-col", children: [_jsxs("div", { className: "relative flex justify-center w-full", style: {
                    height: 'calc(100vh - 80px)'
                }, onClick: onClose, children: [_jsx("div", { className: "img-video-index absolute w-full h-full top-0 left-0 z-[1]" }), imgVideoList.length > 1 && (_jsx("div", { onClick: handleGoToPrev, className: "flex justify-center items-center w-9 h-9 rounded-full absolute left-6 md:left-6 top-1/2 -translate-y-1/2 bg-surface cursor-pointer z-20 shadow-button-basic border border-default", children: _jsx(ChevronLeftIcon, { className: "text-[var(--on-surface-btn-text)] w-6 h-6" }) })), _jsx(AnimatePresence, { mode: "popLayout", children: imgVideoList.map((item, itemIndex) => (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: itemIndex === index ? 1 : 0 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, className: clsx(item.type === EmbedObjType.VIDEO
                                ? 'max-w-3/4 h-full overflow-hidden justify-center items-center relative z-10'
                                : 'absolute w-full h-full flex justify-center items-center z-10', itemIndex === index ? 'visible' : ' invisible w-0 h-0'), style: {
                                scale: scaleValue
                            }, children: item.type === EmbedObjType.VIDEO ? (_jsx(VideoPlayer, { videoObj: item, triggerPlay: itemIndex === index, onClose: onClose })) : (_jsx(ImageItem, { imgObj: item, handleZoomIn: handleZoomIn, handleZoomOut: handleZoomOut, resetScaleValue: resetScaleValue, onClose: onClose })) }, item.url))) }), imgVideoList.length > 1 && (_jsx("div", { onClick: handleGoToNext, className: "flex justify-center items-center w-9 h-9 rounded-full absolute right-6 md:right-11 top-1/2 -translate-y-1/2 bg-surface cursor-pointer z-20 shadow-button-basic border border-default", children: _jsx(ChevronRightIcon, { className: "text-[var(--on-surface-btn-text)] w-6 h-6" }) }))] }), _jsxs("div", { className: "h-20 w-full px-6 py-3 flex justify-between items-center shrink-0 relative z-20", children: [_jsx("div", { className: "absolute w-full h-full top-0 left-0 z-30", onClick: onClose }), selectedItem.type === EmbedObjType.IMAGE ? (_jsx("div", { className: "w-full flex justify-end items-center space-x-2", children: _jsxs("div", { className: "rounded-xl bg-beta-black-20 px-3 flex space-x-[6px] items-center h-[38px] relative z-50", style: {
                                backdropFilter: 'blur(12px)'
                            }, children: [_jsx(MinusSmallIcon, { className: "w-5 h-5 text-beta-white-70 cursor-pointer", onClick: handleZoomOut }), _jsxs(Slider, { width: "72px", value: scaleValue, min: 0.5, max: 3, step: scaleStep, onChange: (value) => {
                                        setScaleValue(value);
                                    }, focusThumbOnChange: false, children: [_jsx(SliderTrack, { className: "bg-[#EDF0F5] dark:bg-[#22242E]", children: _jsx(SliderFilledTrack, { className: "bg-primary" }) }), _jsx(SliderThumb, { className: "bg-primary border-[2px] border-surface", zIndex: 0 })] }), _jsx(PlusSmallIcon, { className: "w-5 h-5 text-beta-white-70 cursor-pointer", onClick: handleZoomIn })] }) })) : (_jsx("div", { className: "w-[150px]", onClick: onClose })), imgVideoList.length > 1 && (_jsx("div", { className: "flex space-x-2 relative z-50", children: imgVideoList.map((file, idx) => (_jsx(Fragment, { children: file.type === EmbedObjType.VIDEO ? (_jsx("div", { className: clsx('rounded-md overflow-hidden h-14 object-cover cursor-pointer ease-linear duration-200 transition-[width] select-none', index === idx ? 'w-14' : 'w-7'), onClick: () => setIndex(idx), children: _jsx(VideoOverview, { url: file.url, showPlayBtn: false, showRadius: false, showLoading: false }, file.url) })) : (_jsx(Image, { alt: "thumbnail image", src: file.url, width: 56, height: 56, className: clsx('rounded-md h-14 object-cover cursor-pointer ease-linear duration-200 transition-[width] select-none', index === idx ? 'w-14' : 'w-7'), onClick: () => setIndex(idx) })) }, file.url))) })), selectedBot?.isImageGenerator && (_jsx(Tooltip, { open: !flagUserFirstPublishGallery ? true : undefined, description: flagUserFirstPublishGallery ? chatT('publish_to_gallery') : chatT('publish_battery'), variant: flagUserFirstPublishGallery ? 'default' : 'message', children: _jsx(IconButton, { icon: PhotoStackIcon, loading: publishing, onClick: e => {
                                e.stopPropagation();
                                e.preventDefault();
                                publishGalleryHandle?.(index);
                            }, variant: "primary", color: "brand", size: "md", className: "relative z-30 bg-beta-black-20 ml-2" }) })), _jsxs("div", { className: "flex justify-end relative z-50", children: [_jsx("div", { className: "absolute w-full h-full top-0 left-0", onClick: onClose }), _jsx(IconButton, { variant: "primary", color: "brand", size: "md", "aria-label": "download file", loading: downloading, onClick: handleDownload, className: "relative z-30 bg-beta-black-20 ml-2", icon: ArrowDownTrayIcon })] })] })] }));
}
