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
const audio_playing_1 = __importDefault(require("../../../../common/components/ui/icons/solid/audio-playing.js"));
const useAudioPlayer_1 = __importDefault(require("../../../../chat/views/hooks/useAudioPlayer.js"));
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const store_1 = require("../../../../services/store/index.js");
function AudioPlayer(props) {
    const playingAudio = (0, store_1.useChatStore)(state => state.playingAudio);
    const changePlayingAudio = (0, store_1.useChatStore)(state => state.changePlayingAudio);
    const clearAudioQueue = (0, store_1.useChatStore)(state => state.clearAudioQueue);
    const removePlayedAudio = (0, store_1.useChatStore)(state => state.removePlayedAudio);
    const sentMsgIdList = (0, store_1.useChatStore)(state => state.sentMsgIdList);
    const pushAudioIdToQueue = (0, store_1.useChatStore)(state => state.pushAudioIdToQueue);
    const audioRef = (0, react_2.useRef)(null);
    const [duration, setDuration] = (0, react_2.useState)(0);
    const [isPlaying, setIsPlaying] = (0, react_2.useState)(false);
    const [currentTime, setCurrentTime] = (0, react_2.useState)(0);
    const [audioHasError, setAudioHasError] = (0, react_2.useState)(false);
    const [userPaused, setUserPaused] = (0, react_2.useState)(false);
    const isBlob = props.src?.startsWith('blob:');
    const t = (0, next_intl_1.useTranslations)('chat');
    function afterPlayEnd() {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
        if (isBlob) {
            setIsPlaying(false);
        }
        else {
            setCurrentTime(0);
            removePlayedAudio(props.id);
            changePlayingAudio();
        }
    }
    const AudioComponent = (0, useAudioPlayer_1.default)();
    const isSentFromHere = (0, react_2.useMemo)(() => {
        return sentMsgIdList && sentMsgIdList.includes(props.replyUid);
    }, [props.replyUid, sentMsgIdList]);
    (0, react_2.useEffect)(() => {
        if ((0, common_helper_1.isIos)() && !isBlob) {
            audioRef.current && audioRef.current.load();
        }
    }, []);
    (0, react_2.useEffect)(() => {
        if (props.src && !isBlob && !userPaused && isSentFromHere && props.autoPlay) {
            pushAudioIdToQueue(props.id);
        }
    }, [isSentFromHere, props.autoPlay, props.id, props.src, pushAudioIdToQueue, userPaused]);
    const handleAudioLoad = () => {
        if (!props.blobDuration) {
            const audio = audioRef?.current;
            setDuration(audio.duration);
        }
    };
    (0, react_2.useEffect)(() => {
        if (isBlob) {
            return;
        }
        const audio = audioRef.current;
        if (playingAudio === props.id) {
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
    }, [props.id, playingAudio]);
    const handleAudioToggle = () => {
        clearAudioQueue();
        setUserPaused(true);
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current
                    .play()
                    .then(() => {
                    setIsPlaying(true);
                    changePlayingAudio(props.id);
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
    const handleAudioProgressChangeStart = () => {
        const audio = audioRef.current;
        if (!audio.paused) {
            audio.pause();
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
        if (audio.paused && playingAudio === props.id) {
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
        if (audio) {
            setCurrentTime(audio.currentTime);
            if (!audio.paused) {
                requestAnimationFrame(handleAudioTimeUpdate);
            }
        }
    };
    const handleAudioError = () => {
        setAudioHasError(true);
    };
    const curDuration = props.blobDuration || duration;
    const isLoading = !isBlob && !!(!props.isFromHistory && (!props.src || (props.src && !curDuration)));
    const UIDuration = !curDuration
        ? (0, common_helper_1.durationFormatter)(0)
        : curDuration < 1
            ? (0, common_helper_1.durationFormatter)(1)
            : (0, common_helper_1.durationFormatter)(curDuration);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('audio-player pb-3 leading-7 flex flex-col justify-start items-start', {
            'w-full': props.showProgressBar,
            'w-[120px]': !props.showProgressBar
        }), children: [props.showProgressBar && ((0, jsx_runtime_1.jsx)("div", { className: "bg-primary h-[1px] w-full items-start", style: { width: `${(0, common_helper_1.getPercent)(currentTime, curDuration) * 100}%` } })), (0, jsx_runtime_1.jsx)("div", { className: "w-full mt-2 pl-3", children: audioHasError ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-[4px] items-center px-[4px]", children: [(0, jsx_runtime_1.jsx)(XCircleIcon_1.default, { className: "w-[20px] h-[20px] stroke-[#EC2F0D]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-on-surface", children: t('audio_cannot_load') })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-start space-x-2 text-xs", children: [(0, jsx_runtime_1.jsx)(react_1.IconButton, { onClick: handleAudioToggle, w: "20px", h: "20px", minW: "20px", borderRadius: "50%", className: isLoading ? '' : `bg-primary`, _hover: {
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
                            }, "aria-label": "audio control button", isLoading: isLoading, isDisabled: isLoading, spinner: (0, jsx_runtime_1.jsx)(spinner_1.default, { className: "text-brand w-[16px] h-[16px]" }), children: isPlaying ? (0, jsx_runtime_1.jsx)(audio_playing_1.default, {}) : (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "ml-[2px] fill-[#fefefe] w-[16px] h-[16px]" }) }), (0, jsx_runtime_1.jsx)("span", { className: "w-10 text-secondary text-sm dark:text-primary", children: isPlaying ? (0, common_helper_1.durationFormatter)(currentTime) : UIDuration })] })) }), (0, jsx_runtime_1.jsx)(AudioComponent, { ref: audioRef, src: props.src, onLoadedData: handleAudioLoad, onEnded: afterPlayEnd, onTimeUpdate: handleAudioTimeUpdate, onError: handleAudioError, autoPlay: false })] }));
}
exports.default = AudioPlayer;
