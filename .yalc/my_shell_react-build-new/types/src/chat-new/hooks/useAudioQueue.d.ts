export default function useAudioQueue(): {
    playingAudio: string;
    autoPlayIdQueue: string[];
    enQueue: (id: string) => void;
    deQueue: () => void;
    clearQueue: () => void;
    playNext: () => void;
};
