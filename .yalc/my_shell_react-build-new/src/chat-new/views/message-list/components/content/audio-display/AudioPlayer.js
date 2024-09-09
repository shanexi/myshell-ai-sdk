import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PlayIcon from '@heroicons/react/20/solid/PlayIcon';
import { forwardRef, useImperativeHandle } from 'react';
import { useAudio } from 'react-use';
import useAudioPlayer from '../../../../../../chat/views/hooks/useAudioPlayer.js';
import { IconButton } from '../../../../../../common/components/ui/icon-button.js';
import AudioPlaying from '../../../../../../common/components/ui/icons/solid/audio-playing.js';
import { durationFormatter, getPercent } from '../../../../../../common/utils/common-helper.js';
const AudioPlayer = forwardRef(({ src, onManuallyInteracted, onEnded, serverDuration }, ref) => {
    const AudioComp = useAudioPlayer();
    const [audio, state, controls] = useAudio(_jsx(AudioComp, { src: src, onEnded: () => {
            controls.seek(0);
            onEnded?.();
        } }));
    const { paused, time, playing } = state;
    const duration = state.duration || serverDuration || 0;
    useImperativeHandle(ref, () => ({
        play: () => {
            controls.play();
        },
        pause: () => {
            controls.pause();
        }
    }));
    const onAudioToggle = () => {
        if (paused) {
            const audios = document.getElementsByTagName('audio');
            for (let i = 0, len = audios.length; i < len; i++) {
                audios[i].pause();
            }
            controls.play();
            onManuallyInteracted?.(true);
        }
        else {
            controls.pause();
            onManuallyInteracted?.(false);
        }
    };
    return (_jsxs("div", { className: "flex flex-col space-y-1 w-full overflow-hidden", children: [_jsx("div", { className: "bg-primary h-px w-full items-start", style: { width: `${getPercent(time, duration) * 100}%` } }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(IconButton, { className: "w-6 h-6", onClick: onAudioToggle, loading: !src || !duration, children: paused ? _jsx(PlayIcon, { className: "size-3 ml-0.5" }) : _jsx(AudioPlaying, {}) }), _jsx("div", { className: "flex flex-col grow overflow-hidden", children: _jsx("div", { className: "text-sm text-brand truncate", children: durationFormatter(((playing || paused) && time) || duration) }) })] }), audio] }));
});
AudioPlayer.displayName = 'AudioPlayer';
export default AudioPlayer;
