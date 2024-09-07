import React from 'react';
export interface IAudioProps extends React.AudioHTMLAttributes<HTMLAudioElement> {
    src?: string;
    onManuallyInteracted?: (play: boolean) => void;
    onEnded?: () => void;
    serverDuration?: number;
}
declare const AudioPlayer: React.ForwardRefExoticComponent<IAudioProps & React.RefAttributes<{
    play: () => void;
    pause: () => void;
}>>;
export default AudioPlayer;
