"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AudioPlayer;
const jsx_runtime_1 = require("react/jsx-runtime");
const PlayIcon_1 = __importDefault(require("@heroicons/react/20/solid/PlayIcon"));
const react_use_1 = require("react-use");
const useAudioPlayer_1 = __importDefault(require("../../../chat/views/hooks/useAudioPlayer.js"));
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const audio_playing_1 = __importDefault(require("../../../common/components/ui/icons/solid/audio-playing.js"));
const common_helper_1 = require("../../../common/utils/common-helper.js");
function AudioPlayer({ src }) {
    const AudioComp = (0, useAudioPlayer_1.default)();
    const [audio, state, controls, ref] = (0, react_use_1.useAudio)((0, jsx_runtime_1.jsx)(AudioComp, { src: src, onEnded: () => controls.seek(0) }));
    const { paused, time, playing } = state;
    const duration = state.duration || ref.current?.duration || 0;
    const onAudioToggle = () => {
        if (paused) {
            const audios = document.getElementsByTagName('audio');
            for (let i = 0, len = audios.length; i < len; i++) {
                audios[i].pause();
            }
            controls.play();
        }
        else {
            controls.pause();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1 w-full overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-primary h-px w-full items-start", style: { width: `${(0, common_helper_1.getPercent)(time, duration) * 100}%` } }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { className: "w-6 h-6", onClick: onAudioToggle, children: paused ? (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "w-3 h-3 ml-0.5" }) : (0, jsx_runtime_1.jsx)(audio_playing_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col grow overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-brand truncate", children: (0, common_helper_1.durationFormatter)(((playing || paused) && time) || duration) }) })] }), audio] }));
}
