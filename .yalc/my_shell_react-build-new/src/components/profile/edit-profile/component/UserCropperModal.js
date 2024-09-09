import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Center, Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';
import MagnifyingGlassMinusIcon from '@heroicons/react/24/outline/MagnifyingGlassMinusIcon';
import MagnifyingGlassPlusIcon from '@heroicons/react/24/outline/MagnifyingGlassPlusIcon';
import { uniqueId } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import Cropper from 'react-cropper';
import { uploadFileToS3, Scenario } from '../../../../apis/common.js';
import { BotPhotoTypeEnum } from '../../../../common/constants/enums/bot.js';
import { useNotification } from '../../../../common/hooks/useNotification.js';
import { useIsMobile } from '../../../../common/hooks/usePathLocale.js';
import 'cropperjs/dist/cropper.css';
const getTypeFromExt = (ext) => {
    if (ext === 'jpg') {
        return 'image/jpeg';
    }
    return `image/${ext}`;
};
function UserCropperModal({ type, file, open, onClose }) {
    const isMobile = useIsMobile();
    const [loading, setLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [ratio, setRatio] = useState(1);
    const [originRatio, setOriginRatio] = useState(1);
    const cropperRef = createRef();
    const cropper2Ref = createRef();
    const commonT = useTranslations('common');
    const [imgNaturalWidth, setImgNaturalWidth] = useState(0);
    const [imgNaturalHeight, setImgNaturalHeight] = useState(0);
    const bestCropperWH = useMemo(() => {
        if (imgNaturalHeight === 0 || imgNaturalWidth === 0)
            return null;
        let maxWidth;
        let maxHeight;
        if (isMobile) {
            maxWidth = 320;
            maxHeight = 540;
        }
        else {
            maxWidth = 720;
            maxHeight = 480;
        }
        const aspectRatio = imgNaturalWidth / imgNaturalHeight;
        let scaledWidth = imgNaturalWidth;
        let scaledHeight = imgNaturalHeight;
        if (scaledWidth > maxWidth || scaledHeight > maxHeight) {
            if (aspectRatio > maxWidth / maxHeight) {
                scaledWidth = maxWidth;
                scaledHeight = scaledWidth / aspectRatio;
            }
            else {
                scaledHeight = maxHeight;
                scaledWidth = scaledHeight * aspectRatio;
            }
        }
        return {
            width: scaledWidth,
            height: scaledHeight
        };
    }, [imgNaturalHeight, imgNaturalWidth, isMobile]);
    const maxRatio = useMemo(() => {
        return (originRatio || 1) * 3;
    }, [originRatio]);
    const step = useMemo(() => {
        return (originRatio || 1) / 10;
    }, [originRatio]);
    const ext = file.name?.split('.')?.pop() ?? 'png';
    const { warning } = useNotification();
    useEffect(() => {
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result;
            setImageSrc(dataUrl);
        };
        reader.readAsDataURL(file);
    }, [file]);
    const handleUpLoadImg = useCallback(async () => {
        setLoading(true);
        try {
            const dataUrl = cropper2Ref.current?.cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.6);
            fetch(dataUrl)
                .then(res => res.blob())
                .then(blob => {
                const _file = new File([blob], `${uniqueId()}-cropped-image.${ext}`, { type: getTypeFromExt(ext) });
                return uploadFileToS3(Scenario.SCENARIO_USER_BACKGROUND, ext, _file);
            })
                .then((res) => {
                onClose(true, res);
                return res;
            })
                .catch(() => {
                warning({
                    content: 'Upload Failed!'
                });
                onClose(false);
            })
                .finally(() => {
                setLoading(false);
            });
        }
        catch (e) {
            return null;
        }
    }, [cropper2Ref, ext, onClose, type, warning]);
    const handleReady = useCallback(() => {
        const cRef = cropperRef.current;
        if (cRef) {
            const { naturalHeight, naturalWidth } = cRef.cropper.getCanvasData();
            setImgNaturalWidth(naturalWidth);
            setImgNaturalHeight(naturalHeight);
        }
    }, [cropperRef]);
    const handleReady2 = useCallback(() => {
        const cRef = cropper2Ref.current;
        if (cRef) {
            const { height, naturalHeight } = cRef.cropper.getCanvasData();
            const originRatio = height / naturalHeight;
            setRatio(originRatio);
            setOriginRatio(originRatio);
        }
    }, [cropper2Ref]);
    const handleScaleReduce = () => {
        let _ratio = ratio - step;
        if (_ratio < originRatio) {
            _ratio = originRatio;
        }
        handleScale(_ratio);
    };
    const handleScalePlus = () => {
        let _ratio = ratio + step;
        if (_ratio > maxRatio) {
            _ratio = maxRatio;
        }
        handleScale(_ratio);
    };
    const handleScale = (value) => {
        setRatio(value);
        const cRef = cropper2Ref.current;
        if (cRef) {
            cRef.cropper.zoomTo(value);
        }
    };
    return (_jsxs(Modal, { closeOnEsc: false, closeOnOverlayClick: false, isOpen: open, onClose: () => onClose(false), isCentered: true, children: [_jsx(ModalOverlay, {}), _jsxs(ModalContent, { w: "auto", maxW: "auto", maxH: "auto", className: "bg-surface", borderRadius: "24px", color: "#141718", p: 0, children: [_jsxs(ModalHeader, { display: "flex", className: "relative", p: 4, children: [_jsxs(Flex, { w: "full", justifyContent: "space-between", alignItems: "center", children: [_jsx(Center, { w: "36px", h: "36px", cursor: "pointer", onClick: () => onClose(false), children: _jsx(ArrowLeftIcon, { className: "w-[24px] h-[24px] stroke-on-surface" }) }), _jsx(Text, { className: "flex-grow leading-loose text-on-surface", fontSize: "18px", lineHeight: "28px", fontWeight: "600", children: commonT('cover_pic') })] }), _jsx(Button, { ml: 4, variant: "ghost", p: "8px 16px", h: "36px", className: "bg-primary", _hover: {
                                    background: 'var(--primary)'
                                }, minW: "65px", rounded: "full", color: "#fff", onClick: handleUpLoadImg, isLoading: loading, children: commonT('save') })] }), _jsxs(ModalBody, { p: 0, children: [_jsx(Center, { bgColor: "#F5F7FA", children: _jsxs(Box, { position: "relative", overflow: "hidden", w: "fit-content", h: "fit-content", children: [bestCropperWH && (_jsx(Cropper, { className: "min-w-[200px] min-h-[200px]", style: bestCropperWH, ref: cropper2Ref, src: imageSrc, viewMode: 1, minCropBoxHeight: 10, minCropBoxWidth: 10, background: false, responsive: true, cropBoxResizable: false, cropBoxMovable: false, checkOrientation: true, guides: true, dragMode: "move", modal: false, autoCropArea: 1, zoomOnWheel: false, zoomOnTouch: false, ready: handleReady2, aspectRatio: type === BotPhotoTypeEnum.BACKGROUND ? 5 : 1 })), _jsx(Cropper, { className: "hidden w-[100px] h-[100px]", ref: cropperRef, src: imageSrc, ready: handleReady })] }) }), _jsxs(Flex, { p: 4, className: "space-x-3", children: [_jsx(MagnifyingGlassMinusIcon, { className: "w-5 h-5 cursor-pointer stroke-on-surface", onClick: handleScaleReduce }), _jsxs(Slider, { "aria-label": "slider-ex-1", value: ratio, min: originRatio || 1, max: maxRatio, step: step, onChange: (value) => handleScale(value), children: [_jsx(SliderTrack, { bg: "var(--border)", height: "6px", children: _jsx(SliderFilledTrack, { bg: "var(--primary)" }) }), _jsx(SliderThumb, { bg: "var(--primary)", width: "18px", height: "18px" })] }), _jsx(MagnifyingGlassPlusIcon, { className: "w-5 h-5 cursor-pointer  stroke-on-surface", onClick: handleScalePlus })] })] })] })] }));
}
export default UserCropperModal;
