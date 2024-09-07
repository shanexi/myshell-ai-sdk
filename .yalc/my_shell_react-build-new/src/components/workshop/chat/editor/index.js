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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const PaperClipIcon_1 = __importDefault(require("@heroicons/react/24/outline/PaperClipIcon"));
const PlusCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/PlusCircleIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const context_1 = __importDefault(require("../../../../chat/layouts/context.js"));
const useDropFiles_1 = require("../../../../chat/views/editor/useDropFiles.js");
const CustomTooltip_1 = __importDefault(require("../../../../common/components/CustomTooltip.js"));
const user_1 = require("../../../../common/constants/enums/user.js");
const workshop_1 = require("../../../../common/constants/enums/workshop.js");
const useDetectKeyboardOpen_1 = require("../../../../common/hooks/useDetectKeyboardOpen.js");
const useDevice_1 = require("../../../../common/hooks/useDevice.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const useWidgetTextInput_1 = __importDefault(require("../../../../hooks/workshop/chat/useWidgetTextInput.js"));
const store_1 = require("../../../../services/store/index.js");
const WidgetMobileActions_1 = __importDefault(require("../WidgetMobileActions.js"));
const WidgetToolbar_1 = __importDefault(require("../WidgetToolbar.js"));
const WidgetVoiceInputUI_1 = __importDefault(require("../WidgetVoiceInputUI.js"));
const WidgetDeleteBtn = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../components/workshop/chat/WidgetDeleteBtn.js'))), {
    ssr: false
});
const MaxHeight = 300;
function WidgetEditorInput({ widgetInfo, onSend, isMobile, toggleImagePanelOpen, showInput, setShowInput, allowTextInput = true, allowAudioInput = true, textInputRef, isFullScreen, setFullScreen }) {
    const { scrollLayoutToTop } = (0, react_2.useContext)(context_1.default);
    const widgetId = (0, react_2.useMemo)(() => {
        return widgetInfo?.id ?? '';
    }, [widgetInfo]);
    const { warning } = (0, useNotification_1.useNotification)();
    const uploading = (0, store_1.useWorkshopStore)(state => state.fileUpload.uploading);
    const showDragModal = (0, store_1.useWorkshopStore)(state => state.fileUpload.dragModal);
    const imPanelChatConfig = widgetInfo?.imPanelChatConfig ?? {};
    const widgetUploadFiles = (0, store_1.useWorkshopStore)(state => state.widgetUploadFiles);
    const widgetUploadedFiles = (0, store_1.useWorkshopStore)(state => state.fileUpload.filesMap[widgetId] || []);
    const widgetInputType = (0, store_1.useWorkshopStore)(state => state.widgetInputType);
    const setLastInputMethod = (0, store_1.useChatStore)(state => state.setLastInputMethod);
    const visitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const userSelectVoiceRef = (0, react_2.useRef)(false);
    const chatLocal = (0, next_intl_1.useTranslations)('chat');
    const isChoosingFile = (0, react_2.useRef)(false);
    const visualHeightRef = (0, react_2.useRef)(300);
    const isFocusRef = (0, react_2.useRef)(false);
    const { isIos } = (0, useDevice_1.useDevice)();
    const { textMessage, handleCompositionStart, handleCompositionEnd, handleKeyDown, handleFocus, tokenLen, setTextMessage, sending, handleSend, disabled, setInputType, placeholder, neededEnergy, hasEnoughEnergy } = (0, useWidgetTextInput_1.default)({
        textInputRef,
        onSend,
        widgetInfo,
        scrollLayoutToTop
    });
    const isVisitor = visitor === user_1.VisitorEnum.YES;
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const [showExpand, setShowExpand] = (0, react_2.useState)(false);
    const [inputExpand, setInputExand] = (0, react_2.useState)(false);
    const draggingStateRef = (0, react_2.useRef)({
        dragging: false,
        startY: 0,
        initialHeight: 0,
        lastY: 0,
        lastTimestamp: 0,
        velocity: 0,
        offset: 0,
        scrolling: false
    });
    const panelRef = (0, react_2.useRef)(null);
    const [height, setHeight] = (0, react_2.useState)(105);
    const handleInputClick = () => {
        scrollLayoutToTop?.();
        if (!disabled && allowTextInput) {
            setShowInput(true);
        }
    };
    const toggleInputExpand = (e) => {
        e.preventDefault();
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
        setInputExand(prev => !prev);
    };
    (0, react_2.useEffect)(() => {
        if (!inputExpand && textInputRef.current) {
            textInputRef.current.style.height = isMobile ? '40px' : '36px';
            textInputRef.current.style.height = `${textInputRef.current.scrollHeight}px`;
        }
        else if (inputExpand && textInputRef.current) {
            textInputRef.current.style.height = `100%`;
        }
    }, [textMessage, textInputRef.current, inputExpand]);
    (0, react_2.useEffect)(() => {
        if (isMobile) {
            return;
        }
        if (textInputRef.current) {
            if (textInputRef.current.scrollHeight > 40 && !showExpand) {
                setShowExpand(true);
            }
            if (textInputRef.current.scrollHeight <= 40 && showExpand) {
                setShowExpand(false);
            }
        }
    }, [textMessage.length, showExpand]);
    (0, react_2.useEffect)(() => {
        if (!isMobile) {
            textInputRef.current?.setSelectionRange(textMessage.length, textMessage.length);
            textInputRef.current?.scrollTo(0, textInputRef.current.scrollHeight);
        }
    }, []);
    const keyboardCallabck = (0, react_2.useCallback)((isOpen, screenHeight, visualHeight) => {
        if (!isOpen && !isChoosingFile.current) {
            setShowInput(false);
            setInputExand(false);
        }
        if (isOpen && visualHeightRef.current !== visualHeight) {
            visualHeightRef.current = visualHeight;
        }
    }, [textInputRef?.current]);
    const isKeyboard = (0, useDetectKeyboardOpen_1.useDetectKeyboardOpen)({ callback: keyboardCallabck });
    (0, react_2.useEffect)(() => {
        if (isKeyboard) {
            textInputRef.current?.setSelectionRange(textMessage.length, textMessage.length);
            textInputRef.current?.scrollTo(0, textInputRef.current.scrollHeight);
            const preventBodyScroll = (event) => {
                event.preventDefault();
            };
            document.body.addEventListener('touchmove', preventBodyScroll, { passive: false });
            return () => {
                document.body.removeEventListener('touchmove', preventBodyScroll);
            };
        }
    }, [isKeyboard]);
    const handleMobileTouchStart = (e) => {
        if (panelRef.current) {
            draggingStateRef.current.startY = e.touches[0].clientY;
            draggingStateRef.current.dragging = true;
            draggingStateRef.current.lastTimestamp = e.timeStamp;
            draggingStateRef.current.initialHeight = panelRef.current.clientHeight;
        }
    };
    const handleMobileTouchMove = (e) => {
        if (draggingStateRef.current.dragging) {
            draggingStateRef.current.scrolling = true;
            const deltaY = draggingStateRef.current.startY - e.touches[0].clientY;
            let newHeight = draggingStateRef.current.initialHeight + deltaY;
            if (newHeight > MaxHeight) {
                newHeight = MaxHeight;
            }
            panelRef.current.style.height = `${newHeight}px`;
        }
    };
    const handleMobileTouchEnd = (e) => {
        if (!draggingStateRef.current.scrolling) {
            return;
        }
        draggingStateRef.current.scrolling = false;
        draggingStateRef.current.dragging = false;
        const eTouch = e.changedTouches[0];
        const time = e.timeStamp - draggingStateRef.current.lastTimestamp;
        const offset = eTouch.clientY - draggingStateRef.current.startY;
        const direction = offset > 0 ? 'down' : 'up';
        const v = (Math.abs(offset) / time) * 1000;
        let inputExpand = false;
        if (v > 200) {
            inputExpand = direction !== 'down';
            panelRef.current.style.height = !inputExpand ? 'auto' : `${visualHeightRef.current}px`;
        }
        else {
            const newHeight = draggingStateRef.current.initialHeight - offset;
            if (direction === 'down' && offset > 10) {
                panelRef.current.style.height = `auto`;
            }
            else if (direction === 'up' && newHeight < visualHeightRef.current) {
                panelRef.current.style.height = `${visualHeightRef.current}px`;
                inputExpand = true;
            }
            else {
                inputExpand = direction !== 'down';
                panelRef.current.style.height = !inputExpand ? 'auto' : `${visualHeightRef.current}px`;
            }
        }
        setInputExand(inputExpand);
    };
    const isPanelImageBot = widgetInfo?.chatPanelType === workshop_1.ChatPanelTypeEnum.BOT_CHAT_PANEL_TYPE_COMPONENT;
    const rangeToEnd = () => {
        textInputRef.current?.setSelectionRange(textMessage.length, textMessage.length);
    };
    const getRequestData = () => {
        if (Array.isArray(widgetUploadedFiles) && widgetUploadedFiles.length > 0) {
            const embedObjs = widgetUploadedFiles.map(file => {
                return {
                    url: file.url,
                    type: file.uiData.serverType,
                    title: file.uiData.name,
                    mediaFileMetadata: file.meta
                };
            });
            const localObjs = widgetUploadedFiles.map(file => {
                return {
                    url: file.url,
                    extensionName: file.uiData.ex.toUpperCase(),
                    title: file.uiData.name,
                    type: file.uiData.serverType,
                    status: 'EMBED_OBJ_STATUS_DONE',
                    iconUrl: file.uiData.iconUrl,
                    mediaFileMetadata: file.meta
                };
            });
            return {
                embedObjs,
                localObjs
            };
        }
    };
    const onSendClick = () => {
        scrollLayoutToTop?.();
        if (toolbarState.notReachMiniumFilesTip) {
            warning({ content: toolbarState.notReachMiniumFilesTip });
            return;
        }
        const requestData = getRequestData();
        handleSend({
            requestData
        });
    };
    const onInputKeyDown = (e) => {
        const getMsg = () => {
            return {
                requestData: getRequestData()
            };
        };
        handleKeyDown(e, getMsg, toolbarState);
    };
    const toggleVoice = (0, react_2.useCallback)(() => {
        scrollLayoutToTop?.();
        if (isMobile) {
            userSelectVoiceRef.current = true;
        }
        setInputType('audio');
    }, [setInputType]);
    const handleBlur = (e) => {
        e.preventDefault();
        isFocusRef.current = false;
        if (isIos) {
            isChoosingFile.current = false;
        }
    };
    const onFileDialogCancel = () => {
    };
    const toolbarState = (0, react_2.useMemo)(() => {
        const hasFailedFiles = widgetUploadedFiles.some(file => file.status !== 'completed');
        const notReachMiniumFiles = widgetUploadedFiles.length < ((imPanelChatConfig && imPanelChatConfig?.embedNumberMinimum) || 0);
        const maxChatToken = 300;
        return {
            uploadButtonDisabled: imPanelChatConfig?.embedNumberLimit <= 0,
            allowTextInput,
            showAudioButton: textMessage.length === 0 && widgetUploadedFiles.length === 0 && allowAudioInput,
            showSendButton: textMessage.length !== 0 || widgetUploadedFiles.length > 0,
            notReachMiniumFilesTip: notReachMiniumFiles
                ? chatLocal('panel.minfiles', {
                    number: imPanelChatConfig?.embedNumberMinimum
                })
                : '',
            sendDisabled: (textMessage.length === 0 && widgetUploadedFiles.length === 0) ||
                sending ||
                tokenLen > maxChatToken ||
                !hasEnoughEnergy ||
                hasFailedFiles,
            sending,
            isUseVoiceCall: false,
            toggleVoice,
            neededEnergy,
            msgLen: textMessage.length,
            uploadFilesLen: widgetUploadedFiles.length,
            disabled,
            tokenLen,
            maxChatToken,
            isText: widgetInputType === 'text'
        };
    }, [
        hasEnoughEnergy,
        tokenLen,
        sending,
        textMessage.length,
        neededEnergy,
        setInputType,
        imPanelChatConfig,
        widgetUploadedFiles,
        disabled,
        toggleVoice,
        widgetInputType,
        allowAudioInput,
        allowTextInput
    ]);
    const uploadProgress = uploading?.progress || 0;
    const isAudio = widgetInputType === 'audio';
    const isText = widgetInputType === 'text';
    const cl = 'bg-surface-default border-0 border-t border-default';
    (0, react_2.useEffect)(() => {
        if (!allowAudioInput) {
            isAudio && setInputType('text');
        }
        else if (!allowTextInput) {
            isText && !isMobile && setInputType('audio');
        }
    }, [allowAudioInput, allowTextInput, isAudio, isMobile, isText, setInputType]);
    const openPanle = () => {
        scrollLayoutToTop?.();
        toggleImagePanelOpen({ visible: true });
    };
    const handlePaste = async (e) => {
        setLastInputMethod('CopyPaste');
        if (toolbarState.uploadButtonDisabled) {
            return;
        }
        const { clipboardData } = e;
        const { items } = clipboardData;
        const files = [];
        for (const item of items) {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                files.push(file);
            }
        }
        const res = await (0, useDropFiles_1.processWidgetUploadFiles)(widgetId, files);
        widgetUploadFiles(widgetId, res);
    };
    const onFileChange = (0, react_2.useCallback)(async (files) => {
        scrollLayoutToTop?.();
        const res = await (0, useDropFiles_1.processWidgetUploadFiles)(widgetId, files);
        widgetUploadFiles(widgetId, res);
    }, [isMobile]);
    const startDisabled = sending;
    const renderImagePanelInput = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex flex-col', isMobile ? 'py-3 px-4' : '', startDisabled ? 'opacity-50' : ''), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)(isMobile ? '' : ''), children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-full text-center cursor-pointer', isMobile ? 'border border-default rounded-xl  py-2.5 mb-0 mx-auto' : 'border-t border-default p-4'), onClick: () => {
                            if (isVisitor) {
                                toggleLoginModal(true);
                            }
                            else {
                                !startDisabled && openPanle();
                            }
                        }, children: (0, jsx_runtime_1.jsx)("span", { className: "text-primary font-medium", children: chatLocal('panel.start') }) }) }), isMobile && ((0, jsx_runtime_1.jsx)(WidgetMobileActions_1.default, { toolbarState: toolbarState, widgetInfo: widgetInfo, isPanelImageBot: true, toggleVoice: toggleVoice }))] }));
    };
    if (isPanelImageBot && !['delete'].includes(widgetInputType)) {
        return renderImagePanelInput();
    }
    const renderMobile = () => {
        const pl = (textMessage || '').trim().split('\n')[0].slice(0, 100);
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!showInput && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('p-4 z-[100]'), children: [!isAudio && ((0, jsx_runtime_1.jsx)(CustomTooltip_1.default, { customClassNames: "bg-[#FFE6BB] text-[#7E5700] rounded-lg py-2 px-3 whitespace-nowrap max-w-fit", content: chatLocal('widget_current_feature_unavailable'), position: "top-start", isDisabled: allowTextInput, offset: [12, 4], withSpan: false, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('border border-default rounded-xl h-10 px-2 flex justify-between items-center text-on-surface shadow-[0_1px_2px_0_var(--shadow-background-default)]', !allowTextInput && 'opacity-30 cursor-not-allowed'), onClick: handleInputClick, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-subtlest line-clamp-1 break-all flex-1", children: pl.length > 0 ? `${pl}` : placeholder }), toolbarState.uploadFilesLen > 0 ? ((0, jsx_runtime_1.jsx)(PaperClipIcon_1.default, { className: "w-6 h-6 text-primary flex-shrink-0" })) : ((0, jsx_runtime_1.jsx)(PlusCircleIcon_1.default, { className: (0, clsx_1.default)('w-6 h-6 text-primary', { 'opacity-30': toolbarState.uploadButtonDisabled }) }))] }) }, isChoosingFile.current ? 0 : 1)), isAudio && ((0, jsx_runtime_1.jsx)(WidgetVoiceInputUI_1.default, { onSend: onSend, widgetInfo: widgetInfo, userSelectVoiceRef: userSelectVoiceRef, isMobile: true }, widgetId)), isText && ((0, jsx_runtime_1.jsx)(WidgetMobileActions_1.default, { toolbarState: toolbarState, widgetInfo: widgetInfo, isPanelImageBot: false, toggleVoice: toggleVoice }))] })), showInput && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full absolute shrink-0 bottom-0 p-4 border-t bg-surface-default transition-all flex flex-col z-[100] border-default', { 'border-none rounded-t-xl shadow-modal_shadow': inputExpand }), style: { height: inputExpand ? '100%' : 'auto' }, ref: panelRef, children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full absolute top-[6px] left-0 flex justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: "w-[44px] h-1 bg-[#C9C4D0] rounded-sm", onClick: e => toggleInputExpand(e), onTouchStart: handleMobileTouchStart, onTouchMove: handleMobileTouchMove, onTouchEnd: handleMobileTouchEnd }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(react_1.Textarea, { ref: textInputRef, className: (0, clsx_1.default)('w-full h-full px-2 py-2 text-sm bg-surface-default border-none text-on-surface placeholder:text-subtlest', inputExpand ? 'flex-1' : 'max-h-[144px]'), autoFocus: true, border: "none", focusBorderColor: "transparent", placeholder: placeholder, value: textMessage, resize: "none", overflowY: "auto", height: "36px", minHeight: "36px", onCompositionStart: handleCompositionStart, onCompositionEnd: handleCompositionEnd, onChange: e => setTextMessage(e.target.value), onFocus: () => {
                                    scrollLayoutToTop?.();
                                    handleFocus();
                                }, onBlur: handleBlur, onPaste: handlePaste, onKeyDown: onInputKeyDown, isDisabled: disabled, id: "mobileInput" }, isChoosingFile.current ? 0 : 1) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(WidgetToolbar_1.default, { widgetId: widgetId, widgetInfo: widgetInfo, imPanelChatConfig: imPanelChatConfig, onSendClick: onSendClick, toolbarState: toolbarState, isMobile: isMobile, isChoosingFile: isChoosingFile, onFileChange: onFileChange, onFileDialogCancel: onFileDialogCancel }) })] }))] }));
    };
    const renderPC = () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isFullScreen && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 bottom-0 right-0 left-0 bg-[#00000099] z-[99]" })), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full z-40 relative px-4 md:px-6', isFullScreen && 'h-full z-[100] flex flex-col', {
                        'py-4': isText,
                        'pt-2 pb-4': isAudio
                    }, cl), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative editor-wrapper flex flex-col', {
                                'flex-1 flex flex-col': isFullScreen
                            }), children: [isText && ((0, jsx_runtime_1.jsx)(CustomTooltip_1.default, { customClassNames: "bg-[#FFE6BB] text-[#7E5700] rounded-lg py-2 px-3 whitespace-nowrap max-w-fit", content: chatLocal('widget_current_feature_unavailable'), position: "top-start", isDisabled: allowTextInput, offset: [8, 8], withSpan: false, children: (0, jsx_runtime_1.jsx)(react_1.Textarea, { ref: textInputRef, className: (0, clsx_1.default)('w-full px-2 py-2 text-sm bg-surface-default border-none text-on-surface placeholder:text-subtlest', isFullScreen ? 'flex-1' : 'max-h-[156px]'), autoFocus: true, border: "none", focusBorderColor: "transparent", placeholder: placeholder, value: textMessage, resize: "none", overflowY: "auto", height: "36px", minHeight: "36px", onCompositionStart: handleCompositionStart, onCompositionEnd: handleCompositionEnd, onChange: e => setTextMessage(e.target.value), onFocus: () => {
                                            scrollLayoutToTop?.();
                                            handleFocus();
                                        }, onPaste: handlePaste, onKeyDown: onInputKeyDown, isDisabled: disabled }) })), isAudio && ((0, jsx_runtime_1.jsx)(WidgetVoiceInputUI_1.default, { onSend: onSend, widgetInfo: widgetInfo, userSelectVoiceRef: userSelectVoiceRef, allowTextInput: allowTextInput }, widgetId))] }), isText && ((0, jsx_runtime_1.jsx)(WidgetToolbar_1.default, { widgetId: widgetId, widgetInfo: widgetInfo, imPanelChatConfig: imPanelChatConfig, onSendClick: onSendClick, toolbarState: toolbarState, onFileChange: onFileChange, onFileDialogCancel: onFileDialogCancel }))] })] }));
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!isMobile && (isText || isAudio) && renderPC(), isMobile && (isText || isAudio) && renderMobile(), uploading && ((0, jsx_runtime_1.jsx)("div", { className: "z-10 absolute top-10 left-1/2 -translate-x-1/2 ", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative bg-[#2B48D8] rounded-full w-[342px] overflow-hidden h-9", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute z-[1] left-0 top-0 h-9  bg-stripped-loading bg-[length:50px_50px] animate-move", style: { width: `${uploadProgress}%` } }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute w-full z-10 h-9 text-center text-white flex flex-row justify-center items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-1 break-all max-w-[60%]", children: uploading?.file?.name ?? '' }), (0, jsx_runtime_1.jsxs)("span", { className: "absolute right-4", children: [uploadProgress, " %"] })] })] }) })), showDragModal && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 bottom-0 left-0 right-0 z-10 bg-[#FFFFFFBF] dark:bg-[#17181CBF] flex justify-center items-center", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("img", { src: "/images/drop-file.png", className: "w-[245px] h-[116px]" }), (0, jsx_runtime_1.jsx)("p", { className: "text-secondary text-center", children: chatLocal('panel.drop') })] }) })), ['delete'].includes(widgetInputType) && ((0, jsx_runtime_1.jsx)("div", { className: "w-full z-10 border-t border-default", children: widgetInputType === 'delete' && (0, jsx_runtime_1.jsx)(WidgetDeleteBtn, {}) }))] }));
}
exports.default = WidgetEditorInput;
