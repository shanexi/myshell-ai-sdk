"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ArrowDownTrayIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowDownTrayIcon"));
const XCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/XCircleIcon"));
const PauseIcon_1 = __importDefault(require("@heroicons/react/24/solid/PauseIcon"));
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/solid/PlayIcon"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const spinner_1 = __importDefault(require("../../../../../common/components/ui/spinner.js"));
const useDownload_1 = __importDefault(require("../../../../../common/hooks/useDownload.js"));
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
function IosAudioPlayer({ title, url }) {
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const audioRef = (0, react_2.useRef)(null);
    const [duration, setDuration] = (0, react_2.useState)(0);
    const [loading, setLoading] = (0, react_2.useState)(false);
    const [isPlaying, setIsPlaying] = (0, react_2.useState)(false);
    const [currentTime, setCurrentTime] = (0, react_2.useState)(0);
    const [audioHasError, setAudioHasError] = (0, react_2.useState)(false);
    const hoverRef = (0, react_2.useRef)(null);
    const isHover = (0, usehooks_ts_1.useHover)(hoverRef);
    const { downloading, onDownload } = (0, useDownload_1.default)();
    const handleAudioLoad = () => {
        setLoading(false);
        const audio = audioRef.current;
        setDuration(audio.duration);
    };
    const handleAudioError = () => {
        setAudioHasError(true);
    };
    const handleAudioToggle = (0, react_2.useCallback)(() => {
        const audio = audioRef.current;
        if (!duration) {
            setLoading(true);
            audio?.load();
            audio?.addEventListener('loadedmetadata', () => {
                handleAudioLoad();
                audio
                    .play()
                    .then(() => {
                    setIsPlaying(true);
                })
                    .catch(err => {
                    console.error(err, err?.stack);
                });
            }, {
                once: true
            });
        }
        else if (!audio.paused) {
            audio?.pause();
            setIsPlaying(false);
        }
        else {
            audio
                .play()
                .then(() => {
                setIsPlaying(true);
            })
                .catch(err => {
                console.error(err, err?.stack);
            });
        }
    }, [duration]);
    const handleAudioTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            setCurrentTime(audio.currentTime);
            if (!audio.paused) {
                requestAnimationFrame(handleAudioTimeUpdate);
            }
        }
    };
    function afterPlayEnd() {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current?.pause();
            setIsPlaying(false);
        }
        setCurrentTime(0);
    }
    const handleAudioProgressChangeStart = () => {
        const audio = audioRef.current;
        if (!audio.paused) {
            audio?.pause();
            setIsPlaying(false);
        }
    };
    const handleAudioProgressChange = (newValue) => {
        const audio = audioRef.current;
        audio.currentTime = newValue;
        setCurrentTime(audio.currentTime);
    };
    const handleAudioProgressChangeEnd = () => {
        const audio = audioRef.current;
        if (audio.paused) {
            audio
                .play()
                .then(() => {
                setIsPlaying(true);
            })
                .catch(err => {
                console.error(err, err?.stack);
            });
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-3 rounded-xl border border-default bg-surface w-[260px] md:w-[448px] relative overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col space-y-2 text-on-surface overflow-hidden", children: [audioHasError ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-3 items-center min-h-[38px]", children: [(0, jsx_runtime_1.jsx)(XCircleIcon_1.default, { className: "w-9 h-9 stroke-[#EC2F0D]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-on-surface", children: chatT('audio_cannot_load') })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-3 items-center w-full overflow-hidden", ref: hoverRef, children: [(0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", onClick: handleAudioToggle, borderRadius: "full", "aria-label": "audio control button", isLoading: !url || loading, isDisabled: !url || loading, _disabled: {
                                    opacity: 0.3,
                                    cursor: 'not-allowed'
                                }, size: "sm", spinner: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand", size: "md" }), className: "bg-[#ECEFFF] !flex !items-center !justify-center text-primary w-9 h-9 shrink-0", children: isPlaying ? (0, jsx_runtime_1.jsx)(PauseIcon_1.default, { className: "w-5 h-5" }) : (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "w-5 h-5" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-[2px] grow overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium truncate", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-secondary", children: !duration ? (0, common_helper_1.durationFormatter)(0) : duration < 1 ? (0, common_helper_1.durationFormatter)(1) : (0, common_helper_1.durationFormatter)(duration) })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-[26px] h-[26px] shrink-0", children: isHover && ((0, jsx_runtime_1.jsx)(react_1.IconButton, { variant: "unstyled", "aria-label": "download file", isLoading: downloading, onClick: () => onDownload(url, title), className: "p-1 min-w-fit h-fit text-[var(--on-surface-btn-text)]", children: (0, jsx_runtime_1.jsx)(ArrowDownTrayIcon_1.default, { className: "w-[18px] h-[18px] text-[var(--on-surface-btn-text)] cursor-pointer" }) })) })] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2 items-center pl-1", children: [(0, jsx_runtime_1.jsxs)(react_1.Slider, { flexGrow: 1, min: 0, max: duration, value: currentTime, onChangeStart: handleAudioProgressChangeStart, onChange: (value) => handleAudioProgressChange(value), onChangeEnd: handleAudioProgressChangeEnd, focusThumbOnChange: false, isDisabled: !duration, className: "flex items-center w-full h-6 cursor-pointer", children: [(0, jsx_runtime_1.jsx)(react_1.SliderTrack, { className: "bg-surface-container-selected-hovered h-[2px]", children: (0, jsx_runtime_1.jsx)(react_1.SliderFilledTrack, { className: "bg-on-surface" }) }), (0, jsx_runtime_1.jsx)(react_1.SliderThumb, { className: "bg-on-surface w-[7px] h-[7px] rounded-full" })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-secondary text-xs shrink-0", children: (0, common_helper_1.durationFormatter)(currentTime) })] })] }), (0, jsx_runtime_1.jsx)("audio", { ref: audioRef, src: url, onEnded: afterPlayEnd, onTimeUpdate: handleAudioTimeUpdate, onError: handleAudioError, autoPlay: false })] }));
}
exports.default = (0, react_2.memo)(IosAudioPlayer);
