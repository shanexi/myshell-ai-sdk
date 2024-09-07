"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const store_1 = require("../../../services/store/index.js");
const useAudioQueue = () => {
    const playingAudio = (0, store_1.useChatStore)(state => state.playingAudio);
    const audioQueue = (0, store_1.useChatStore)(state => state.audioQueue);
    const changePlayingAudio = (0, store_1.useChatStore)(state => state.changePlayingAudio);
    const clearAudioQueue = (0, store_1.useChatStore)(state => state.clearAudioQueue);
    (0, react_1.useEffect)(() => {
        if (!playingAudio && audioQueue.length !== 0) {
            changePlayingAudio(audioQueue[0]);
        }
    }, [audioQueue, changePlayingAudio, playingAudio]);
    (0, react_1.useEffect)(() => {
        return () => {
            changePlayingAudio();
            clearAudioQueue();
        };
    }, [changePlayingAudio, clearAudioQueue]);
};
exports.default = useAudioQueue;
