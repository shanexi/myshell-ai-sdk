"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Display;
const jsx_runtime_1 = require("react/jsx-runtime");
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const react_1 = require("react");
const Audio_1 = __importDefault(require("../../../../../../../common/components/file-uploader/views/file-list/file/display/Audio.js"));
const Image_1 = __importDefault(require("../../../../../../../common/components/file-uploader/views/file-list/file/display/Image.js"));
const Other_1 = __importDefault(require("../../../../../../../common/components/file-uploader/views/file-list/file/display/Other.js"));
const Video_1 = __importDefault(require("../../../../../../../common/components/file-uploader/views/file-list/file/display/Video.js"));
const getAcceptTypes_1 = require("../../../../../../../common/components/nocode/utils/getAcceptTypes.js");
const icon_button_1 = require("../../../../../../../common/components/ui/icon-button.js");
function Display({ file, onDelete }) {
    const [src, name, type, size] = (0, react_1.useMemo)(() => {
        if (typeof file === 'string') {
            const arr = file.split('/');
            const [filename, suffix] = arr[arr.length - 1]?.split('.');
            const filetype = (0, getAcceptTypes_1.getLocalTypeBySuffix)(suffix);
            return [file, filename, filetype];
        }
        const { name, size, type } = file;
        const displaySize = size < 1024 * 1024 ? `${Math.ceil(size / 1024)}kb` : `${Math.ceil(size / (1024 * 1024))}mb`;
        const mimeTypePrefix = type?.split('/')?.[0];
        const filetype = (getAcceptTypes_1.ENABLE_PREVIEW_FILE.includes(mimeTypePrefix) ? mimeTypePrefix : 'other');
        const previewUrl = getAcceptTypes_1.ENABLE_PREVIEW_FILE.includes(mimeTypePrefix) ? URL.createObjectURL(file) : undefined;
        return [previewUrl, name, filetype, displaySize];
    }, [file]);
    return type === 'audio' ? ((0, jsx_runtime_1.jsx)(Audio_1.default, { name: name, size: size, src: src, deleteEle: (0, jsx_runtime_1.jsx)(DeleteEle, { onDelete: onDelete }) })) : type === 'video' ? ((0, jsx_runtime_1.jsx)(Video_1.default, { name: name, size: size, src: src, deleteEle: (0, jsx_runtime_1.jsx)(DeleteEle, { onDelete: onDelete }) })) : type === 'image' ? ((0, jsx_runtime_1.jsx)(Image_1.default, { name: name, size: size, src: src, deleteEle: (0, jsx_runtime_1.jsx)(DeleteEle, { onDelete: onDelete }) })) : ((0, jsx_runtime_1.jsx)(Other_1.default, { name: name, size: size, deleteEle: (0, jsx_runtime_1.jsx)(DeleteEle, { onDelete: onDelete }) }));
}
function DeleteEle({ onDelete }) {
    return (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { className: "shrink-0", size: "sm", variant: "ghost", icon: XMarkIcon_1.default, onClick: onDelete });
}
