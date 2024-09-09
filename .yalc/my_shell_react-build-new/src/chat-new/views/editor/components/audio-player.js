import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import PlayIcon from '@heroicons/react/24/solid/PlayIcon';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import useAudioPlayer from '../../../../chat/views/hooks/useAudioPlayer.js';
import AudioPlaying from '../../../../common/components/ui/icons/solid/audio-playing.js';
import Spinner from '../../../../common/components/ui/spinner.js';
import { durationFormatter, getPercent } from '../../../../common/utils/common-helper.js';
function AudioPlayer(props) {
    const audioRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [audioHasError, setAudioHasError] = useState(false);
    const src = props.preview;
    const { status } = props.data;
    const isError = status === 'error';
    const isPending = status === 'pending';
    const isSuccess = status === 'completed';
    const t = useTranslations('chat');
    function afterPlayEnd() {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
    }
    const AudioComponent = useAudioPlayer();
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
        ? durationFormatter(0)
        : curDuration < 1
            ? durationFormatter(1)
            : durationFormatter(curDuration);
    return (_jsxs("div", { className: clsx('audio-player flex flex-col justify-start items-start w-full'), children: [_jsxs("div", { className: "w-full flex items-center justify-start space-x-2 text-xs", children: [isSuccess && (_jsx("button", { className: "w-7 h-7 rounded-full bg-primary flex justify-center items-center", onClick: handleAudioToggle, children: isPlaying ? _jsx(AudioPlaying, {}) : _jsx(PlayIcon, { className: "ml-[2px] fill-[#fefefe] w-[16px] h-[16px]" }) })), !isSuccess && (_jsxs("div", { className: clsx({
                            'flex justify-center items-center p-1.5 rounded-lg mr-3': true,
                            'bg-[#D72C0D]': isError,
                            'bg-[#8C9196]': isPending
                        }), children: [isError && _jsx(ArrowPathIcon, { className: "w-4 h-4 text-white" }), isPending && (_jsx("div", { className: "w-4 h-4 flex justify-center items-center", children: _jsx(Spinner, { size: "sm", className: "text-static w-[14px] h-[14px]" }) }))] })), _jsxs("div", { className: "flex-1 relative flex flex-col justify-center items-start h-[8px] w-[50px]", children: [_jsx("div", { className: "relative w-full h-[2px] bg-[#DADFE5] dark:bg-[#383C52]" }), _jsxs("div", { className: "absolute w-full flex flex-row justify-start items-center", children: [_jsx("div", { className: "bg-on-surface h-[2px] w-full items-start", style: { width: `${getPercent(currentTime, curDuration) * 100}%` } }), _jsx("div", { className: "w-[7px] h-[7px] rounded-full bg-on-surface" })] })] }), _jsx("span", { className: "w-10 text-on-surface text-sm dark:text-primary", children: isPlaying ? durationFormatter(currentTime) : UIDuration })] }), _jsx(AudioComponent, { ref: audioRef, src: src, onLoadedData: handleAudioLoad, onEnded: afterPlayEnd, onTimeUpdate: handleAudioTimeUpdate, onError: handleAudioError, autoPlay: false })] }));
}
export default AudioPlayer;
