"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowSmallUpIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowSmallUpIcon"));
const StopIcon_1 = __importDefault(require("@heroicons/react/24/solid/StopIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/solid/XMarkIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const CountdownTips_1 = __importDefault(require("../../../chat/views/chat-input/voice-input/component/CountdownTips.js"));
const KeyboardIcon_1 = __importDefault(require("../../../common/components/icons/KeyboardIcon.js"));
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const spinner_1 = __importDefault(require("../../../common/components/ui/spinner.js"));
const useRecorder_1 = require("../../../common/hooks/useRecorder.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const useWidgetVoiceInput_1 = __importDefault(require("../../../hooks/workshop/chat/useWidgetVoiceInput.js"));
const WidgetFunctionMenu_1 = __importDefault(require("./WidgetFunctionMenu.js"));
function WidgetVoiceInputUI({ onSend, widgetInfo, userSelectVoiceRef, isMobile, allowTextInput = true }) {
    const { audioPlayer, state, sending, disabled, setWidgetInputType, handleSend, afterPlayEnd, clearRecord, stopRecording, handlePlay, handleStartRecording, placeholder } = (0, useWidgetVoiceInput_1.default)({
        onSend,
        widgetInfo,
        userSelectVoiceRef,
        isMobile
    });
    const t = (0, next_intl_1.useTranslations)('chat');
    const { status, duration } = state;
    const isRecording = status === useRecorder_1.RecordStateEnum.Recording;
    const toggleText = () => {
        setWidgetInputType('text');
    };
    const handleDelete = async () => {
        if (sending) {
            return;
        }
        userSelectVoiceRef.current = false;
        setWidgetInputType('text');
        try {
            await clearRecord();
        }
        catch (error) {
            console.error(error);
        }
    };
    const handleClick = () => {
        if (!isMobile && status === useRecorder_1.RecordStateEnum.Recording) {
            stopRecording();
        }
    };
    const onSendClick = () => {
        if (sending) {
            return;
        }
        handleSend();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "voice-input w-full", children: [!isMobile && status === useRecorder_1.RecordStateEnum.Idle && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex space-x-2 items-center justify-between h-[84px] pt-2", children: [(0, jsx_runtime_1.jsx)(WidgetFunctionMenu_1.default, { widgetInfo: widgetInfo }), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-full px-4 py-2 bg-surface text-center text-primary text-sm leading-6 border border-default rounded-xl hover:bg-surface-container-low cursor-pointer', { 'cursor-not-allowed': disabled }), onClick: () => {
                            handleStartRecording();
                        }, children: placeholder }), allowTextInput && ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", color: "brand", size: "md", "aria-label": "toggle to text input", icon: KeyboardIcon_1.default, className: "data-[state=open]:bg-surface-hovered", onClick: toggleText }))] })), status !== useRecorder_1.RecordStateEnum.Idle && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex items-center h-[84px]', isMobile ? 'flex-col' : 'flex-row'), children: [!isMobile && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('z-10 p-1.5 bg-[#F1F2F3] dark:bg-[#42434A] rounded-full ', 'self-center mr-4'), children: (0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: (0, clsx_1.default)('w-[18px] h-[18px] text-secondary', {
                                'opacity-40': sending
                            }), onClick: handleDelete }) })), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative w-full px-4 py-2 flex flex-row justify-between text-white text-sm leading-6  rounded-xl cursor-pointer overflow-hidden', {
                            'bg-[#FFF4F4] dark:bg-[#382A29]': isRecording && !isMobile,
                            'bg-[#EDEEEF] dark:bg-[#42434A]': !isRecording && !isMobile,
                            'bg-[#F2F4FE] dark:bg-[#292C38]': isMobile
                        }), onClick: handleClick, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, clsx_1.default)('z-10 rounded-xl px-2 py-[2px] text-sm leading-[24px]', {
                                    'text-[#EC2F0D] dark:text-[#FD5749] bg-[#FED3D1] dark:bg-[#612E2B]': isRecording && !isMobile,
                                    'text-[#414345] dark:text-[#B8BCCF] bg-[#DBDDDF] dark:bg-[#54565E]': !isRecording && !isMobile,
                                    'bg-[#CCD4FF] dark:bg-[#2B3561] text-[#3E5CFA] dark:text-[#5974FF]': isMobile
                                }), children: (0, common_helper_1.durationFormatter)(duration) }), state.audioUrl && (0, jsx_runtime_1.jsx)("audio", { ref: audioPlayer, src: state.audioUrl, onEnded: afterPlayEnd }), status === useRecorder_1.RecordStateEnum.Recording && ((0, jsx_runtime_1.jsxs)("span", { className: (0, clsx_1.default)('text-sm self-center z-10', {
                                    'text-[#3E5CFA] dark:text-[#5974FF]': isMobile,
                                    'text-[#EC2F0D] dark:text-[#FD5749]': !isMobile
                                }), children: [t('recording'), "..."] })), sending && ((0, jsx_runtime_1.jsx)("span", { className: "text-[#414345] dark:text-[#B8BCCF] text-sm z-10 self-center", children: t('sending') })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row justify-end", children: [!isMobile && (status === useRecorder_1.RecordStateEnum.Stopped || status === useRecorder_1.RecordStateEnum.Completed) && ((0, jsx_runtime_1.jsx)("div", { className: "z-10 bg-[#DBDDDF] dark:bg-[#54565E] w-7 h-7 rounded-full flex justify-center items-center", onClick: handlePlay, children: (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", className: "text-[#414345] dark:text-[#B8BCCF]", children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3 3.76844C3 2.81769 4.01933 2.21499 4.8524 2.67317L12.5461 6.90472C13.4096 7.37963 13.4096 8.62035 12.5461 9.09526L4.8524 13.3268C4.01933 13.785 3 13.1823 3 12.2315V3.76844Z", fill: "currentColor" }) }) })), !isMobile && status === useRecorder_1.RecordStateEnum.Playing && ((0, jsx_runtime_1.jsx)("div", { className: "z-10 bg-[#DBDDDF] dark:bg-[#54565E] w-7 h-7 rounded-full flex justify-center items-center", onClick: handlePlay, children: (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", className: "text-[#414345] dark:text-white", children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.5 3.5C4.5 3.22386 4.72386 3 5 3H6C6.27614 3 6.5 3.22386 6.5 3.5V12.5C6.5 12.7761 6.27614 13 6 13H5C4.86739 13 4.74021 12.9473 4.64645 12.8536C4.55268 12.7598 4.5 12.6326 4.5 12.5L4.5 3.5ZM9.5 3.5C9.5 3.22386 9.72386 3 10 3H11C11.1326 3 11.2598 3.05268 11.3536 3.14645C11.4473 3.24021 11.5 3.36739 11.5 3.5L11.5 12.5C11.5 12.7761 11.2761 13 11 13H10C9.72386 13 9.5 12.7761 9.5 12.5V3.5Z", fill: "currentColor" }) }) })), !isMobile && status === useRecorder_1.RecordStateEnum.Recording && ((0, jsx_runtime_1.jsx)("div", { className: "z-10 rounded-full bg-[#FED3D1] dark:bg-[#612E2B] w-7 h-7 flex justify-center items-center", onClick: stopRecording, children: (0, jsx_runtime_1.jsx)(StopIcon_1.default, { className: "w-4 h-4 text-[#EC2F0D] dark:text-[#FD5749]" }) })), isMobile && ((0, jsx_runtime_1.jsxs)("div", { className: "z-10 bg-primary w-7 h-7 rounded-full flex justify-center items-center ml-2", onClick: onSendClick, children: [!sending && (0, jsx_runtime_1.jsx)(ArrowSmallUpIcon_1.default, { className: "w-5 h-5 text-white" }), sending && (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "sm" })] }))] }), (state.timeUpdate > 0 || sending) && ((0, jsx_runtime_1.jsx)("div", { className: "absolute z-0 top-0 left-0 h-full w-full bg-[#E0E0E0] dark:bg-[#595A63] opacity-60 rounded-l-xl", style: { width: sending ? '100%' : `${(0, common_helper_1.getPercent)(state.timeUpdate, state.duration) * 100}%` } }))] }), isMobile && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('z-10 p-1.5 bg-[#F1F2F3] dark:bg-[#2B2E3B] rounded-lg self-center mt-2'), children: (0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: (0, clsx_1.default)('w-6 h-6 text-secondary', {
                                'opacity-40': sending
                            }), onClick: handleDelete }) })), !isMobile && status !== useRecorder_1.RecordStateEnum.Recording && ((0, jsx_runtime_1.jsxs)("div", { className: "z-10 bg-primary p-1.5 rounded-full flex justify-center items-center ml-2 cursor-pointer", onClick: onSendClick, children: [!sending && (0, jsx_runtime_1.jsx)(ArrowSmallUpIcon_1.default, { className: "w-6 h-6 text-white" }), sending && (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-white", size: "md" })] }))] })), state.timeLeft <= 10 && (0, jsx_runtime_1.jsx)(CountdownTips_1.default, {})] }));
}
exports.default = (0, react_1.memo)(WidgetVoiceInputUI);
