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
exports.AudioRecorder = AudioRecorder;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowUpIcon"));
const PauseIcon_1 = __importDefault(require("@heroicons/react/24/solid/PauseIcon"));
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/solid/PlayIcon"));
const StopIcon_1 = __importDefault(require("@heroicons/react/24/solid/StopIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/solid/XMarkIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const KeyboardIcon_1 = __importDefault(require("../../../../../common/components/icons/KeyboardIcon.js"));
const icon_button_1 = require("../../../../../common/components/ui/icon-button.js");
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
const count_down_tips_1 = __importDefault(require("./count-down-tips.js"));
const useRecorder_1 = __importStar(require("./hooks/useRecorder.js"));
const menu_list_1 = __importDefault(require("../function-menu/menu-list.js"));
function AudioRecorder({ interacting = false, disabled = false, exitAudioInput, scrollLayoutToTop, onSend, onChangeType }) {
    const t = (0, next_intl_1.useTranslations)('chat');
    const audioPlayerRef = (0, react_1.useRef)(null);
    const isMobile = (0, react_use_1.useMedia)('(max-width: 768px)');
    const [sending, setSending] = (0, react_1.useState)(false);
    const onChangeInputType = () => { };
    const onRecordEnd = async (state) => { };
    const onChangePlayingAudio = () => { };
    const { clearRecord, state, startRecording, stopRecording, dispatch } = (0, useRecorder_1.default)({
        onChangeInputType,
        onRecordEnd,
        onChangePlayingAudio
    });
    const handleDelete = async () => {
        try {
            if (isMobile) {
                onChangeType('TEXT');
            }
            await clearRecord();
        }
        catch (error) {
            console.error(error);
        }
    };
    const timeUpdate = (0, react_1.useCallback)(() => {
        if (audioPlayerRef.current) {
            const { currentTime } = audioPlayerRef.current;
            dispatch({
                type: useRecorder_1.RecordActionType.SET_TIME_UPDATE,
                payload: {
                    timeUpdate: currentTime
                }
            });
        }
    }, [dispatch]);
    const startPlaying = () => {
        dispatch({
            type: useRecorder_1.RecordStateEnum.Playing
        });
    };
    const stopPlaying = () => {
        dispatch({
            type: useRecorder_1.RecordStateEnum.Stopped
        });
    };
    const handleAudioPlay = () => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.addEventListener('timeupdate', timeUpdate);
            audioPlayerRef.current.play();
            startPlaying();
        }
    };
    const handleAudioPause = () => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.removeEventListener('timeupdate', timeUpdate);
            audioPlayerRef.current?.pause();
            stopPlaying();
        }
    };
    const handleSend = () => {
        const { recordBlob, mimeType } = state;
        if (recordBlob) {
            onSend(recordBlob, mimeType);
            clearRecord();
        }
    };
    const handleMobileSend = async () => {
        setSending(true);
        const data = (await stopRecording());
        const { recordBlob, mimeType } = data;
        if (recordBlob) {
            onSend(recordBlob, mimeType);
            clearRecord();
            setSending(false);
            onChangeType('TEXT');
        }
    };
    const onStart = () => {
        startRecording();
    };
    const renderRecordIdle = () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(menu_list_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-full px-4 py-2 bg-surface-default text-center text-primary text-sm leading-6 border border-default rounded-xl hover:bg-surface-container-low cursor-pointer', { 'cursor-not-allowed': disabled }), onClick: onStart, children: t('record_top') }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", size: "md", color: "brand", onClick: () => {
                        exitAudioInput?.();
                    }, children: (0, jsx_runtime_1.jsx)(KeyboardIcon_1.default, { className: "w-6 h-6 text-primary" }) })] }));
    };
    const renderRecording = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex items-center flex-col md:flex-row gap-x-2", children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "primary", color: "default", size: "md", icon: XMarkIcon_1.default, className: "hidden md:inline-flex", onClick: handleDelete }), (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full px-4 py-2 flex flex-row justify-between text-white text-sm leading-6 rounded-xl cursor-pointer overflow-hidden bg-[#F2F4FE] md:dark:bg-[#292C38] md:bg-[#FFF4F4] md:dark:bg-[#382A29]", onClick: () => !isMobile && stopRecording(), children: [(0, jsx_runtime_1.jsx)("span", { className: "z-10 rounded-xl px-2 py-[2px] text-sm leading-[24px] bg-[#CCD4FF] dark:bg-[#2B3561] text-[#3E5CFA] dark:text-[#5974FF]  md:text-[#EC2F0D] md:dark:text-[#FD5749] md:bg-[#FED3D1] md:dark:bg-[#612E2B]", children: (0, common_helper_1.durationFormatter)(state.duration) }), sending ? ((0, jsx_runtime_1.jsx)("span", { className: "text-[#414345] dark:text-[#B8BCCF] text-sm z-10 self-center", children: t('sending') })) : ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm self-center justify-center z-10 text-[#3E5CFA] dark:text-[#5974FF] md:text-[#EC2F0D] md:dark:text-[#FD5749]", children: [t('recording'), "..."] })), (0, jsx_runtime_1.jsx)("div", { className: "z-10 rounded-full bg-[#FED3D1] dark:bg-[#612E2B] w-7 h-7 md:flex justify-center items-center hidden", onClick: stopRecording, children: (0, jsx_runtime_1.jsx)(StopIcon_1.default, { className: "w-4 h-4 text-[#EC2F0D] dark:text-[#FD5749]" }) }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { className: "md:hidden", variant: "primary", size: "sm", icon: ArrowUpIcon_1.default, loading: interacting, onClick: handleMobileSend })] }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "primary", color: "default", size: "sm", icon: XMarkIcon_1.default, className: "mt-2 md:hidden", onClick: handleDelete })] }));
    };
    const renderRecordStop = () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "primary", color: "default", size: "md", icon: XMarkIcon_1.default, className: "hidden md:inline-flex", onClick: handleDelete }), (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full px-4 py-2 flex flex-row justify-between text-white text-sm leading-6 rounded-xl cursor-pointer overflow-hidden bg-[#F2F4FE] md:bg-[#EDEEEF] md:dark:bg-[#42434A]", onClick: stopRecording, children: [(0, jsx_runtime_1.jsx)("span", { className: "z-10 rounded-xl px-2 py-[2px] text-sm leading-[24px] bg-[#CCD4FF] dark:bg-[#2B3561] text-[#3E5CFA] dark:text-[#5974FF] md:text-[#414345] md:dark:text-[#B8BCCF] md:bg-[#DBDDDF] md:dark:bg-[#54565E]", children: (0, common_helper_1.durationFormatter)(state.duration) }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", size: "md", onClick: handleAudioPlay, className: "text-primary  z-10 bg-[#DBDDDF] dark:bg-[#54565E] w-7 h-7 rounded-full hidden md:flex md:justify-center md:items-center", children: (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "w-4 h-4" }) }), state.timeUpdate > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "absolute z-0 top-0 left-0 h-full bg-[#E0E0E0] dark:bg-[#595A63] opacity-60 rounded-l-xl", style: { width: `${(0, common_helper_1.getPercent)(state.timeUpdate, state.duration) * 100}%` } }))] }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "primary", size: "md", icon: ArrowUpIcon_1.default, loading: interacting, onClick: handleSend })] }));
    };
    const renderRecordPlaying = () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "primary", color: "default", size: "md", icon: XMarkIcon_1.default, className: "hidden md:inline-flex", onClick: handleDelete }), (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full px-4 py-2 flex flex-row justify-between text-white text-sm leading-6 rounded-xl cursor-pointer overflow-hidden bg-[#F2F4FE] md:bg-[#EDEEEF] md:dark:bg-[#42434A]", children: [(0, jsx_runtime_1.jsx)("span", { className: "z-10 rounded-xl px-2 py-[2px] text-sm leading-[24px] bg-[#CCD4FF] dark:bg-[#2B3561] text-[#3E5CFA] dark:text-[#5974FF] md:text-[#414345] md:dark:text-[#B8BCCF] md:bg-[#DBDDDF] md:dark:bg-[#54565E]", children: (0, common_helper_1.durationFormatter)(state.duration) }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", size: "md", onClick: handleAudioPause, className: "text-primary  z-10 bg-[#DBDDDF] dark:bg-[#54565E] w-7 h-7 rounded-full hidden md:flex md:justify-center md:items-center", children: (0, jsx_runtime_1.jsx)(PauseIcon_1.default, { className: "w-4 h-4" }) }), state.timeUpdate > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "absolute z-0 top-0 left-0 h-full w-full bg-[#E0E0E0] dark:bg-[#595A63] opacity-60 rounded-l-xl", style: { width: `${(0, common_helper_1.getPercent)(state.timeUpdate, state.duration) * 100}%` } }))] }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "primary", size: "md", icon: ArrowUpIcon_1.default, onClick: handleSend, loading: sending })] }));
    };
    (0, react_1.useEffect)(() => {
        if (state.status === useRecorder_1.RecordStateEnum.Recording) {
            scrollLayoutToTop?.();
        }
    }, [scrollLayoutToTop, state.status]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex space-x-2 items-center justify-between h-18", children: [state.status === useRecorder_1.RecordStateEnum.CallUping && (0, jsx_runtime_1.jsx)("div", { children: "111" }), state.status === useRecorder_1.RecordStateEnum.Idle && renderRecordIdle(), state.status === useRecorder_1.RecordStateEnum.Recording && renderRecording(), (state.status === useRecorder_1.RecordStateEnum.Completed || state.status === useRecorder_1.RecordStateEnum.Stopped) && renderRecordStop(), state.status === useRecorder_1.RecordStateEnum.Playing && renderRecordPlaying()] }), state.audioUrl && (0, jsx_runtime_1.jsx)("audio", { ref: audioPlayerRef, src: state.audioUrl, onEnded: stopPlaying }), state.timeLeft <= 10 && (0, jsx_runtime_1.jsx)(count_down_tips_1.default, {})] }));
}
