"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowPathIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/ArrowPathIcon"));
const ExclamationCircleIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/ExclamationCircleIcon"));
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/PlayIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/XMarkIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const spinner_1 = __importDefault(require("../../../../../common/components/ui/spinner"));
const tooltip_1 = require("../../../../../common/components/ui/tooltip");
const audio_player_1 = __importDefault(require("../audio-player"));
const File = (0, react_1.memo)(({ data, onDelete, onPreview, uploadFiles, index, isMobile, isChoosingFile }) => {
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { status, uiData, file, botId, id } = data;
    const { mimeType, icon, iconUrl, bg, type, name, serverType, ex } = uiData;
    const isError = status === 'error';
    const isPending = status === 'pending';
    const isSuccess = status === 'completed';
    const isFile = mimeType === 'application' || mimeType === 'text';
    const isImage = mimeType === 'image';
    const isAudio = mimeType === 'audio';
    const isVideo = mimeType === 'video';
    const preview = (0, react_1.useMemo)(() => {
        if (file) {
            return ['image', 'audio', 'video'].includes(mimeType) ? URL.createObjectURL(file) : '';
        }
        return '';
    }, [isPending, index]);
    const handlePreview = (index) => {
        if (isSuccess && (isImage || isVideo)) {
            onPreview(id);
            if (isChoosingFile) {
                isChoosingFile.current = true;
            }
        }
        if (isError) {
            uploadFiles(botId, [{ ...data, status: 'pending' }], true);
        }
    };
    const handleDelete = (e) => {
        e.stopPropagation();
        e.preventDefault();
        document.getElementById('mobileInput')?.focus();
        onDelete(botId, id);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative rounded-xl group/attach first:ml-3 last:mr-3 mr-2 cursor-default', isError ? 'border-[#D72C0D]' : 'border-outline', {
            border: !(isImage || isVideo) || isError,
            relative: isImage || isVideo,
            'flex justify-start items-center px-3 py-1.5': isFile,
            'w-[180px] flex justify-start items-center p-1.5 rounded-xl': isAudio
        }), onClick: e => {
            e.preventDefault();
            document.getElementById('mobileInput')?.focus();
            handlePreview(index);
        }, children: [(isAudio || (!isSuccess && isFile)) && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)({
                    'absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center': isImage || isVideo,
                    'w-7 h-7 rounded-lg mr-3': !(isImage || isVideo),
                    'bg-[#D72C0D]': isError && !(isImage || isVideo),
                    'bg-[#8C9196]': isPending && !(isImage || isVideo),
                    hidden: isAudio,
                    'flex justify-center items-center': isFile
                }), style: bg ? { background: bg } : {}, children: [isError && (0, jsx_runtime_1.jsx)(ArrowPathIcon_1.default, { className: "w-4 h-4 text-white" }), isPending && ((0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm", className: "text-static w-[14px] h-[14px]" }) }))] })), isSuccess && isFile && ((0, jsx_runtime_1.jsx)("div", { className: "w-7 h-7 rounded-lg mr-3", children: (0, jsx_runtime_1.jsx)("img", { src: iconUrl }) })), isFile && ((0, jsx_runtime_1.jsxs)("div", { className: "w-[116px] flex flex-col justify-center items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-on-surface line-clamp-1 break-all font-medium", children: file.name }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-secondary line-clamp-1 break-all", children: type })] })), isImage && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-12 h-12 rounded-xl overflow-hidden', { 'border border-outline': !isError }), children: [(0, jsx_runtime_1.jsx)("img", { src: preview, className: "w-full h-full object-cover", onLoad: () => {
                            URL.revokeObjectURL(preview);
                        } }), !isSuccess && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('absolute z-[1] left-0 top-0 bottom-0 right-0 rounded-xl flex justify-center items-center', {
                            'bg-[#EC2F0D33]': isError,
                            'bg-[#FFFFFFBF] dark:bg-[#000000BF]': !isError
                        }), children: [isPending && ((0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm", className: "text-static w-[14px] h-[14px]" }) })), isError && (0, jsx_runtime_1.jsx)(ArrowPathIcon_1.default, { className: "w-4 h-4 text-white" })] }))] })), isVideo && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative w-12 h-12 rounded-xl overflow-hidden', { 'border border-outline': !isError }), children: [(0, jsx_runtime_1.jsx)("video", { src: preview, className: "w-full h-full object-fill overflow-hidden", onLoad: () => {
                            URL.revokeObjectURL(preview);
                        } }), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('absolute z-[1] left-0 top-0 bottom-0 right-0 flex justify-center items-center', {
                            'bg-[#EC2F0D33]': isError,
                            'bg-[#000000BF]': !isError
                        }), children: [isSuccess && (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "w-5 h-5 text-white" }), isPending && ((0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm", className: "text-static w-[14px] h-[14px]" }) })), isError && (0, jsx_runtime_1.jsx)(ArrowPathIcon_1.default, { className: "w-4 h-4 text-white" })] })] })), isAudio && (0, jsx_runtime_1.jsx)(audio_player_1.default, { data: data, preview: preview }), isError && ((0, jsx_runtime_1.jsx)("div", { className: "absolute z-[1] -right-[10px] -top-[10px] rounded-full error-icon bg-surface justify-center items-center flex group-hover/attach:hidden", children: (0, jsx_runtime_1.jsx)(ExclamationCircleIcon_1.default, { className: "w-5 h-5 text-[#D72C0D]" }) })), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: commonT('delete'), children: (0, jsx_runtime_1.jsx)("button", { className: (0, clsx_1.default)('absolute z-[1] -right-[10px] -top-[10px] w-5 h-5 border border-white rounded-full bg-secondary justify-center items-center group-hover/attach:flex', isMobile ? 'flex' : 'hidden'), onClick: handleDelete, children: (0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "w-3 h-3 text-white" }) }) })] }));
});
File.displayName = 'File';
const FileCard = (0, react_1.memo)((props) => ((0, jsx_runtime_1.jsx)(File, { data: props.data, onDelete: props.onDelete, onPreview: props.onPreview, uploadFiles: props.uploadFiles, index: props.index, isMobile: props.isMobile, isChoosingFile: props.isChoosingFile })));
FileCard.displayName = 'FileCard';
exports.default = FileCard;
