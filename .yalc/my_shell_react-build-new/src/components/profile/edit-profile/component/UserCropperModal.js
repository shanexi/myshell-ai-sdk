"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/ArrowLeftIcon"));
const MagnifyingGlassMinusIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/MagnifyingGlassMinusIcon"));
const MagnifyingGlassPlusIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/MagnifyingGlassPlusIcon"));
const lodash_es_1 = require("lodash-es");
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const react_cropper_1 = __importDefault(require("react-cropper"));
const common_1 = require("../../../../apis/common");
const bot_1 = require("../../../../common/constants/enums/bot");
const useNotification_1 = require("../../../../common/hooks/useNotification");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale");
require("cropperjs/dist/cropper.css");
const getTypeFromExt = (ext) => {
    if (ext === 'jpg') {
        return 'image/jpeg';
    }
    return `image/${ext}`;
};
function UserCropperModal({ type, file, open, onClose }) {
    const isMobile = (0, usePathLocale_1.useIsMobile)();
    const [loading, setLoading] = (0, react_2.useState)(false);
    const [imageSrc, setImageSrc] = (0, react_2.useState)('');
    const [ratio, setRatio] = (0, react_2.useState)(1);
    const [originRatio, setOriginRatio] = (0, react_2.useState)(1);
    const cropperRef = (0, react_2.createRef)();
    const cropper2Ref = (0, react_2.createRef)();
    const commonT = (0, next_intl_1.useTranslations)('common');
    const [imgNaturalWidth, setImgNaturalWidth] = (0, react_2.useState)(0);
    const [imgNaturalHeight, setImgNaturalHeight] = (0, react_2.useState)(0);
    const bestCropperWH = (0, react_2.useMemo)(() => {
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
    const maxRatio = (0, react_2.useMemo)(() => {
        return (originRatio || 1) * 3;
    }, [originRatio]);
    const step = (0, react_2.useMemo)(() => {
        return (originRatio || 1) / 10;
    }, [originRatio]);
    const ext = file.name?.split('.')?.pop() ?? 'png';
    const { warning } = (0, useNotification_1.useNotification)();
    (0, react_2.useEffect)(() => {
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result;
            setImageSrc(dataUrl);
        };
        reader.readAsDataURL(file);
    }, [file]);
    const handleUpLoadImg = (0, react_2.useCallback)(async () => {
        setLoading(true);
        try {
            const dataUrl = cropper2Ref.current?.cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.6);
            fetch(dataUrl)
                .then(res => res.blob())
                .then(blob => {
                const _file = new File([blob], `${(0, lodash_es_1.uniqueId)()}-cropped-image.${ext}`, { type: getTypeFromExt(ext) });
                return (0, common_1.uploadFileToS3)(common_1.Scenario.SCENARIO_USER_BACKGROUND, ext, _file);
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
    const handleReady = (0, react_2.useCallback)(() => {
        const cRef = cropperRef.current;
        if (cRef) {
            const { naturalHeight, naturalWidth } = cRef.cropper.getCanvasData();
            setImgNaturalWidth(naturalWidth);
            setImgNaturalHeight(naturalHeight);
        }
    }, [cropperRef]);
    const handleReady2 = (0, react_2.useCallback)(() => {
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
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { closeOnEsc: false, closeOnOverlayClick: false, isOpen: open, onClose: () => onClose(false), isCentered: true, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, {}), (0, jsx_runtime_1.jsxs)(react_1.ModalContent, { w: "auto", maxW: "auto", maxH: "auto", className: "bg-surface", borderRadius: "24px", color: "#141718", p: 0, children: [(0, jsx_runtime_1.jsxs)(react_1.ModalHeader, { display: "flex", className: "relative", p: 4, children: [(0, jsx_runtime_1.jsxs)(react_1.Flex, { w: "full", justifyContent: "space-between", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(react_1.Center, { w: "36px", h: "36px", cursor: "pointer", onClick: () => onClose(false), children: (0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: "w-[24px] h-[24px] stroke-on-surface" }) }), (0, jsx_runtime_1.jsx)(react_1.Text, { className: "flex-grow leading-loose text-on-surface", fontSize: "18px", lineHeight: "28px", fontWeight: "600", children: commonT('cover_pic') })] }), (0, jsx_runtime_1.jsx)(react_1.Button, { ml: 4, variant: "ghost", p: "8px 16px", h: "36px", className: "bg-primary", _hover: {
                                    background: 'var(--primary)'
                                }, minW: "65px", rounded: "full", color: "#fff", onClick: handleUpLoadImg, isLoading: loading, children: commonT('save') })] }), (0, jsx_runtime_1.jsxs)(react_1.ModalBody, { p: 0, children: [(0, jsx_runtime_1.jsx)(react_1.Center, { bgColor: "#F5F7FA", children: (0, jsx_runtime_1.jsxs)(react_1.Box, { position: "relative", overflow: "hidden", w: "fit-content", h: "fit-content", children: [bestCropperWH && ((0, jsx_runtime_1.jsx)(react_cropper_1.default, { className: "min-w-[200px] min-h-[200px]", style: bestCropperWH, ref: cropper2Ref, src: imageSrc, viewMode: 1, minCropBoxHeight: 10, minCropBoxWidth: 10, background: false, responsive: true, cropBoxResizable: false, cropBoxMovable: false, checkOrientation: true, guides: true, dragMode: "move", modal: false, autoCropArea: 1, zoomOnWheel: false, zoomOnTouch: false, ready: handleReady2, aspectRatio: type === bot_1.BotPhotoTypeEnum.BACKGROUND ? 5 : 1 })), (0, jsx_runtime_1.jsx)(react_cropper_1.default, { className: "hidden w-[100px] h-[100px]", ref: cropperRef, src: imageSrc, ready: handleReady })] }) }), (0, jsx_runtime_1.jsxs)(react_1.Flex, { p: 4, className: "space-x-3", children: [(0, jsx_runtime_1.jsx)(MagnifyingGlassMinusIcon_1.default, { className: "w-5 h-5 cursor-pointer stroke-on-surface", onClick: handleScaleReduce }), (0, jsx_runtime_1.jsxs)(react_1.Slider, { "aria-label": "slider-ex-1", value: ratio, min: originRatio || 1, max: maxRatio, step: step, onChange: (value) => handleScale(value), children: [(0, jsx_runtime_1.jsx)(react_1.SliderTrack, { bg: "var(--border)", height: "6px", children: (0, jsx_runtime_1.jsx)(react_1.SliderFilledTrack, { bg: "var(--primary)" }) }), (0, jsx_runtime_1.jsx)(react_1.SliderThumb, { bg: "var(--primary)", width: "18px", height: "18px" })] }), (0, jsx_runtime_1.jsx)(MagnifyingGlassPlusIcon_1.default, { className: "w-5 h-5 cursor-pointer  stroke-on-surface", onClick: handleScalePlus })] })] })] })] }));
}
exports.default = UserCropperModal;
