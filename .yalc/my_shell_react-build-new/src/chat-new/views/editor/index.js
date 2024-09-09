"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Editor;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_use_1 = require("react-use");
const MessageContext_1 = require("../../../chat-new/context/MessageContext.js");
const StaticContext_1 = require("../../../chat-new/context/StaticContext.js");
const useNewChatStore_1 = require("../../../chat-new/services/useNewChatStore.js");
const Termination_1 = __importDefault(require("./Termination.js"));
const audio_recorder_1 = require("./components/audio-recorder/index.js");
const audio_input_1 = require("./components/audio-recorder/audio-input.js");
const file_list_1 = __importDefault(require("./components/file-list/index.js"));
const file_uploader_1 = require("./components/file-uploader.js");
const menu_list_1 = __importDefault(require("./components/function-menu/menu-list.js"));
const send_button_1 = require("./components/send-button.js");
const text_input_1 = require("./components/text-input.js");
const MobileTextInput_1 = require("./components/text-input/MobileTextInput.js");
function Editor({ editorContainerRef, textareaRef, scrollLayoutToTop, showMobileDetail, otherModeSlot }) {
    const { interactionDisabled, disabledReason, entityInfo, showInteractionCostEnergy } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { sendTextMessage, sendAudioMessage, sending, interacting, draftMessage, setDraftMessage, terminate } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    const { energyPerChat } = entityInfo;
    const isDesktop = (0, react_use_1.useMedia)('(min-width: 768px)');
    const [type, setType] = (0, react_1.useState)('TEXT');
    const switchToAudioInput = () => {
        setType('AUDIO');
        scrollLayoutToTop?.();
    };
    const exitAudioInput = () => {
        setType('TEXT');
    };
    const [text, setText] = (0, react_1.useState)(draftMessage?.text ?? '');
    const sendTextHandler = (0, react_1.useCallback)(() => {
        scrollLayoutToTop?.();
        sendTextMessage(text);
        setText('');
    }, [scrollLayoutToTop, sendTextMessage, text]);
    (0, react_1.useEffect)(() => {
        setDraftMessage({ ...draftMessage, text });
    }, [text]);
    const showDragModal = (0, useNewChatStore_1.useNewChatStore)(state => state.fileUpload.dragModal);
    const uploading = (0, useNewChatStore_1.useNewChatStore)(state => state.fileUpload.uploading);
    const uploadProgress = uploading?.progress || 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: editorContainerRef, className: "px-0 md:px-6 py-3 md:py-4 flex flex-col gap-2 md:gap-1 w-full h-fit shrink-0 top-0 left-0 z-10 bg-surface-default md:rounded-b-3xl", children: [uploading && ((0, jsx_runtime_1.jsx)("div", { className: "z-10 absolute top-10 left-1/2 -translate-x-1/2 ", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative bg-[#2B48D8] rounded-full w-[342px] overflow-hidden h-9", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute z-[1] left-0 top-0 h-9  bg-stripped-loading bg-[length:50px_50px] animate-move", style: { width: `${uploadProgress}%` } }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute w-full z-10 h-9 text-center text-white flex flex-row justify-center items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-1 break-all max-w-[60%]", children: uploading?.file?.name ?? '' }), (0, jsx_runtime_1.jsxs)("span", { className: "absolute right-4", children: [uploadProgress, " %"] })] })] }) })), showDragModal && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 bottom-0 left-0 right-0 z-10 bg-[#FFFFFFBF] dark:bg-[#17181CBF] flex justify-center items-center", children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("img", { src: "/images/drop-file.png", className: "w-[245px] h-[116px]" }) }) })), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [interacting && ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center absolute -top-12 md:-top-[78px] left-1/2 -translate-x-1/2 z-20", children: (0, jsx_runtime_1.jsx)(Termination_1.default, { onTerminate: () => terminate?.() }) })), type === 'TEXT' &&
                        (isDesktop ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(text_input_1.TextInput, { className: "w-full min-h-9 max-h-[156px]", onSend: sendTextHandler, autoFocus: true, value: text, ref: textareaRef, onChange: e => setText(e.target.value), disabled: interactionDisabled, disabledReason: disabledReason, onFocus: () => {
                                        scrollLayoutToTop?.();
                                    } }), (0, jsx_runtime_1.jsx)(file_list_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "w-full flex items-center justify-between", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1", children: [(0, jsx_runtime_1.jsx)(menu_list_1.default, {}), (0, jsx_runtime_1.jsx)(file_uploader_1.FileUploader, { disabled: interactionDisabled })] }), text ? ((0, jsx_runtime_1.jsx)(send_button_1.SendButton, { loading: sending, disabled: interactionDisabled, onSend: sendTextHandler, energyPerChat: energyPerChat, showEnergyCostIcon: showInteractionCostEnergy })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(audio_input_1.AudioInput, { onStart: switchToAudioInput, disabled: interactionDisabled }), otherModeSlot] }))] }) })] })) : ((0, jsx_runtime_1.jsx)(MobileTextInput_1.MobileTextInput, { onSend: sendTextHandler, value: text, ref: textareaRef, onChange: e => setText(e.target.value), disabled: interactionDisabled, disabledReason: disabledReason, showMobileDetail: showMobileDetail, audioInputSlot: (0, jsx_runtime_1.jsx)(audio_input_1.AudioInput, { onStart: switchToAudioInput, disabled: interactionDisabled }), loading: sending, interactingDisabled: interactionDisabled, energyPerChat: energyPerChat, showEnergyCostIcon: showInteractionCostEnergy }))), type === 'AUDIO' && ((0, jsx_runtime_1.jsx)(audio_recorder_1.AudioRecorder, { exitAudioInput: exitAudioInput, onSend: sendAudioMessage, interacting: sending, disabled: interactionDisabled, scrollLayoutToTop: scrollLayoutToTop, onChangeType: value => setType(value) }))] })] }));
}
