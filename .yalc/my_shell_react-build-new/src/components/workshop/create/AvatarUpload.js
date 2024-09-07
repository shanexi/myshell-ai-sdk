"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AvatarUploader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const common_1 = require("../../../apis/common.js");
const PictureIcon_1 = __importDefault(require("../../../common/components/icons/workshop/PictureIcon.js"));
const useHandleCropper_1 = __importDefault(require("../../../common/hooks/useHandleCropper.js"));
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const AcceptedImageSuffixs = ['png', 'jpeg', 'jpg'];
let cache;
const setCache = (url, dataUrl) => {
    if (!cache) {
        cache = new Map();
    }
    cache.set(url, dataUrl);
};
function AvatarUploader({ imgUrl, uploadFile, trackClick, scenario, className, imgClass }) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const [previewUrl, setPreviewUrl] = (0, react_2.useState)('');
    const { warning } = (0, useNotification_1.useNotification)();
    const imageRef = (0, react_2.useRef)(null);
    const { handleCropper, upLoadData } = (0, useHandleCropper_1.default)();
    const cachedUrl = cache?.get(imgUrl) || imgUrl;
    (0, react_2.useEffect)(() => {
        if (imgUrl) {
            setPreviewUrl('');
        }
    }, [imgUrl]);
    const sleep = async (ms) => {
        await new Promise(resolve => setTimeout(resolve, ms));
    };
    const handleFileChange = async (e) => {
        trackClick && trackClick(2);
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
            reader.onload = async () => {
                if (imageRef.current) {
                    const dataUrl = reader.result;
                    imageRef.current.src = dataUrl;
                    handleCropper(imageRef.current);
                    await sleep(300);
                    setPreviewUrl(imageRef.current.src);
                    const response = await (0, common_1.uploadFileToS3)(scenario || common_1.Scenario.SCENARIO_BOT_LOGO, fileSuffix, upLoadData.current);
                    if (response.objectKey) {
                        if (!cache) {
                            cache = new Map();
                        }
                        cache.set(response.objectAccessUrl, dataUrl);
                        uploadFile(response.objectAccessUrl, response.objectKey);
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("label", { className: (0, clsx_1.default)('bot-avatar-upload cursor-pointer group relative rounded-full bg-outline border border-[transparent] hover:border-[#D6D6D6] overflow-hidden', className ? className : 'w-[120px] h-[120px]'), children: [(0, jsx_runtime_1.jsx)("div", { className: `${previewUrl || imgUrl ? 'hidden group-hover:flex bg-black/80 ' : 'flex'} justify-center items-center absolute inset-0 rounded-full`, children: (0, jsx_runtime_1.jsx)(PictureIcon_1.default, { fontSize: imgClass ? '20px' : '50px', className: (0, clsx_1.default)(previewUrl || imgUrl ? 'text-white' : 'text-[#1F1F1F] dark:text-on-surface') }) }), (0, jsx_runtime_1.jsx)(react_1.Image, { src: previewUrl || cachedUrl || 'null', ref: imageRef, "data-src": imgUrl, border: "none", className: (0, clsx_1.default)('object-cover rounded-full flex-shrink-0', imgClass ? imgClass : 'h-[120px] max-w-[120px]', (previewUrl || imgUrl) && !imgClass ? 'min-w-[120px]' : 'min-w-0'), display: "inline-block !important" }), (0, jsx_runtime_1.jsx)("input", { type: "file", className: "hidden", onChange: handleFileChange, accept: "image/png, image/jpeg", onClick: e => (e.target.value = '') })] }));
}
