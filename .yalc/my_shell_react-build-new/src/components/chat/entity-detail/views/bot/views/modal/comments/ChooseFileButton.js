"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChooseFileButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const PlusCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/PlusCircleIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const useNotification_1 = require("../../../../../../../../common/hooks/useNotification.js");
const useDropFiles_1 = require("../../../../../../../../chat/views/editor/useDropFiles.js");
const tooltip_1 = require("../../../../../../../../common/components/ui/tooltip.js");
exports.ChooseFileButton = (0, react_1.memo)(({ disabled, botId, onFileChange, pending }) => {
    const { error } = (0, useNotification_1.useNotification)();
    const fileUploadSizeMaximum = 5 * 1024 ** 2;
    const t = (0, next_intl_1.useTranslations)('common');
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const getRejectdMeassge = (_unSupport, tooLarge) => {
        if (tooLarge && Array.isArray(tooLarge) && tooLarge[0]?.code) {
            error({
                content: chatT('replicate.upload_filesize_tip', {
                    maxSize: `${Math.ceil(fileUploadSizeMaximum / 1024 ** 2)}M`
                })
            });
        }
    };
    const { getRootProps, getInputProps } = (0, useDropFiles_1.useDropFiles)({
        noDrag: true,
        noClick: false,
        onFileChange,
        from: 'input',
        botId,
        disabled,
        imPanelChatConfig: {
            supportedEmbedTypes: ['MESSAGE_METADATA_TYPE_IMAGE_FILE'],
            embedNumberLimit: 1
        },
        uploadSettings: {
            embedMaxFileBytesEach: fileUploadSizeMaximum.toString()
        },
        getRejectdMeassge
    });
    const { onClick, ...rest } = getRootProps();
    const handleClick = (e) => {
        e.preventDefault();
        if (disabled) {
            return;
        }
        if (onClick) {
            onClick(e);
        }
    };
    return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { variant: "info", side: "top", align: "start", description: disabled ? (pending ? chatT('replicate.uploading') : chatT('replicate.maxfiles')) : t('upload_image'), children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-9 inline-flex justify-center items-center rounded-full hover:bg-surface-container-low', {
                'opacity-30 cursor-not-allowed': disabled,
                'cursor-pointer': !disabled
            }), onClick: handleClick, ...rest, children: [(0, jsx_runtime_1.jsx)(PlusCircleIcon_1.default, { className: "w-5.5 h-5.5 text-brand" }), (0, jsx_runtime_1.jsx)("input", { name: "file-upload", className: "sr-only", ...getInputProps() })] }) }));
});
exports.ChooseFileButton.displayName = 'ChooseFileButton';
