"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftIcon"));
const MagnifyingGlassMinusIcon_1 = __importDefault(require("@heroicons/react/24/outline/MagnifyingGlassMinusIcon"));
const MagnifyingGlassPlusIcon_1 = __importDefault(require("@heroicons/react/24/outline/MagnifyingGlassPlusIcon"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const common_1 = require("../../../../apis/common.js");
const user_1 = require("../../../../apis/user.js");
const button_1 = require("../../../../common/components/ui/button.js");
const modal_1 = require("../../../../common/components/ui/modal.js");
const useHandleCropper_1 = __importDefault(require("../../../../common/hooks/useHandleCropper.js"));
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const store_1 = require("../../../../services/store/index.js");
const AcceptedImageSuffixs = ['png', 'jpeg', 'jpg'];
function UpdateAvatarModal({ open, onClose }) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const t = (0, next_intl_1.useTranslations)('profile');
    const isGlobalLoading = (0, store_1.useGlobalStore)(state => state.isGlobalLoading);
    const globalLoading = (0, store_1.useGlobalStore)(state => state.globalLoading);
    const globalLoaded = (0, store_1.useGlobalStore)(state => state.globalLoaded);
    const setUser = (0, store_1.useUserStore)(state => state.setUser);
    const { warning } = (0, useNotification_1.useNotification)();
    const [hasChangeImg, setHasChangeImg] = (0, react_2.useState)(false);
    const imageRef = (0, react_2.useRef)(null);
    const { upLoadData, scale, previewUrl, setPreviewUrl, handleScale, handleScalePlus, handleScaleReduce, handleCropper, handleCropperScale } = (0, useHandleCropper_1.default)();
    (0, react_2.useEffect)(() => {
        if (!upLoadData.current && imageRef.current) {
            handleCropper(imageRef.current);
        }
    }, [handleCropper, upLoadData, previewUrl]);
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSuffix = (0, common_helper_1.getFileExtension)(file.name);
            if (!AcceptedImageSuffixs.some(s => s === fileSuffix)) {
                warning({ content: commonT('unsupported_img_file_type') });
                return;
            }
            if (file.size > 1048576 * 5) {
                warning({ content: commonT('image_up_to_5m') });
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                if (imageRef.current) {
                    imageRef.current.src = reader.result;
                    handleCropper(imageRef.current);
                    setHasChangeImg(true);
                    setPreviewUrl(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const sleep = async (ms) => {
        await new Promise(resolve => setTimeout(resolve, ms));
    };
    const handleUpLoadAvatar = async () => {
        globalLoading();
        await handleCropperScale();
        await sleep(300);
        const file = upLoadData.current;
        try {
            const ext = file.name?.split('.')?.pop() ?? 'png';
            const res = await (0, common_1.uploadFileToS3)(common_1.Scenario.SCENARIO_USER_AVATAR, ext, file);
            const { data } = await (0, user_1.getUserProfile)();
            setUser(data);
            onClose(res.objectKey);
        }
        catch (e) {
        }
        finally {
            globalLoaded();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(modal_1.Modal, { open: open, hideClose: true, onClose: onClose, size: "md", children: [(0, jsx_runtime_1.jsxs)(modal_1.ModalHeader, { className: "relative flex flex-row py-4 px-5 justify-between items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center h-8 w-8 cursor-pointer", onClick: () => {
                            onClose();
                        }, children: (0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: "w-2/3 h-2/3 stroke-on-surface" }) }), (0, jsx_runtime_1.jsx)(react_1.Text, { className: "flex-grow leading-loose text-on-surface", fontWeight: "700", children: t('update_avatar') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "brand", size: "md", className: "min-w-[96px]", disabled: !hasChangeImg && scale === 1, onClick: () => !(!hasChangeImg && scale === 1) && handleUpLoadAvatar(), loading: isGlobalLoading, children: t('confirm') })] }), (0, jsx_runtime_1.jsx)("label", { className: "px-5 flex flex-col justify-center items-center", children: (0, jsx_runtime_1.jsxs)(react_1.Box, { className: "user-avatar-upload", position: "relative", overflow: "hidden", border: "4px solid var(--primary)", w: { base: '284px', md: '488px' }, h: { base: '284px', md: '488px' }, children: [(0, jsx_runtime_1.jsx)(react_1.Image, { boxSize: "100%", objectFit: "cover", src: previewUrl, alt: "avatar", style: { transform: `scale(${scale})` }, zIndex: 2, display: "inline-block !important", ref: imageRef }), (0, jsx_runtime_1.jsx)("input", { type: "file", accept: "image/png, image/jpeg", onChange: e => handleFileChange(e), className: "invisible" })] }) }), (0, jsx_runtime_1.jsxs)(react_1.Box, { display: "flex", mt: "1rem", mb: "0.8rem", mx: { base: '2rem', md: '2.75rem' }, className: "space-x-4", children: [(0, jsx_runtime_1.jsx)(MagnifyingGlassMinusIcon_1.default, { className: "w-5 h-5 cursor-pointer stroke-on-surface", onClick: handleScaleReduce }), (0, jsx_runtime_1.jsxs)(react_1.Slider, { "aria-label": "slider-ex-1", value: scale, min: 1, max: 2, step: 0.01, onChange: (value) => handleScale(value), children: [(0, jsx_runtime_1.jsx)(react_1.SliderTrack, { bg: "#F1EAFE", children: (0, jsx_runtime_1.jsx)(react_1.SliderFilledTrack, { bg: "#F1EAFE" }) }), (0, jsx_runtime_1.jsx)(react_1.SliderThumb, { bg: "var(--primary)" })] }), (0, jsx_runtime_1.jsx)(MagnifyingGlassPlusIcon_1.default, { className: "w-5 h-5 cursor-pointer stroke-on-surface", onClick: handleScalePlus })] })] }));
}
exports.default = UpdateAvatarModal;
