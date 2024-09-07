"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const XCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/XCircleIcon"));
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/solid/PlayIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const enums_1 = require("../../../../../chat/model/enums.js");
const audio_playing_1 = __importDefault(require("../../../../../common/components/ui/icons/solid/audio-playing.js"));
const spinner_1 = __importDefault(require("../../../../../common/components/ui/spinner.js"));
const useDebounce_1 = __importDefault(require("../../../../../common/hooks/useDebounce.js"));
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
const store_1 = require("../../../../../services/store/index.js");
function AudioStreamPlayer({ replyUid, id, audioList, borderColor, messageStatus, autoPlay, showProgressBar }) {
    const changePlayingAudio = (0, store_1.useChatStore)(state => state.changePlayingAudio);
    const clearAudioQueue = (0, store_1.useChatStore)(state => state.clearAudioQueue);
    const playingAudio = (0, store_1.useChatStore)(state => state.playingAudio);
    const pushAudioIdToQueue = (0, store_1.useChatStore)(state => state.pushAudioIdToQueue);
    const removePlayedAudio = (0, store_1.useChatStore)(state => state.removePlayedAudio);
    const sentMsgIdList = (0, store_1.useChatStore)(state => state.sentMsgIdList);
    const t = (0, next_intl_1.useTranslations)('chat');
    const audioRef = (0, react_2.useRef)(null);
    const mediaSourceRef = (0, react_2.useRef)(null);
    if (!mediaSourceRef.current) {
        mediaSourceRef.current = new MediaSource();
    }
    const sourceBufferRef = (0, react_2.useRef)(null);
    const appendedIndexRef = (0, react_2.useRef)(null);
    if (!appendedIndexRef.current) {
        appendedIndexRef.current = new Set();
    }
    const [sourceOpened, setSourceOpened] = (0, react_2.useState)(false);
    const [duration, setDuration] = (0, react_2.useState)(0);
    const [loading, setLoading] = (0, react_2.useState)(true);
    const [currentTime, setCurrentTime] = (0, react_2.useState)(0);
    const [isPlaying, setIsPlaying] = (0, react_2.useState)(false);
    const [allBufferAppended, setAllBufferAppended] = (0, react_2.useState)(false);
    const [userPaused, setUserPaused] = (0, react_2.useState)(false);
    const hasError = false;
    const waitingForNextAudio = duration - currentTime < 0.3 && !allBufferAppended;
    const isSentFromHere = (0, react_2.useMemo)(() => {
        return sentMsgIdList && sentMsgIdList.includes(replyUid);
    }, [replyUid, sentMsgIdList]);
    const isAudioStreamFromStart = (0, react_2.useMemo)(() => {
        return !!audioList?.length && audioList.some(x => x.index === 0);
    }, [audioList]);
    const checkAudioListCallback = (0, react_2.useCallback)(() => {
        if (!allBufferAppended) {
            setAllBufferAppended(true);
        }
    }, [allBufferAppended]);
    const receiveNewAudioUrl = (0, useDebounce_1.default)(checkAudioListCallback, 10000);
    const processAudioData = (0, react_2.useCallback)(() => {
        if ((audioList?.length || 0) > 0) {
            receiveNewAudioUrl();
        }
        try {
            if (!sourceBufferRef.current) {
                return;
            }
            if (!sourceBufferRef.current?.updating) {
                let toBeAppendedBuffer = null;
                for (const audioBuffer of audioList || []) {
                    if (!appendedIndexRef.current.has(audioBuffer.index)) {
                        toBeAppendedBuffer = audioBuffer;
                        break;
                    }
                }
                if (!toBeAppendedBuffer) {
                    return;
                }
                appendedIndexRef.current.add(toBeAppendedBuffer.index);
                if (!toBeAppendedBuffer.isFinal) {
                    sourceBufferRef.current.appendBuffer(toBeAppendedBuffer.audio);
                    sourceBufferRef.current.addEventListener('updateend', () => {
                        if (!sourceBufferRef.current) {
                            return;
                        }
                        if (sourceBufferRef.current?.buffered.length !== 0) {
                            setDuration(sourceBufferRef.current.buffered.end(0));
                        }
                        if (appendedIndexRef.current.size !== audioList?.length) {
                            processAudioData();
                        }
                    }, {
                        once: true
                    });
                }
                else {
                    mediaSourceRef.current.addEventListener('sourceended', () => {
                        if (sourceBufferRef.current) {
                            if (sourceBufferRef.current.buffered.length !== 0) {
                                setDuration(sourceBufferRef.current.buffered.end(0));
                            }
                        }
                        setAllBufferAppended(true);
                    }, {
                        once: true
                    });
                    sourceBufferRef.current.abort();
                    mediaSourceRef.current.endOfStream();
                }
            }
        }
        catch (error) {
            console.error('Caughted error', error);
        }
    }, [audioList]);
    const handleSourceOpen = () => {
        if (audioRef.current) {
            URL.revokeObjectURL(audioRef.current.src);
        }
        sourceBufferRef.current = mediaSourceRef.current.addSourceBuffer('audio/mpeg');
        setSourceOpened(true);
    };
    (0, react_2.useEffect)(() => {
        mediaSourceRef.current.addEventListener('sourceopen', handleSourceOpen, {
            once: true
        });
        if (audioRef.current) {
            audioRef.current.src = URL.createObjectURL(mediaSourceRef.current);
        }
    }, []);
    (0, react_2.useEffect)(() => {
        if (!audioList?.length || !isAudioStreamFromStart || !sourceOpened || (0, common_helper_1.isIos)()) {
            return;
        }
        if (audioList.some(a => a.index === 0) && !userPaused && isSentFromHere && autoPlay) {
            pushAudioIdToQueue(id);
        }
        if (loading) {
            setLoading(false);
        }
        processAudioData();
    }, [
        audioList,
        id,
        isSentFromHere,
        loading,
        processAudioData,
        pushAudioIdToQueue,
        sourceOpened,
        isAudioStreamFromStart,
        autoPlay
    ]);
    (0, react_2.useEffect)(() => {
        if (!loading) {
            const audio = audioRef.current;
            if (playingAudio === id) {
                if (audio) {
                    audio
                        .play()
                        .then(() => {
                        setIsPlaying(true);
                    })
                        .catch(err => {
                        console.error(err, err?.stack);
                    });
                }
            }
            else if (audio) {
                audio?.pause();
                setIsPlaying(false);
            }
        }
    }, [id, loading, playingAudio]);
    const handleAudioProgressChangeStart = () => {
        const audio = audioRef.current;
        if (!audio.paused) {
            audio?.pause();
            setIsPlaying(false);
        }
    };
    const handleAudioProgressChange = (newValue) => {
        const audio = audioRef.current;
        audio.currentTime = newValue;
        setCurrentTime(audio.currentTime);
    };
    const handleAudioProgressChangeEnd = () => {
        const audio = audioRef.current;
        if (audio.paused && playingAudio === id) {
            audio
                .play()
                .then(() => {
                setIsPlaying(true);
            })
                .catch(err => {
                console.error(err, err?.stack);
            });
        }
    };
    const handleAudioTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio) {
            return;
        }
        setCurrentTime(audio.currentTime || 0);
        if (duration - audio.currentTime <= 0.3 && allBufferAppended) {
            removePlayedAudio(id);
            changePlayingAudio();
            audio.currentTime = 0;
            setCurrentTime(0);
        }
        if (!audio.paused) {
            requestAnimationFrame(handleAudioTimeUpdate);
        }
    };
    const togglePlayStatus = () => {
        clearAudioQueue();
        setUserPaused(true);
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current
                    .play()
                    .then(() => {
                    setIsPlaying(true);
                    changePlayingAudio(id);
                })
                    .catch(err => {
                    console.error(err, err?.stack);
                });
            }
            else {
                audioRef.current?.pause();
                setIsPlaying(false);
                changePlayingAudio();
            }
        }
    };
    const UIDuration = !duration
        ? (0, common_helper_1.durationFormatter)(0)
        : duration < 1
            ? (0, common_helper_1.durationFormatter)(1)
            : (0, common_helper_1.durationFormatter)(duration);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('pb-3 leading-7 flex flex-col justify-start items-start', {
            'w-full': showProgressBar,
            'w-[120px]': !showProgressBar
        }), children: [showProgressBar && ((0, jsx_runtime_1.jsx)("div", { className: "bg-primary h-[1px] w-full items-start", style: { width: `${(0, common_helper_1.getPercent)(currentTime, duration) * 100}%` } })), (0, jsx_runtime_1.jsx)("div", { className: "w-full mt-2 pl-3", children: hasError || messageStatus === enums_1.MessageStatusEnum.ERROR ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-[4px] items-center px-[4px]", children: [(0, jsx_runtime_1.jsx)(XCircleIcon_1.default, { className: "w-[20px] h-[20px] stroke-[#F62ECA]" }), t('audio_cannot_load')] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-start space-x-2 text-xs", children: [(0, jsx_runtime_1.jsx)(react_1.IconButton, { onClick: togglePlayStatus, w: "20px", h: "20px", minW: "20px", borderRadius: "50%", "aria-label": "audio control button", className: loading || waitingForNextAudio ? '' : `bg-primary`, _hover: {
                                background: 'var(--primary)',
                                opacity: '0.9'
                            }, _loading: {
                                _hover: {
                                    background: 'var(--primary)',
                                    opacity: '0.4'
                                }
                            }, _disabled: {
                                opacity: 0.3,
                                cursor: 'not-allowed'
                            }, isLoading: loading || waitingForNextAudio, isDisabled: loading || waitingForNextAudio, spinner: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "md", className: "text-brand" }), children: isPlaying ? (0, jsx_runtime_1.jsx)(audio_playing_1.default, {}) : (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "ml-[2px] fill-[#fefefe] w-[16px] h-[16px]" }) }), (0, jsx_runtime_1.jsx)("span", { className: "w-10 text-secondary text-sm dark:text-primary", children: isPlaying ? (0, common_helper_1.durationFormatter)(currentTime) : UIDuration })] })) }), (0, jsx_runtime_1.jsx)("audio", { ref: audioRef, onTimeUpdate: handleAudioTimeUpdate })] }));
}
exports.default = AudioStreamPlayer;
