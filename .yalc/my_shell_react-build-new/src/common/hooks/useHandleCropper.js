"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cropperjs_1 = __importDefault(require("cropperjs"));
const react_1 = require("react");
const common_helper_1 = require("../../common/utils/common-helper.js");
const store_1 = require("../../services/store/index.js");
const lodash_es_1 = require("lodash-es");
const useHandleCropper = () => {
    const user = (0, store_1.useUserStore)(state => state.user);
    const [scale, setScale] = (0, react_1.useState)(1);
    const [previewUrl, setPreviewUrl] = (0, react_1.useState)(user?.avatar ? (0, common_helper_1.getAssetsUrl)(user.avatar) : '');
    const upLoadData = (0, react_1.useRef)(null);
    const cropperRef = (0, react_1.useRef)(null);
    const handleCropper = (imageRef) => {
        if (cropperRef.current) {
            cropperRef.current.destroy();
        }
        const cropper = new cropperjs_1.default(imageRef, {
            aspectRatio: 1 / 1,
            scalable: true,
            viewMode: 0,
            autoCropArea: 1,
            crop: () => {
                const canvas = cropper.getCroppedCanvas({
                    width: 500,
                    height: 500
                });
                canvas.toBlob(blob => {
                    if (blob) {
                        const _file = new File([blob], `${(0, lodash_es_1.uniqueId)()}-cropped-image.png`, { type: 'image/png' });
                        upLoadData.current = _file;
                    }
                }, 'image/png');
            }
        });
        cropperRef.current = cropper;
    };
    const handleScale = (value) => {
        setScale(value);
    };
    const handleScalePlus = () => {
        let _scale = scale + 0.1;
        if (_scale > 2) {
            _scale = 2;
        }
        setScale(_scale);
    };
    const handleScaleReduce = () => {
        let _scale = scale - 0.1;
        if (_scale < 1) {
            _scale = 1;
        }
        setScale(_scale);
    };
    const handleCropperScale = () => {
        return new Promise(resolve => {
            const cropper = cropperRef.current;
            if (cropper) {
                resolve(cropper.scale(scale));
            }
        });
    };
    (0, react_1.useEffect)(() => {
        if (user?.avatar) {
            setPreviewUrl((0, common_helper_1.getAssetsUrl)(user.avatar));
        }
    }, [user]);
    return {
        upLoadData,
        scale,
        previewUrl,
        setPreviewUrl,
        handleScale,
        handleScalePlus,
        handleScaleReduce,
        handleCropper,
        handleCropperScale
    };
};
exports.default = useHandleCropper;
