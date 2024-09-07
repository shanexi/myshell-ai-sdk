"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowPathIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowPathIcon"));
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/solid/PlayIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const audio_playing_1 = __importDefault(require("../../../common/components/ui/icons/solid/audio-playing.js"));
const useAudioPlayer_1 = __importDefault(require("../../../chat/views/hooks/useAudioPlayer.js"));
const spinner_1 = __importDefault(require("../../../common/components/ui/spinner.js"));
const common_helper_1 = require("../../../common/utils/common-helper.js");
function AudioPlayer(props) {
    const audioRef = (0, react_1.useRef)(null);
    const [duration, setDuration] = (0, react_1.useState)(0);
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(false);
    const [currentTime, setCurrentTime] = (0, react_1.useState)(0);
    const [audioHasError, setAudioHasError] = (0, react_1.useState)(false);
    const src = props.preview;
    const { status } = props.data;
    const isError = status === 'error';
    const isPending = status === 'pending';
    const isSuccess = status === 'completed';
    const t = (0, next_intl_1.useTranslations)('chat');
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('audio-player flex flex-col justify-start items-start w-full'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex items-center justify-start space-x-2 text-xs", children: [isSuccess && ((0, jsx_runtime_1.jsx)("button", { className: "w-7 h-7 rounded-full bg-primary flex justify-center items-center", onClick: handleAudioToggle, children: isPlaying ? (0, jsx_runtime_1.jsx)(audio_playing_1.default, {}) : (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "ml-[2px] fill-[#fefefe] w-[16px] h-[16px]" }) })), !isSuccess && ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)({
                            'flex justify-center items-center p-1.5 rounded-lg mr-3': true,
                            'bg-[#D72C0D]': isError,
                            'bg-[#8C9196]': isPending
                        }), children: [isError && (0, jsx_runtime_1.jsx)(ArrowPathIcon_1.default, { className: "w-4 h-4 text-white" }), isPending && ((0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm", className: "text-static w-[14px] h-[14px]" }) }))] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 relative flex flex-col justify-center items-start h-[8px] w-[50px]", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative w-full h-[2px] bg-[#DADFE5] dark:bg-[#383C52]" }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute w-full flex flex-row justify-start items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-on-surface h-[2px] w-full items-start", style: { width: `${(0, common_helper_1.getPercent)(currentTime, curDuration) * 100}%` } }), (0, jsx_runtime_1.jsx)("div", { className: "w-[7px] h-[7px] rounded-full bg-on-surface" })] })] }), (0, jsx_runtime_1.jsx)("span", { className: "w-10 text-on-surface text-sm dark:text-primary", children: isPlaying ? (0, common_helper_1.durationFormatter)(currentTime) : UIDuration })] }), (0, jsx_runtime_1.jsx)(AudioComponent, { ref: audioRef, src: src, onLoadedData: handleAudioLoad, onEnded: afterPlayEnd, onTimeUpdate: handleAudioTimeUpdate, onError: handleAudioError, autoPlay: false })] }));
}
exports.default = AudioPlayer;
