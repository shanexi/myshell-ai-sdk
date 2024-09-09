import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useEffect, useMemo, useRef } from 'react';
import { MessageContext } from '../../../../../../chat-new/context/MessageContext.js';
import { StaticContext } from '../../../../../../chat-new/context/StaticContext.js';
import { AudioSpeedMap } from '../../../../../../chat-new/model/constants.js';
import AudioPlayer from './AudioPlayer.js';
import RegenPlaceholder from './regen-placeholder/views/regen-placeholder.js';
export default function AudioDisplay({ message, showAudio = false }) {
    const audioPlayerRef = useRef(null);
    const { chatSetting } = useContext(StaticContext);
    const { playingAudio, playNext, enQueue, clearQueue } = useContext(MessageContext);
    const { audioUrl, status, id, source } = message;
    const audioRegenNeeded = useMemo(() => {
        if (showAudio && message?.status === 'DONE' && !message?.audioUrl) {
            return true;
        }
        if (chatSetting?.audioSpeed && message?.audioSpeed !== AudioSpeedMap[chatSetting?.audioSpeed]) {
            return true;
        }
        return false;
    }, [showAudio, message?.status, message?.audioUrl, message?.audioSpeed, chatSetting?.audioSpeed]);
    useEffect(() => {
        if (playingAudio === id && audioUrl) {
            audioPlayerRef.current?.play();
        }
        else {
            audioPlayerRef.current?.pause();
        }
    }, [playingAudio, audioUrl, status, id]);
    const onEnded = () => {
        playNext?.();
    };
    const onManuallyInteracted = (play) => {
        clearQueue?.();
        if (play) {
            enQueue?.(id);
        }
    };
    if (source === 'USER') {
        if (message?.audioUrl) {
            return _jsx(AudioPlayer, { src: message?.audioUrl });
        }
    }
    else {
        if (showAudio) {
            if (audioRegenNeeded) {
                return _jsx(RegenPlaceholder, {});
            }
            return (_jsx(AudioPlayer, { ref: audioPlayerRef, src: message?.audioUrl, onEnded: onEnded, onManuallyInteracted: onManuallyInteracted, serverDuration: message?.duration }));
        }
        return null;
    }
}
