"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useDevice_1 = require("../../../common/hooks/useDevice");
let audioAPI = null;
const getAudioAPI = () => {
    if (audioAPI)
        return audioAPI;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const gainNode = context.createGain();
    gainNode.gain.value = 1;
    let currentSourceNode = null;
    window.addEventListener('touchstart', () => {
        const buffer = context.createBuffer(1, 1, 22050);
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
    }, { once: true });
    audioAPI = {
        play(arrayBuffer, start) {
            context.decodeAudioData(arrayBuffer.slice(0), audioBuffer => {
                if (context.state === 'suspended') {
                    if (currentSourceNode) {
                        currentSourceNode.stop();
                    }
                    context.resume();
                }
                if (gainNode.gain.value === 0) {
                    gainNode.gain.value = 1;
                }
                const source = context.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(context.destination);
                currentSourceNode = source;
                source.start(0, start);
            });
        },
        pause() {
            context.suspend();
        }
    };
    return audioAPI;
};
const IosAudioPlayer = (0, react_1.forwardRef)((props, ref) => {
    const audioRef = (0, react_1.useRef)(null);
    const audioApi = getAudioAPI();
    const loadTask = (0, react_1.useRef)();
    (0, react_1.useLayoutEffect)(() => {
        return () => {
            audioApi.pause();
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);
    const handlePlay = (0, react_1.useCallback)(async () => {
        if (!audioRef.current?.paused)
            return Promise.reject();
        if (props.src && loadTask.current) {
            const arrayBuffer = await loadTask.current;
            if (arrayBuffer) {
                return audioApi.play(arrayBuffer, audioRef.current.currentTime);
            }
        }
        return Promise.resolve();
    }, []);
    const handleLoad = (0, react_1.useCallback)(async () => {
        if (props.src) {
            try {
                loadTask.current = window
                    .fetch(props.src)
                    .then(response => response.arrayBuffer())
                    .catch(error => {
                    console.error(error);
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }, []);
    (0, react_1.useImperativeHandle)(ref, () => {
        return {
            play: () => handlePlay()
                .then(() => {
                console.log('audioCompPlay');
                return audioRef.current.play();
            })
                .catch(() => {
            }),
            pause: () => {
                audioAPI?.pause();
                return audioRef.current.pause();
            },
            load: () => {
                handleLoad();
                return audioRef.current.load();
            },
            addEventListener: (type, listener, options) => {
                return audioRef.current.addEventListener(type, listener, options);
            },
            get currentTime() {
                return audioRef.current.currentTime;
            },
            set currentTime(value) {
                audioRef.current.currentTime = value;
            },
            get duration() {
                return audioRef.current.duration;
            },
            get paused() {
                return audioRef.current.paused;
            }
        };
    }, [handlePlay, handleLoad]);
    return (0, jsx_runtime_1.jsx)("audio", { ...props, muted: true, ref: audioRef });
});
IosAudioPlayer.displayName = 'IosAudioPlayer';
const useAudioPlayer = () => {
    const { isIos } = (0, useDevice_1.useDevice)();
    return !isIos ? 'audio' : IosAudioPlayer;
};
exports.default = useAudioPlayer;
