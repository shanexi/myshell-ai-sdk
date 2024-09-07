"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChooseFileButton = void 0;
exports.Expand = Expand;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ChevronDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronDownIcon"));
const ChevronUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronUpIcon"));
const MicrophoneIcon_1 = __importDefault(require("@heroicons/react/24/outline/MicrophoneIcon"));
const PlusCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/PlusCircleIcon"));
const PaperAirplaneIcon_1 = __importDefault(require("@heroicons/react/24/solid/PaperAirplaneIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const dynamic_1 = __importDefault(require("next/dynamic"));
const image_1 = __importDefault(require("next/image"));
const react_2 = require("react");
const FunctionMenu_1 = __importDefault(require("../../../chat/views/chat-input/function-menu/FunctionMenu.js"));
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const tooltip_1 = require("../../../common/components/ui/tooltip.js");
const user_1 = require("../../../common/constants/enums/user.js");
const sensors_1 = require("../../../lib/sensors/index.js");
const store_1 = require("../../../services/store/index.js");
const attachments_1 = __importDefault(require("./attachments.js"));
const tipsmodal_1 = __importDefault(require("./tipsmodal.js"));
const useDropFiles_1 = require("./useDropFiles.js");
const VoiceConnectEntry = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../chat/views/voice-call/VoiceConnectEntry.js'))), {
    ssr: false
});
exports.ChooseFileButton = (0, react_2.memo)(({ onFileChange, imPanelChatConfig, botId, botName, disabled, isChoosingFile, showDialog, onFileDialogCancel, uploadSettings }) => {
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const sensors = (0, sensors_1.useSensors)();
    const onTrack = (fileType, fileSize) => {
        if (sensors && sensors.track) {
            sensors?.track('UploadFile', {
                item_type: 'bot',
                item_id: botId,
                item_name: botName,
                file_type: fileType,
                file_size: fileSize
            });
        }
    };
    const { getRootProps, getInputProps } = (0, useDropFiles_1.useDropFiles)({
        noDrag: true,
        noClick: false,
        onFileChange,
        imPanelChatConfig,
        from: 'input',
        botId,
        uploadSettings,
        isChoosingFile,
        onFileDialogCancel,
        onTrack,
        disabled
    });
    const maxSize = (0, react_2.useMemo)(() => {
        return Math.ceil((Number(uploadSettings?.embedMaxFileBytesEach) || 50 * 1024 ** 2) / 1024 ** 2);
    }, [uploadSettings?.embedMaxFileBytesEach]);
    const fileAlert = (0, store_1.useChatStore)(state => state.fileUpload.alert);
    const { onClick, ...rest } = getRootProps();
    const handleClick = (e) => {
        e.preventDefault();
        if (disabled) {
            return;
        }
        if (isChoosingFile && !disabled) {
            isChoosingFile.current = true;
        }
        const el = document.getElementById('mobileInput');
        if (el) {
            el.focus();
        }
        if (onClick) {
            onClick(e);
        }
    };
    const handlePopoverClick = (e) => {
        e.preventDefault();
        const el = document.getElementById('mobileInput');
        if (el) {
            el.focus();
        }
    };
    const handlePopoverClose = () => {
        const el = document.getElementById('mobileInput');
        if (el) {
            el.style.caretColor = 'inherit';
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { variant: "info", side: "top", align: "start", description: chatT(disabled ? 'panel.unsupport_files' : 'panel.upload_tip'), children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('cursor-pointer w-9 inline-flex justify-center items-center rounded-full hover:bg-surface-container-low', {
                        'opacity-30 cursor-not-allowed': disabled
                    }), onClick: handleClick, ...rest, children: [(0, jsx_runtime_1.jsx)(PlusCircleIcon_1.default, { className: "w-5.5 h-5.5 text-brand" }), (0, jsx_runtime_1.jsx)("input", { name: "file-upload", className: "sr-only", ...getInputProps() })] }) }), fileAlert.visible && (0, jsx_runtime_1.jsx)(tipsmodal_1.default, { maxSize: maxSize })] }));
});
function Expand({ isFullScreen, toogleFullScreen }) {
    return ((0, jsx_runtime_1.jsxs)("button", { className: "rounded-full p-[3px] bg-surface-container-low w-6 h-6 absolute top-4 left-[56px] z-[99]", onClick: toogleFullScreen, children: [!isFullScreen && (0, jsx_runtime_1.jsx)(ChevronUpIcon_1.default, { className: "w-[18px] h-[18px] text-on-surface" }), isFullScreen && (0, jsx_runtime_1.jsx)(ChevronDownIcon_1.default, { className: "w-[18px] h-[18px] text-on-surface" })] }));
}
function Toolbar({ botId, botName, botInfo, imPanelChatConfig, onSendClick, toolbarState, isMobile, isChoosingFile, onFileChange, onFileDialogCancel, isWorkshop = false }) {
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const deleteUploadFiles = (0, store_1.useChatStore)(state => state.deleteUploadFiles);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(attachments_1.default, { botId: botId, onDelete: deleteUploadFiles, isMobile: isMobile || false, isChoosingFile: isChoosingFile }), isMobile && toolbarState.tokenLen > toolbarState.maxChatToken && ((0, jsx_runtime_1.jsxs)("div", { className: "p-2 text-sm bg-[#FFF4F4] text-[#EC2F0D] rounded-lg mb-1 flex flex-col", children: [(0, jsx_runtime_1.jsx)("span", { children: chatT('over_text_length') }), (0, jsx_runtime_1.jsxs)("span", { className: "self-end", children: [toolbarState.tokenLen, "/", toolbarState.maxChatToken] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "toolbar flex justify-between items-center mt-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-1", children: [!isMobile && (0, jsx_runtime_1.jsx)(FunctionMenu_1.default, { isWorkshop: isWorkshop, botInfo: botInfo }), (0, jsx_runtime_1.jsx)(exports.ChooseFileButton, { onFileChange: onFileChange, imPanelChatConfig: imPanelChatConfig, uploadSettings: toolbarState?.uploadSettings, botId: botId, botName: botName, disabled: toolbarState.uploadButtonDisabled || toolbarState.sending, isChoosingFile: isChoosingFile, showDialog: false, onFileDialogCancel: onFileDialogCancel })] }), (isMobile || toolbarState.showSendButton) && ((0, jsx_runtime_1.jsxs)("div", { id: "web3-chat-triger-input", className: "flex items-center", children: [!isMobile && toolbarState.isText && toolbarState.tokenLen > toolbarState.maxChatToken && ((0, jsx_runtime_1.jsxs)("span", { className: "p-2 ml-2 mr-1.5 text-sm bg-[#FFF4F4] text-[#EC2F0D] rounded-lg", children: [chatT('over_text_length'), toolbarState.tokenLen, "/", toolbarState.maxChatToken] })), (0, jsx_runtime_1.jsxs)(react_1.Button, { _hover: { bg: 'var(--primary)' }, _active: { bg: 'var(--primary)' }, _focus: { bg: 'var(--primary)' }, bg: "none", onClick: onSendClick, isLoading: toolbarState.sending, isDisabled: toolbarState.sendDisabled || !toolbarState.allowTextInput, variant: "unstyled", className: "rounded-lg flex space-x-[6px] items-center bg-primary text-white px-3 h-8 data-[loading]:hover:bg-primary disabled:hover:bg-primary shrink-0", children: [(0, jsx_runtime_1.jsx)(PaperAirplaneIcon_1.default, { className: "w-[18px] h-[18px]" }), (toolbarState.msgLen !== 0 || toolbarState.uploadFilesLen !== 0) && isVisitor === user_1.VisitorEnum.NO && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_1.Divider, { orientation: "vertical", className: "h-3 border-l-[0.5px] border-[#FFFFFF33]" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-[2px] items-center", children: [(0, jsx_runtime_1.jsx)(image_1.default, { alt: "energy icon", src: "/icons/thunder.svg", width: 13.59, height: 13.59 }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium", children: toolbarState.neededEnergy })] })] }))] })] })), !isMobile && toolbarState.showAudioButton && !toolbarState.disabled && ((0, jsx_runtime_1.jsxs)("div", { id: "web3-chat-triger-input", className: "flex flex-row items-center gap-3", children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", color: "brand", size: "md", icon: MicrophoneIcon_1.default, className: "data-[state=open]:bg-surface-hovered", onClick: toolbarState.toggleVoice }), toolbarState.isUseVoiceCall && !toolbarState.disabled && (0, jsx_runtime_1.jsx)(VoiceConnectEntry, { botInfo: botInfo })] }))] })] }));
}
exports.default = Toolbar;
