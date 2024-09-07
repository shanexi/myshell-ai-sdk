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
const context_1 = __importDefault(require("../../../chat/layouts/context.js"));
const useTextInput_1 = __importDefault(require("../../../chat/views/chat-input/text-input/useTextInput.js"));
const VoiceInputUI_1 = __importDefault(require("../../../chat/views/chat-input/voice-input/VoiceInputUI.js"));
const CustomTooltip_1 = __importDefault(require("../../../common/components/CustomTooltip.js"));
const useDetectKeyboardOpen_1 = require("../../../common/hooks/useDetectKeyboardOpen.js");
const useDevice_1 = require("../../../common/hooks/useDevice.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const identityService_1 = require("../../../common/services/identityService.js");
const sensors_1 = require("../../../lib/sensors/index.js");
const store_1 = require("../../../services/store/index.js");
const mobile_actions_1 = __importDefault(require("./mobile-actions.js"));
const useDropFiles_1 = require("./useDropFiles.js");
const Toolbar = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./Toolbar.js'))), {
    ssr: false
});
const ChatDelete = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../chat/views/chat-delete/ChatDelete.js'))), {
    ssr: false
});
const ChatPublish = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../chat/views/gallery/ChatPublish.js'))), {
    ssr: false
});
const ChatShare = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../chat/views/chat-share/ChatShare.js'))), {
    ssr: false
});
const MaxHeight = 300;
function EditorInput({ onSend, selectedBot, selectedBotId, isMobile, toggleImagePanelOpen, isWorkshop = false, showInput, setShowInput, allowTextInput = true, allowAudioInput = true, allowUploadFile = true, textInputRef, uploadSettings, isFullScreen, setFullScreen }) {
    const { scrollLayoutToTop } = (0, react_2.useContext)(context_1.default);
    const botName = selectedBot?.name;
    const uploading = (0, store_1.useChatStore)(state => state.fileUpload.uploading);
    const showDragModal = (0, store_1.useChatStore)(state => state.fileUpload.dragModal);
    const { imPanelChatConfig } = selectedBot ?? {};
    const uploadFiles = (0, store_1.useChatStore)(state => state.uploadFiles);
    const uploadedFiles = (0, store_1.useChatStore)(state => state.fileUpload.filesMap[selectedBotId] || []);
    const inputType = (0, store_1.useChatStore)(state => state.inputType);
    const setLastInputMethod = (0, store_1.useChatStore)(state => state.setLastInputMethod);
    const userSelectVoiceRef = (0, react_2.useRef)(false);
    const chatLocal = (0, next_intl_1.useTranslations)('chat');
    const isChoosingFile = (0, react_2.useRef)(false);
    const visualHeightRef = (0, react_2.useRef)(300);
    const isFocusRef = (0, react_2.useRef)(false);
    const { isIos } = (0, useDevice_1.useDevice)();
    const { error, warning } = (0, useNotification_1.useNotification)();
    const token = identityService_1.identityService.getToken();
    const { textMessage, handleCompositionStart, handleCompositionEnd, handleKeyDown, handleFocus, tokenLen, setTextMessage, sending, handleSend, disabled, setInputType, placeholder, neededEnergy, hasEnoughEnergy } = (0, useTextInput_1.default)({
        onSend,
        selectedBot,
        textInputRef,
        workshopChat: isWorkshop,
        scrollLayoutToTop
    });
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
            visualHeightRef.current = visualHeight - 10;
        }
    }, [textInputRef.current]);
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
    const isPanelImageBot = selectedBot?.isPanelImageBot;
    const rangeToEnd = () => {
        textInputRef.current?.setSelectionRange(textMessage.length, textMessage.length);
    };
    const getRequestData = () => {
        if (Array.isArray(uploadedFiles) && uploadedFiles.length > 0) {
            const embedObjs = uploadedFiles.map(file => {
                return {
                    url: file.url,
                    type: file.uiData.serverType,
                    title: file.uiData.name,
                    mediaFileMetadata: file.meta
                };
            });
            const localObjs = uploadedFiles.map(file => {
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
    const getMsg = () => {
        return {
            requestData: getRequestData()
        };
    };
    const onSendClick = async () => {
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
    const onInputKeyDown = async (e) => {
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
        const hasFailedFiles = uploadedFiles.some(file => file.status !== 'completed');
        const notReachMiniumFiles = uploadedFiles.length < ((imPanelChatConfig && imPanelChatConfig?.embedNumberMinimum) || 0);
        const maxChatToken = selectedBot?.llmModel?.model?.maxChatToken ?? 1500;
        return {
            uploadButtonDisabled: !allowUploadFile && (imPanelChatConfig?.embedNumberLimit ?? 0) <= 0,
            allowTextInput,
            showAudioButton: selectedBot?.botSetting?.inputVoice &&
                textMessage.length === 0 &&
                uploadedFiles.length === 0 &&
                allowAudioInput,
            showSendButton: allowUploadFile &&
                ((selectedBot?.botSetting?.inputVoice && textMessage.length !== 0) ||
                    !selectedBot?.botSetting?.inputVoice ||
                    uploadedFiles.length > 0),
            notReachMiniumFilesTip: notReachMiniumFiles
                ? chatLocal('panel.minfiles', {
                    number: imPanelChatConfig?.embedNumberMinimum
                })
                : '',
            sendDisabled: (textMessage.length === 0 && uploadedFiles.length === 0) ||
                sending ||
                tokenLen > maxChatToken ||
                !hasEnoughEnergy ||
                hasFailedFiles,
            sending,
            isUseVoiceCall: selectedBot?.voiceCall?.isVoiceCall || selectedBot?.voiceCall?.isVideoCall,
            toggleVoice,
            neededEnergy,
            msgLen: textMessage.length,
            uploadFilesLen: uploadedFiles.length,
            disabled,
            tokenLen,
            maxChatToken,
            uploadSettings,
            isText: inputType === 'text'
        };
    }, [
        selectedBot?.botSetting,
        selectedBot?.llmModel,
        selectedBot?.voiceCall,
        hasEnoughEnergy,
        tokenLen,
        sending,
        textMessage.length,
        neededEnergy,
        setInputType,
        imPanelChatConfig,
        uploadedFiles,
        disabled,
        toggleVoice,
        inputType,
        allowAudioInput,
        allowTextInput,
        allowUploadFile,
        uploadSettings,
        chatLocal
    ]);
    const uploadProgress = uploading?.progress || 0;
    const isAudio = inputType === 'audio';
    const isText = inputType === 'text';
    const cl = `bg-surface-default border-0 border-t border-default`;
    const sensors = (0, sensors_1.useSensors)();
    const openPanle = () => {
        scrollLayoutToTop?.();
        toggleImagePanelOpen({ visible: true });
        sensors?.track('StartInteraction', {
            bot_id: selectedBot?.id,
            bot_name: selectedBot?.name
        });
    };
    (0, react_2.useEffect)(() => {
        if (!allowAudioInput) {
            isAudio && setInputType('text');
        }
        else if (!allowTextInput) {
            isText && !isMobile && setInputType('audio');
        }
    }, [allowAudioInput, allowTextInput, isAudio, isMobile, isText, setInputType]);
    const handlePaste = async (e) => {
        setLastInputMethod('CopyPaste');
        if (!toolbarState) {
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
        const res = await (0, useDropFiles_1.processUploadFiles)(selectedBotId, files);
        uploadFiles(selectedBotId, res);
    };
    const onFileChange = (0, react_2.useCallback)(async (files) => {
        scrollLayoutToTop?.();
        const res = await (0, useDropFiles_1.processUploadFiles)(selectedBotId, files);
        uploadFiles(selectedBotId, res);
    }, [isMobile]);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const startDisabled = (isVisitor == 1 && selectedBot?.visitorCanChat == false) || sending;
    const renderImagePanelInput = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex flex-col', isMobile ? 'py-3 px-4' : '', startDisabled ? 'opacity-50' : ''), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)(isMobile ? '' : ''), children: (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-full text-center cursor-pointer', isMobile ? 'border border-default rounded-xl  py-2.5 mb-0 mx-auto' : 'border-t border-default p-4'), onClick: () => {
                            !startDisabled && openPanle();
                        }, children: (0, jsx_runtime_1.jsx)("span", { className: "text-primary font-medium", children: chatLocal('panel.start') }) }) }), isMobile && ((0, jsx_runtime_1.jsx)(mobile_actions_1.default, { toolbarState: toolbarState, isPanelImageBot: true, toggleVoice: toggleVoice, name: selectedBot?.name, logoUrl: selectedBot?.logoUrl, isWorkshop: isWorkshop, botInfo: selectedBot }))] }));
    };
    if (isPanelImageBot && !['share', 'delete'].includes(inputType)) {
        return renderImagePanelInput();
    }
    const renderMobile = () => {
        const pl = (textMessage || '').trim().split('\n')[0].slice(0, 100);
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!showInput && ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 z-[100]", children: [!isAudio && ((0, jsx_runtime_1.jsx)(CustomTooltip_1.default, { customClassNames: "bg-[#FFE6BB] text-[#7E5700] rounded-lg py-2 px-3 whitespace-nowrap max-w-fit", content: chatLocal('current_feature_unavailable'), position: "top-start", isDisabled: allowTextInput, offset: [12, 4], withSpan: false, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('border border-default rounded-xl h-10 px-2 flex justify-between items-center text-on-surface shadow-[0_1px_2px_0_var(--shadow-background-default)]', !allowTextInput && 'opacity-30 cursor-not-allowed'), onClick: handleInputClick, children: [(0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('text-sm line-clamp-1 break-all flex-1', pl.length > 0 ? 'text-default' : 'text-subtlest'), children: pl.length > 0 ? `${pl}` : placeholder }), toolbarState.uploadFilesLen > 0 ? ((0, jsx_runtime_1.jsx)(PaperClipIcon_1.default, { className: "w-6 h-6 text-primary flex-shrink-0" })) : ((0, jsx_runtime_1.jsx)(PlusCircleIcon_1.default, { className: (0, clsx_1.default)('w-6 h-6 text-primary', { 'opacity-30': toolbarState.uploadButtonDisabled }) }))] }) }, isChoosingFile.current ? 0 : 1)), isAudio && ((0, jsx_runtime_1.jsx)(VoiceInputUI_1.default, { onSend: onSend, selectedBot: selectedBot, userSelectVoiceRef: userSelectVoiceRef, isMobile: true, isWorkshop: isWorkshop, allowTextInput: allowTextInput }, selectedBotId)), isText && ((0, jsx_runtime_1.jsx)(mobile_actions_1.default, { toolbarState: toolbarState, isPanelImageBot: false, toggleVoice: toggleVoice, name: selectedBot?.name, logoUrl: selectedBot?.logoUrl, isWorkshop: isWorkshop, botInfo: selectedBot }))] })), showInput && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full absolute bottom-0 left-0 shrink-0 p-4 border-t bg-surface-default transition-all flex flex-col z-[100] border-default', { 'border-none rounded-t-xl shadow-modal-default': inputExpand }), style: {
                        height: inputExpand ? '100%' : 'auto',
                        maxHeight: isKeyboard ? visualHeightRef.current : '100%'
                    }, ref: panelRef, children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full absolute top-[6px] left-0 flex justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: "w-[44px] h-[4px] bg-[#C9C4D0] rounded-sm", onTouchStart: handleMobileTouchStart, onTouchMove: handleMobileTouchMove, onTouchEnd: handleMobileTouchEnd }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(react_1.Textarea, { ref: textInputRef, className: (0, clsx_1.default)('w-full h-full px-2 py-2 text-sm bg-surface-default border-none text-on-surface placeholder:text-subtlest', inputExpand ? 'flex-1' : 'max-h-[144px]'), autoFocus: true, border: "none", focusBorderColor: "transparent", placeholder: placeholder, value: textMessage, resize: "none", overflowY: "auto", height: "40px", minHeight: "40px", onCompositionStart: handleCompositionStart, onCompositionEnd: handleCompositionEnd, onChange: e => setTextMessage(e.target.value), onFocus: () => {
                                    scrollLayoutToTop?.();
                                    handleFocus();
                                }, onBlur: handleBlur, onPaste: handlePaste, onKeyDown: onInputKeyDown, isDisabled: disabled || !allowTextInput, id: "mobileInput" }, isChoosingFile.current ? 0 : 1) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Toolbar, { botId: selectedBotId, botName: botName, botInfo: selectedBot, imPanelChatConfig: imPanelChatConfig, onSendClick: onSendClick, toolbarState: toolbarState, isMobile: isMobile, isChoosingFile: isChoosingFile, onFileChange: onFileChange, onFileDialogCancel: onFileDialogCancel, isWorkshop: isWorkshop }) })] }))] }));
    };
    const renderPC = () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isFullScreen && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 bottom-0 right-0 left-0 bg-[#00000099] z-[99]" })), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full z-40 px-4 md:px-6', isFullScreen ? 'h-full relative z-[100] flex flex-col' : 'relative', {
                        'py-4': isText,
                        'pt-2 pb-4': isAudio
                    }, cl), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative editor-wrapper flex flex-col', {
                                'flex-1 flex flex-col': isFullScreen
                            }), children: [isText && ((0, jsx_runtime_1.jsx)(CustomTooltip_1.default, { customClassNames: "bg-[#FFE6BB] text-[#7E5700] rounded-lg py-2 px-3 whitespace-nowrap max-w-fit", content: chatLocal('current_feature_unavailable'), isDisabled: allowTextInput, position: "top-start", offset: [8, 8], withSpan: false, children: (0, jsx_runtime_1.jsx)(react_1.Textarea, { autoFocus: true, ref: textInputRef, className: (0, clsx_1.default)('w-full px-2 py-2 text-sm bg-surface-default border-none text-on-surface placeholder:text-subtlest', isFullScreen ? 'flex-1' : 'max-h-[156px]'), border: "none", focusBorderColor: "transparent", placeholder: placeholder, value: textMessage, resize: "none", overflowY: "auto", height: "36px", minHeight: "36px", onCompositionStart: handleCompositionStart, onCompositionEnd: handleCompositionEnd, onChange: e => setTextMessage(e.target.value), onFocus: () => {
                                            scrollLayoutToTop?.();
                                            handleFocus();
                                        }, onPaste: handlePaste, onKeyDown: onInputKeyDown, isDisabled: disabled || !allowTextInput }) })), isAudio && ((0, jsx_runtime_1.jsx)(VoiceInputUI_1.default, { onSend: onSend, selectedBot: selectedBot, userSelectVoiceRef: userSelectVoiceRef, isWorkshop: true }, selectedBotId))] }), isText && ((0, jsx_runtime_1.jsx)(Toolbar, { botId: selectedBotId, botName: botName, botInfo: selectedBot, imPanelChatConfig: imPanelChatConfig, onSendClick: onSendClick, toolbarState: toolbarState, onFileChange: onFileChange, onFileDialogCancel: onFileDialogCancel, isWorkshop: isWorkshop }))] })] }));
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!isMobile && (isText || isAudio) && renderPC(), isMobile && (isText || isAudio) && renderMobile(), uploading && ((0, jsx_runtime_1.jsx)("div", { className: "z-10 absolute top-10 left-1/2 -translate-x-1/2 ", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative bg-[#2B48D8] rounded-full w-[342px] overflow-hidden h-9", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute z-[1] left-0 top-0 h-9  bg-stripped-loading bg-[length:50px_50px] animate-move", style: { width: `${uploadProgress}%` } }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute w-full z-10 h-9 text-center text-white flex flex-row justify-center items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-1 break-all max-w-[60%]", children: uploading?.file?.name ?? '' }), (0, jsx_runtime_1.jsxs)("span", { className: "absolute right-4", children: [uploadProgress, " %"] })] })] }) })), showDragModal && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 bottom-0 left-0 right-0 z-10 bg-[#FFFFFFBF] dark:bg-[#17181CBF] flex justify-center items-center", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("img", { src: "/images/drop-file.png", className: "w-[245px] h-[116px]" }), (0, jsx_runtime_1.jsx)("p", { className: "text-secondary text-center", children: chatLocal('panel.drop') })] }) })), ['share', 'delete', 'publish'].includes(inputType) && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full z-10 border-t border-default", children: [inputType === 'share' && (0, jsx_runtime_1.jsx)(ChatShare, { selectedBot: selectedBot }), inputType === 'delete' && (0, jsx_runtime_1.jsx)(ChatDelete, {})] })), (0, jsx_runtime_1.jsx)(ChatPublish, {})] }));
}
exports.default = (0, react_2.memo)(EditorInput);
