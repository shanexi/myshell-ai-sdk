"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const PlayIcon_1 = __importDefault(require("@heroicons/react/20/solid/esm/PlayIcon"));
const react_1 = require("react");
const react_use_1 = require("react-use");
const useAudioPlayer_1 = __importDefault(require("../../../../../../chat/views/hooks/useAudioPlayer"));
const icon_button_1 = require("../../../../../../common/components/ui/icon-button");
const audio_playing_1 = __importDefault(require("../../../../../../common/components/ui/icons/solid/audio-playing"));
const common_helper_1 = require("../../../../../../common/utils/common-helper");
const AudioPlayer = (0, react_1.forwardRef)(({ src, onManuallyInteracted, onEnded, serverDuration }, ref) => {
    const AudioComp = (0, useAudioPlayer_1.default)();
    const [audio, state, controls] = (0, react_use_1.useAudio)((0, jsx_runtime_1.jsx)(AudioComp, { src: src, onEnded: () => {
            controls.seek(0);
            onEnded?.();
        } }));
    const { paused, time, playing } = state;
    const duration = state.duration || serverDuration || 0;
    (0, react_1.useImperativeHandle)(ref, () => ({
        play: () => {
            controls.play();
        },
        pause: () => {
            controls.pause();
        }
    }));
    const onAudioToggle = () => {
        if (paused) {
            const audios = document.getElementsByTagName('audio');
            for (let i = 0, len = audios.length; i < len; i++) {
                audios[i].pause();
            }
            controls.play();
            onManuallyInteracted?.(true);
        }
        else {
            controls.pause();
            onManuallyInteracted?.(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1 w-full overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-primary h-px w-full items-start", style: { width: `${(0, common_helper_1.getPercent)(time, duration) * 100}%` } }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { className: "w-6 h-6", onClick: onAudioToggle, loading: !src || !duration, children: paused ? (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "size-3 ml-0.5" }) : (0, jsx_runtime_1.jsx)(audio_playing_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col grow overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-brand truncate", children: (0, common_helper_1.durationFormatter)(((playing || paused) && time) || duration) }) })] }), audio] }));
});
AudioPlayer.displayName = 'AudioPlayer';
exports.default = AudioPlayer;
