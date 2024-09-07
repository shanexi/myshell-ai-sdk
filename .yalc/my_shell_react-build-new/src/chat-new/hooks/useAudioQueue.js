"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useAudioQueue;
const react_1 = require("react");
function useAudioQueue() {
    const [autoPlayIdQueue, setAutoPlayIdQueue] = (0, react_1.useState)([]);
    const playingAudio = (0, react_1.useMemo)(() => {
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
