"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/solid/PlayIcon"));
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const audio_playing_1 = __importDefault(require("../../../../common/components/ui/icons/solid/audio-playing.js"));
const useAudioPlayer_1 = __importDefault(require("../../../../chat/views/hooks/useAudioPlayer.js"));
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const AudioPlayer = (props) => {
    const audioRef = (0, react_1.useRef)(null);
    const [duration, setDuration] = (0, react_1.useState)(0);
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(false);
    const [currentTime, setCurrentTime] = (0, react_1.useState)(0);
    const [audioHasError, setAudioHasError] = (0, react_1.useState)(false);
    const src = props.preview;
    const { status, file } = props.data;
    const isSuccess = status === 'completed';
    function afterPlayEnd() {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
    }
    const AudioComponent = (0, useAudioPlayer_1.default)();
    const handleAudioLoad = () => {
        URL.revokeObjectURL(src);
        const audio = audioRef?.current;
        setDuration(audio.duration);
    };
    const handleAudioToggle = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current
                    .play()
                    .then(() => {
                    setIsPlaying(true);
                })
                    .catch(err => {
                    console.error(err, err?.stack);
                });
            }
            else {
                audioRef.current?.pause();
                setIsPlaying(false);
            }
        }
    };
    const handleAudioTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            setCurrentTime(audio.currentTime);
            if (!audio.paused) {
                requestAnimationFrame(handleAudioTimeUpdate);
            }
        }
    };
    const handleAudioError = () => {
        setAudioHasError(true);
    };
    const curDuration = duration;
    const UIDuration = !curDuration
        ? (0, common_helper_1.durationFormatter)(0)
        : curDuration < 1
            ? (0, common_helper_1.durationFormatter)(1)
            : (0, common_helper_1.durationFormatter)(curDuration);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('audio-player flex flex-col justify-start items-start w-full'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col items-start justify-start space-y-3 text-xs", children: [isSuccess && ((0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)("button", { className: (0, clsx_1.default)('w-9 h-9 rounded-full flex justify-center items-center mr-3', isPlaying ? 'bg-primary' : 'bg-secondary-container'), onClick: handleAudioToggle, children: isPlaying ? (0, jsx_runtime_1.jsx)(audio_playing_1.default, {}) : (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "ml-[2px] fill-primary w-[16px] h-[16px]" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-start space-y-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "mr-5 text-[14px] font-semibold text-on-surface", children: file?.name }), file?.size > 0 && ((0, jsx_runtime_1.jsxs)("p", { className: "text-[12px] text-secondary", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-1", children: UIDuration }), "(", Math.ceil(file.size / 1000), "KB)"] }))] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-center items-center space-x-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-col justify-center items-start h-[8px] w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative w-full h-[2px] bg-[#DADFE5] dark:bg-[#383C52]" }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute w-full flex flex-row justify-start items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-on-surface h-[2px] w-full items-start", style: { width: `${(0, common_helper_1.getPercent)(currentTime, curDuration) * 100}%` } }), (0, jsx_runtime_1.jsx)("div", { className: "w-[7px] h-[7px] rounded-full bg-on-surface" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: `text-on-surface text-sm dark:text-primary text-right`, children: isPlaying ? (0, common_helper_1.durationFormatter)(currentTime) : UIDuration })] })] }), (0, jsx_runtime_1.jsx)(AudioComponent, { ref: audioRef, src: src, onLoadedData: handleAudioLoad, onEnded: afterPlayEnd, onTimeUpdate: handleAudioTimeUpdate, onError: handleAudioError, autoPlay: false })] }));
};
exports.default = AudioPlayer;
