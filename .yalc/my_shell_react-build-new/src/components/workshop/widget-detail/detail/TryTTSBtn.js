import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import PauseIcon from '@heroicons/react/24/outline/PauseIcon';
import PlayIcon from '@heroicons/react/24/outline/PlayIcon';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { useBoolean } from 'usehooks-ts';
import { ttsWidgetTrail } from '../../../../apis/workshop.js';
import { Button } from '../../../../common/components/ui/button.js';
import { useNotification } from '../../../../common/hooks/useNotification.js';
export default function TryTTSBtn({ widgetId }) {
    const { warning } = useNotification();
    const t = useTranslations('workshop');
    const { value: loading, setTrue, setFalse } = useBoolean(false);
    const { value: playing, setTrue: setPlaying, setFalse: setPlayingFalse } = useBoolean(false);
    const [trailVoiceUrl, setTrailVoiceUrl] = useState();
    const ref = useRef(null);
    const onPlay = () => {
        setPlaying();
    };
    const handlePlay = () => {
        if (ref.current) {
            if (ref.current.paused) {
                ref.current.play();
            }
        }
    };
    const handlePause = () => {
        if (ref.current && !ref.current.paused) {
            ref.current.pause();
            setPlayingFalse();
        }
    };
    const handleError = () => {
        warning({
            content: t('tts_widget_trail_failed')
        });
        setTrailVoiceUrl(undefined);
    };
    const handleEnded = () => {
        if (ref.current) {
            setPlayingFalse();
        }
    };
    const handleClick = async (e) => {
        e.preventDefault();
        if (playing) {
            handlePause();
        }
        else {
            if (!trailVoiceUrl) {
                await tryVoice();
            }
            handlePlay();
        }
    };
    const tryVoice = async () => {
        try {
            setTrue();
            const { data, success } = await ttsWidgetTrail(widgetId);
            if (!success) {
                warning({
                    content: t('tts_widget_trail_failed')
                });
                return;
            }
            setTrailVoiceUrl(data);
        }
        catch (e) {
        }
        finally {
            setFalse();
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "primary", color: "default", className: "w-7 h-7 px-1 min-w-7", onClick: handleClick, loading: loading, children: playing ? (_jsx(PauseIcon, { className: "w-[14px] h-[14px] text-brand stroke-[2px]" })) : (_jsx(PlayIcon, { className: "w-[14px] h-[14px] text-brand stroke-[2px]" })) }), trailVoiceUrl && (_jsx("audio", { ref: ref, src: trailVoiceUrl, onError: handleError, autoPlay: true, onPlay: onPlay, onEnded: handleEnded }))] }));
}
