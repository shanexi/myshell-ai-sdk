import { GptPack } from './protocol/types';
declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
    interface AudioContext {
        setSinkId(sinkId: string): void;
    }
}
interface AudioPlayerProps {
    onStatusChange: (status: number, segment: GptPack) => void;
}
export declare class AudioPlayer {
    private audioQueue;
    private audioContext;
    private currentAudio;
    private currentAudioSource;
    private onStatusChange;
    private currentRound;
    constructor(props: AudioPlayerProps);
    init: () => void;
    talk: (segment: GptPack, round: number, isFinal: boolean) => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    setOutputDevice(deviceId?: string): void;
    private handleAudioEnd;
    private createEmptySource;
    private createNewSource;
    private playNextAudio;
}
export {};
