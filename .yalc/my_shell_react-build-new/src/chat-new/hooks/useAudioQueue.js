import { useMemo, useState } from 'react';
export default function useAudioQueue() {
    const [autoPlayIdQueue, setAutoPlayIdQueue] = useState([]);
    const playingAudio = useMemo(() => {
        return autoPlayIdQueue[0];
    }, [autoPlayIdQueue]);
    const enQueue = (id) => {
        if (autoPlayIdQueue.includes(id)) {
            return;
        }
        setAutoPlayIdQueue(prevQueue => [...prevQueue, id]);
    };
    const deQueue = () => {
        setAutoPlayIdQueue(prevQueue => prevQueue.slice(1));
    };
    const clearQueue = () => {
        setAutoPlayIdQueue([]);
    };
    const playNext = () => {
        if (playingAudio) {
            deQueue();
        }
    };
    return {
        playingAudio,
        autoPlayIdQueue,
        enQueue,
        deQueue,
        clearQueue,
        playNext
    };
}
