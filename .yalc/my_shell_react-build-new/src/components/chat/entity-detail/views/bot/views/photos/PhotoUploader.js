"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PhotoUploader;
const jsx_runtime_1 = require("react/jsx-runtime");
const CameraIcon_1 = __importDefault(require("@heroicons/react/24/solid/CameraIcon"));
const clsx_1 = __importDefault(require("clsx"));
const compressorjs_1 = __importDefault(require("compressorjs"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const spinner_1 = __importDefault(require("../../../../../../../common/components/ui/spinner.js"));
const useNotification_1 = require("../../../../../../../common/hooks/useNotification.js");
const common_helper_1 = require("../../../../../../../common/utils/common-helper.js");
const AcceptedImageSuffixs = ['png', 'jpeg', 'jpg'];
function PhotoUploader({ onFileReadyToUpload }) {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const inputRef = (0, react_1.useRef)(null);
    const [uploading, setUploading] = (0, react_use_1.useToggle)(false);
    const { warning } = (0, useNotification_1.useNotification)();
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileSuffix = (0, common_helper_1.getFileExtension)(file.name);
            if (!AcceptedImageSuffixs.some(s => s === fileSuffix)) {
                warning({ content: commonT('unsupported_img_file_type') });
                return;
            }
            if (file.size > 1024 * 1024 * 5) {
                warning({ content: commonT('image_up_to_5m') });
                return;
            }
            let treatedFile = file;
            if (file.size > 1024 * 1024 * 2) {
                new compressorjs_1.default(file, {
                    quality: 0.6,
                    success(result) {
                        treatedFile = result;
                    }
                });
            }
            setUploading(true);
            onFileReadyToUpload(treatedFile, fileSuffix, () => {
                setUploading(false);
            }, () => {
                if (inputRef.current) {
                    inputRef.current.value = '';
                }
            });
        }
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('flex h-full justify-center items-center relative bg-surface-container aspect-square', uploading ? 'cursor-not-allowed' : 'cursor-pointer'), children: uploading ? (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "md" }) : (0, jsx_runtime_1.jsx)(CameraIcon_1.default, { className: "size-[30px] dark:text-[#868996]" }) }), (0, jsx_runtime_1.jsx)("span", { className: "hidden", children: "Select Image" }), (0, jsx_runtime_1.jsx)("input", { ref: inputRef, type: "file", className: "hidden", accept: "image/png, image/jpeg", onChange: handleFileChange, disabled: uploading })] }) }));
}
