"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const PauseIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/PauseIcon"));
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/PlayIcon"));
const SpeakerWaveIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/SpeakerWaveIcon"));
const SpeakerXMarkIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/SpeakerXMarkIcon"));
const react_2 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const spinner_1 = __importDefault(require("../../../../../../../common/components/ui/spinner"));
const useDevice_1 = require("../../../../../../../common/hooks/useDevice");
const common_helper_1 = require("../../../../../../../common/utils/common-helper");
function VideoPlayer({ videoObj, onClose, triggerPlay }) {
    const videoRef = (0, react_2.useRef)(null);
    const [duration, setDuration] = (0, react_2.useState)(0);
    const [isPlaying, setIsPlaying] = (0, react_2.useState)(false);
    const [currentTime, setCurrentTime] = (0, react_2.useState)(0);
    const [videoHasError, setVideoHasError] = (0, react_2.useState)(false);
    const [muted, setMuted] = (0, react_2.useState)(false);
    const [volume, setVolume] = (0, react_2.useState)(0.5);
    const { isMobile } = (0, useDevice_1.useDevice)();
    const [volumeBeforeMuted, setVolumeBeforeMuted] = (0, react_2.useState)(0.5);
    const [loaded, setLoaded] = (0, react_2.useState)(false);
    const { width, height } = (0, usehooks_ts_1.useWindowSize)();
    const hoverRef = (0, react_2.useRef)(null);
    const isHover = (0, usehooks_ts_1.useHover)(hoverRef);
    (0, react_2.useEffect)(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
    }, [videoObj?.url]);
    (0, usehooks_ts_1.useEffectOnce)(() => {
        const video = videoRef.current;
        if (video) {
            video.volume = 0.5;
        }
    });
    const handleVideoLoad = () => {
        const video = videoRef.current;
        setDuration(video.duration);
    };
    const handleVideoError = () => {
        setVideoHasError(true);
    };
    const handleVideoToggle = () => {
        const video = videoRef.current;
        if (video) {
            if (!video.paused) {
                video.pause();
                setIsPlaying(false);
            }
            else {
                video.play().catch(err => {
                    console.error(err, err?.stack);
                });
            }
        }
    };
    const handleVideoTimeUpdate = () => {
        const video = videoRef.current;
        if (video) {
            setCurrentTime(video.currentTime);
            if (!video.paused) {
                requestAnimationFrame(handleVideoTimeUpdate);
            }
        }
    };
    function afterPlayEnd() {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.pause();
            setIsPlaying(false);
        }
        setCurrentTime(0);
    }
    const handleVideoProgressChangeStart = () => {
        const video = videoRef.current;
        if (video) {
            if (!video.paused) {
                video.pause();
                setIsPlaying(false);
            }
        }
    };
    const handleVideoProgressChange = (newValue) => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = newValue;
            setCurrentTime(video.currentTime);
        }
    };
    const handleVideoProgressChangeEnd = () => {
        const video = videoRef.current;
        if (video) {
            if (video.paused) {
                video.play().catch(err => {
                    console.error(err, err?.stack);
                });
            }
        }
    };
    const onVolumeChange = (value) => {
        const video = videoRef.current;
        if (video) {
            setVolume(value);
            video.volume = value;
            if (value === 0) {
                setMuted(true);
                setVolumeBeforeMuted(0);
            }
            else if (muted) {
                setMuted(false);
            }
        }
    };
    const toggleMuted = (state) => {
        setMuted(state);
        const video = videoRef.current;
        if (state) {
            if (video) {
                setVolumeBeforeMuted(volume);
                setVolume(0);
                video.volume = 0;
            }
        }
        if (!state) {
            if (volumeBeforeMuted !== 0) {
                if (video) {
                    setVolume(volumeBeforeMuted);
                    video.volume = volumeBeforeMuted;
                }
            }
            else if (video) {
                setVolume(0.1);
                video.volume = 0.1;
            }
        }
    };
    const handlePlay = () => {
        setIsPlaying(true);
    };
    const handleCanPlay = () => {
        handleVideoLoad();
        setLoaded(true);
    };
    (0, react_2.useEffect)(() => {
        const video = videoRef.current;
        video?.addEventListener('play', handlePlay);
        video?.addEventListener('canplay', handleCanPlay);
        video?.addEventListener('canplaythrough', handleCanPlay);
        if (video?.readyState && video?.readyState >= 2) {
            handleCanPlay();
        }
        return () => {
            video?.removeEventListener('play', handlePlay);
            video?.removeEventListener('canplay', handleCanPlay);
            video?.removeEventListener('canplaythrough', handleCanPlay);
        };
    }, []);
    (0, react_2.useEffect)(() => {
        const video = videoRef.current;
        if (video) {
            if (triggerPlay) {
                if (video.readyState >= 4) {
                    video.paused &&
                        video.play().catch(err => {
                            console.error(err, err?.stack);
                        });
                }
                else {
                    video.addEventListener('canplaythrough', () => {
                        video.paused &&
                            video.play().catch(err => {
                                console.error(err, err?.stack);
                            });
                    }, { once: true });
                }
            }
            else {
                video.pause();
                video.currentTime = 0;
                setCurrentTime(0);
            }
        }
    }, [triggerPlay]);
    function calculateMediaSize(containerSize, mediaSize) {
        let newWidth = mediaSize.width;
        let newHeight = mediaSize.height;
        if (mediaSize.width === 0 || mediaSize.height === 0) {
            return containerSize;
        }
        if (mediaSize.width <= containerSize.width && mediaSize.height <= containerSize.height) {
            return mediaSize;
        }
        const widthRatio = containerSize.width / mediaSize.width;
        const heightRatio = containerSize.height / mediaSize.height;
        const ratio = Math.min(widthRatio, heightRatio);
        newWidth = mediaSize.width * ratio;
        newHeight = mediaSize.height * ratio;
        return {
            width: newWidth,
            height: newHeight
        };
    }
    const originDimension = (0, react_2.useMemo)(() => {
        return calculateMediaSize({ width, height: height - 80 }, { width: videoObj.mediaFileMetadata?.width ?? 0, height: videoObj.mediaFileMetadata?.height ?? 0 });
    }, [height, videoObj.mediaFileMetadata?.height, videoObj.mediaFileMetadata?.width, width]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full relative flex justify-center items-center", ref: hoverRef, children: [!loaded && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-full h-full flex justify-center items-center z-10", children: (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center bg-[#00000033] backdrop-blur-2xl", style: { ...originDimension }, children: (0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 p-[6px] flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "md", speed: "slow", className: "text-white" }) }) }) })), (0, jsx_runtime_1.jsx)("div", { className: "absolute w-full h-full top-0 left-0 z-[1]", onClick: onClose }), (0, jsx_runtime_1.jsx)("video", { src: videoObj.url, className: "object-scale-down", width: originDimension.width ?? 9999, height: originDimension.height ?? 9999, ref: videoRef, onEnded: afterPlayEnd, onTimeUpdate: handleVideoTimeUpdate, onError: handleVideoError, muted: muted, style: { ...originDimension } }), isHover && loaded && ((0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-9 w-full flex justify-center z-10", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-[480px] h-[56px] flex space-x-2 justify-center items-center border border-default rounded-xl p-4 bg-surface text-on-surface shadow-[0_0_2px_0_#0000001A]", children: [(0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", onClick: handleVideoToggle, borderRadius: "full", "aria-label": "audio control button", isDisabled: !videoObj.url || !loaded, _disabled: {
                                opacity: 0.3,
                                cursor: 'not-allowed'
                            }, size: "sm", className: "!flex !items-center !justify-center text-on-surface w-9 h-9", children: isPlaying ? (0, jsx_runtime_1.jsx)(PauseIcon_1.default, { className: "w-6 h-6" }) : (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "w-6 h-6" }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-secondary text-xs shrink-0", children: (0, common_helper_1.durationFormatter)(currentTime) }), (0, jsx_runtime_1.jsxs)(react_1.Slider, { min: 0, max: duration, value: currentTime, onChangeStart: handleVideoProgressChangeStart, onChange: (value) => handleVideoProgressChange(value), onChangeEnd: handleVideoProgressChangeEnd, focusThumbOnChange: false, isDisabled: !loaded, className: "flex items-center w-full h-6 cursor-pointer", children: [(0, jsx_runtime_1.jsx)(react_1.SliderTrack, { className: "bg-[#EDF0F5] dark:bg-[#22242E]", children: (0, jsx_runtime_1.jsx)(react_1.SliderFilledTrack, { className: "bg-primary" }) }), (0, jsx_runtime_1.jsx)(react_1.SliderThumb, { className: "bg-primary border-[2px] border-white" })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-secondary text-xs shrink-0", children: (0, common_helper_1.durationFormatter)(duration) }), (0, jsx_runtime_1.jsxs)(react_1.Popover, { placement: "top", trigger: isMobile ? 'click' : 'hover', offset: [0, 8], closeOnBlur: true, openDelay: 100, children: [(0, jsx_runtime_1.jsx)(react_1.PopoverTrigger, { children: (0, jsx_runtime_1.jsx)("div", { children: muted ? ((0, jsx_runtime_1.jsx)(SpeakerXMarkIcon_1.default, { className: "w-5 h-5 text-on-surface cursor-pointer", onClick: () => toggleMuted(false) })) : ((0, jsx_runtime_1.jsx)(SpeakerWaveIcon_1.default, { className: "w-5 h-5 text-on-surface cursor-pointer", onClick: () => toggleMuted(true) })) }) }), (0, jsx_runtime_1.jsx)(react_1.PopoverContent, { className: "rounded-lg p-3 border border-default w-8 h-[121px] bg-surface text-on-surface shadow-lg", children: (0, jsx_runtime_1.jsx)(react_1.PopoverBody, { className: "p-0 flex justify-center items-center", children: (0, jsx_runtime_1.jsxs)(react_1.Slider, { orientation: "vertical", min: 0, max: 1, step: 0.01, value: volume, onChange: onVolumeChange, focusThumbOnChange: false, className: "h-[97px]", children: [(0, jsx_runtime_1.jsx)(react_1.SliderTrack, { className: "bg-[#EDF0F5] dark:bg-[#22242E] w-[2px]", children: (0, jsx_runtime_1.jsx)(react_1.SliderFilledTrack, { className: "bg-primary" }) }), (0, jsx_runtime_1.jsx)(react_1.SliderThumb, { className: "bg-primary border-[2px] border-surface" })] }) }) })] })] }) }))] }));
}
const MemorizedVideoPlayer = (0, react_2.memo)(VideoPlayer);
exports.default = MemorizedVideoPlayer;
