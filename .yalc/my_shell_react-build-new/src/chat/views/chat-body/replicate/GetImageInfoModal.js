"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const PhotoIcon_1 = __importDefault(require("@heroicons/react/24/solid/PhotoIcon"));
const XCircleIcon_1 = __importDefault(require("@heroicons/react/24/solid/XCircleIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const react_dropzone_1 = require("react-dropzone");
const common_1 = require("../../../../apis/common.js");
const api_1 = require("../../../../chat/model/api.js");
const useTextMessageSender_1 = __importDefault(require("../../../../chat/views/hooks/useTextMessageSender.js"));
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const store_1 = require("../../../../services/store/index.js");
const AcceptedImageSuffixs = ['png', 'jpeg', 'jpg'];
function UploadFile({ onSuccess, isMobile }) {
    const [loading, setLoading] = (0, react_2.useState)(false);
    const [error, setError] = (0, react_2.useState)(false);
    const { warning, success } = (0, useNotification_1.useNotification)();
    const commonT = (0, next_intl_1.useTranslations)('common');
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const onDrop = (0, react_2.useCallback)(async (files) => {
        const [file] = files;
        const fileSuffix = (0, common_helper_1.getFileExtension)(file.name);
        if (!AcceptedImageSuffixs.some(s => s === fileSuffix)) {
            warning({ content: commonT('unsupported_img_file_type') });
        }
        else {
            setLoading(true);
            try {
                const response = await (0, common_1.uploadFileToS3)(common_1.Scenario.SCENARIO_BOT_PHOTO, fileSuffix, file);
                const image = await (0, api_1.getImageParamsFromImage)(response.objectAccessUrl);
                if (image.success) {
                    onSuccess(image.data.imageGenParam);
                    setError(false);
                    success({ content: chatT('panel.success') });
                }
                else {
                    setError(true);
                }
            }
            catch (error) {
                console.error(error);
                setError(true);
            }
            finally {
                setLoading(false);
            }
        }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = (0, react_dropzone_1.useDropzone)({ onDrop, noClick: true });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "mt-4 ", children: [(0, jsx_runtime_1.jsxs)("div", { className: "border border-dashed border-on-surface rounded-4xl", children: [!loading && ((0, jsx_runtime_1.jsxs)("label", { htmlFor: "file-upload", className: "flex flex-col justify-center items-center h-[265px] p-6 cursor-grab", ...getRootProps(), children: [!error && (0, jsx_runtime_1.jsx)(PhotoIcon_1.default, { className: "w-10 h-10 text-on-surface" }), error && (0, jsx_runtime_1.jsx)(XCircleIcon_1.default, { className: "w-8 h-8 text-[#EC2F0D]" }), (0, jsx_runtime_1.jsxs)("div", { className: "max-w-[484px] flex flex-col justify-center items-center text-on-surface", children: [(0, jsx_runtime_1.jsxs)("h1", { className: "text-[18px] leading-[26px] font-medium", children: [' ', error ? chatT('panel.drag_failed') : chatT(isMobile ? 'panel.upload' : 'panel.drag')] }), !isMobile && (0, jsx_runtime_1.jsx)("p", { className: "text-secondary", children: error ? '' : chatT('panel.drag_desc') }), !error && (0, jsx_runtime_1.jsx)("p", { className: "mt-3 text-[#EC2F0D] text-center", children: chatT('panel.drag_tip') }), error && ((0, jsx_runtime_1.jsx)(react_1.Button, { variant: "outline", className: "rounded-full text-primary font-normal mt-3", children: chatT('panel.re_upload') })), (0, jsx_runtime_1.jsx)("input", { id: "file-upload", name: "file-upload", className: "sr-only", ...getInputProps() })] })] })), loading && !error && ((0, jsx_runtime_1.jsxs)("div", { className: "h-[265px] flex flex-col justify-center items-center text-on-surface", children: [(0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm", className: "text-brand" }), (0, jsx_runtime_1.jsxs)("span", { className: "mt-3", children: [chatT('generating'), "..."] })] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 mb-4 rounded-2xl bg-surface-variant p-5 text-on-surface", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[18px] leading-[26px] font-medium mb-4", children: chatT('panel.drag_tip0') }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm mb-2", children: chatT('panel.drag_tip1') }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm mb-2", children: chatT('panel.drag_tip2') }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: chatT('panel.drag_tip3') })] })] }));
}
function GetImageInfoModal({ imagePanelParams, watch, reset, setModaOpen, isMobile, isOpen, getValues, botInfo }) {
    const imageParams = (0, store_1.useChatStore)(state => state.imageParams);
    const { sendTextMessage } = (0, useTextMessageSender_1.default)(botInfo);
    const sendTextRef = (0, react_2.useRef)(sendTextMessage);
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const isEditedRef = (0, react_2.useRef)(false);
    (0, react_2.useMemo)(() => {
        sendTextRef.current = sendTextMessage;
    }, [sendTextMessage]);
    (0, react_2.useEffect)(() => {
        const subscription = watch((value, { name, type }) => {
            isEditedRef.current = true;
        });
        return () => subscription.unsubscribe();
    }, [watch]);
    const resetForms = (0, react_2.useCallback)((image) => {
        const oldFormData = getValues();
        const modData = { ...oldFormData };
        for (const key in image) {
            if (modData.hasOwnProperty(key)) {
                modData[key] = image[key];
            }
        }
        reset(modData);
    }, [imageParams]);
    (0, react_2.useEffect)(() => {
        if (imagePanelParams?.msgId && imageParams.imageSize) {
            const fetParams = async () => {
                const res = await (0, api_1.getImageParamsFromMsg)(imagePanelParams.msgId);
                if (res.success) {
                    const image = res.data.imageGenParam;
                    resetForms(image);
                    setTimeout(() => {
                        isEditedRef.current = false;
                    }, 50);
                }
            };
            fetParams();
        }
    }, [imagePanelParams?.msgId, imageParams]);
    const onGetImageSuccess = (0, react_2.useCallback)((image) => {
        setModaOpen(false);
        resetForms(image);
    }, [reset, imageParams]);
    const forms = (0, react_2.useMemo)(() => {
        const componentsInput = botInfo?.imComponent.componentsInput;
        return componentsInput;
    }, [botInfo?.id]);
    return ((0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isOpen, isCentered: true, onClose: () => setModaOpen(false), children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-alpha-mask-desktop" }), (0, jsx_runtime_1.jsxs)(react_1.ModalContent, { className: (0, clsx_1.default)('max-w-[768px] rounded-4xl bg-surface text-on-surface', isMobile ? 'border border-default' : ''), children: [(0, jsx_runtime_1.jsxs)(react_1.ModalHeader, { className: "border-b border-default", children: [" ", chatT('panel.get_imginfo_title')] }), (0, jsx_runtime_1.jsx)(react_1.ModalCloseButton, { className: "text-secondary w-6 h-6" }), (0, jsx_runtime_1.jsx)(react_1.ModalBody, { children: (0, jsx_runtime_1.jsx)(UploadFile, { onSuccess: onGetImageSuccess, isMobile: isMobile }) })] })] }));
}
exports.default = GetImageInfoModal;
