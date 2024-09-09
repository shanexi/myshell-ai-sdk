"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserBg;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const clsx_1 = __importDefault(require("clsx"));
const compressorjs_1 = __importDefault(require("compressorjs"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const BotDetailBg_png_1 = __importDefault(require("@/common/assets/images/workshop/BotDetailBg.png"));
const Camera_1 = __importDefault(require("../../../../common/components/icons/workshop/tts/Camera.js"));
const bot_1 = require("../../../../common/constants/enums/bot.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const UserCropperModal_1 = __importDefault(require("./UserCropperModal.js"));
const AcceptedImageSuffixs = ['png', 'jpeg', 'jpg'];
function UserBg({ bgPhoto, onActionSuccess, loading, className, showUpload = false }) {
    const inputRef = (0, react_2.useRef)(null);
    const [file, setFile] = (0, react_2.useState)();
    const [cropperModalVisible, setCropperModalVisible] = (0, react_2.useState)(false);
    const { warning } = (0, useNotification_1.useNotification)();
    const commonT = (0, next_intl_1.useTranslations)('common');
    const handleFileChange = (e) => {
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
            if (file.size > 1048576 * 2) {
                new compressorjs_1.default(file, {
                    quality: 0.6,
                    success(result) {
                        setFile(result);
                        setCropperModalVisible(true);
                    },
                    error(err) {
                        setFile(file);
                        setCropperModalVisible(true);
                    }
                });
            }
            else {
                setFile(file);
                setCropperModalVisible(true);
            }
        }
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full relative', className ? className : 'h-[120px] md:max-h-[190px] md:h-[12.2vw]'), children: [loading ? ((0, jsx_runtime_1.jsx)(image_1.default, { alt: "user detail background image", src: BotDetailBg_png_1.default, fill: true, priority: true, className: "object-cover" })) : ((0, jsx_runtime_1.jsx)(image_1.default, { alt: "user detail background image", src: bgPhoto ? bgPhoto : BotDetailBg_png_1.default, fill: true, priority: true, className: "object-cover" })), showUpload && ((0, jsx_runtime_1.jsx)(react_1.Center, { position: "absolute", w: "full", h: "full", children: (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)(react_1.Box, { p: "8px 12px", bgColor: "white", boxShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.05)", rounded: "full", cursor: "pointer", children: (0, jsx_runtime_1.jsx)(Camera_1.default, { color: "var(--primary)", fontSize: "20px" }) }), (0, jsx_runtime_1.jsx)("span", { className: "hidden", children: "\u9009\u62E9\u56FE\u7247\u4E0A\u4F20" }), (0, jsx_runtime_1.jsx)("input", { ref: inputRef, type: "file", className: "hidden", accept: "image/png, image/jpeg", onChange: handleFileChange, disabled: loading })] }) }))] }), cropperModalVisible && ((0, jsx_runtime_1.jsx)(UserCropperModal_1.default, { type: bot_1.BotPhotoTypeEnum.BACKGROUND, file: file, open: cropperModalVisible, onClose: (needRefresh = false, data) => {
                    console.log('onClose', data);
                    setCropperModalVisible(false);
                    setFile(undefined);
                    needRefresh && onActionSuccess && data && onActionSuccess(data?.objectKey);
                } }))] }));
}
