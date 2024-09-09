import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Popover, PopoverBody, PopoverContent, PopoverTrigger, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import PauseIcon from '@heroicons/react/24/solid/PauseIcon';
import PlayIcon from '@heroicons/react/24/solid/PlayIcon';
import SpeakerWaveIcon from '@heroicons/react/24/solid/SpeakerWaveIcon';
import SpeakerXMarkIcon from '@heroicons/react/24/solid/SpeakerXMarkIcon';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useEffectOnce, useHover, useWindowSize } from 'usehooks-ts';
import Spinner from '../../../../../../../common/components/ui/spinner.js';
import { useDevice } from '../../../../../../../common/hooks/useDevice.js';
import { durationFormatter } from '../../../../../../../common/utils/common-helper.js';
function VideoPlayer({ videoObj, onClose, triggerPlay }) {
    const videoRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoHasError, setVideoHasError] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const { isMobile } = useDevice();
    const [volumeBeforeMuted, setVolumeBeforeMuted] = useState(0.5);
    const [loaded, setLoaded] = useState(false);
    const { width, height } = useWindowSize();
    const hoverRef = useRef(null);
    const isHover = useHover(hoverRef);
    useEffect(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
    }, [videoObj?.url]);
    useEffectOnce(() => {
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
    useEffect(() => {
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
    useEffect(() => {
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
    const originDimension = useMemo(() => {
        return calculateMediaSize({ width, height: height - 80 }, { width: videoObj.mediaFileMetadata?.width ?? 0, height: videoObj.mediaFileMetadata?.height ?? 0 });
    }, [height, videoObj.mediaFileMetadata?.height, videoObj.mediaFileMetadata?.width, width]);
    return (_jsxs("div", { className: "w-full h-full relative flex justify-center items-center", ref: hoverRef, children: [!loaded && (_jsx("div", { className: "absolute top-0 left-0 w-full h-full flex justify-center items-center z-10", children: _jsx("div", { className: "flex justify-center items-center bg-[#00000033] backdrop-blur-2xl", style: { ...originDimension }, children: _jsx("div", { className: "w-10 h-10 p-[6px] flex justify-center items-center", children: _jsx(Spinner, { size: "md", speed: "slow", className: "text-white" }) }) }) })), _jsx("div", { className: "absolute w-full h-full top-0 left-0 z-[1]", onClick: onClose }), _jsx("video", { src: videoObj.url, className: "object-scale-down", width: originDimension.width ?? 9999, height: originDimension.height ?? 9999, ref: videoRef, onEnded: afterPlayEnd, onTimeUpdate: handleVideoTimeUpdate, onError: handleVideoError, muted: muted, style: { ...originDimension } }), isHover && loaded && (_jsx("div", { className: "absolute bottom-9 w-full flex justify-center z-10", children: _jsxs("div", { className: "w-[480px] h-[56px] flex space-x-2 justify-center items-center border border-default rounded-xl p-4 bg-surface text-on-surface shadow-[0_0_2px_0_#0000001A]", children: [_jsx(Button, { variant: "unstyled", onClick: handleVideoToggle, borderRadius: "full", "aria-label": "audio control button", isDisabled: !videoObj.url || !loaded, _disabled: {
                                opacity: 0.3,
                                cursor: 'not-allowed'
                            }, size: "sm", className: "!flex !items-center !justify-center text-on-surface w-9 h-9", children: isPlaying ? _jsx(PauseIcon, { className: "w-6 h-6" }) : _jsx(PlayIcon, { className: "w-6 h-6" }) }), _jsx("span", { className: "text-secondary text-xs shrink-0", children: durationFormatter(currentTime) }), _jsxs(Slider, { min: 0, max: duration, value: currentTime, onChangeStart: handleVideoProgressChangeStart, onChange: (value) => handleVideoProgressChange(value), onChangeEnd: handleVideoProgressChangeEnd, focusThumbOnChange: false, isDisabled: !loaded, className: "flex items-center w-full h-6 cursor-pointer", children: [_jsx(SliderTrack, { className: "bg-[#EDF0F5] dark:bg-[#22242E]", children: _jsx(SliderFilledTrack, { className: "bg-primary" }) }), _jsx(SliderThumb, { className: "bg-primary border-[2px] border-white" })] }), _jsx("span", { className: "text-secondary text-xs shrink-0", children: durationFormatter(duration) }), _jsxs(Popover, { placement: "top", trigger: isMobile ? 'click' : 'hover', offset: [0, 8], closeOnBlur: true, openDelay: 100, children: [_jsx(PopoverTrigger, { children: _jsx("div", { children: muted ? (_jsx(SpeakerXMarkIcon, { className: "w-5 h-5 text-on-surface cursor-pointer", onClick: () => toggleMuted(false) })) : (_jsx(SpeakerWaveIcon, { className: "w-5 h-5 text-on-surface cursor-pointer", onClick: () => toggleMuted(true) })) }) }), _jsx(PopoverContent, { className: "rounded-lg p-3 border border-default w-8 h-[121px] bg-surface text-on-surface shadow-lg", children: _jsx(PopoverBody, { className: "p-0 flex justify-center items-center", children: _jsxs(Slider, { orientation: "vertical", min: 0, max: 1, step: 0.01, value: volume, onChange: onVolumeChange, focusThumbOnChange: false, className: "h-[97px]", children: [_jsx(SliderTrack, { className: "bg-[#EDF0F5] dark:bg-[#22242E] w-[2px]", children: _jsx(SliderFilledTrack, { className: "bg-primary" }) }), _jsx(SliderThumb, { className: "bg-primary border-[2px] border-surface" })] }) }) })] })] }) }))] }));
}
const MemorizedVideoPlayer = memo(VideoPlayer);
export default MemorizedVideoPlayer;
