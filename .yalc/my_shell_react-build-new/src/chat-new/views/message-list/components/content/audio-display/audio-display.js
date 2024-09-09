"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AudioDisplay;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const MessageContext_1 = require("../../../../../../chat-new/context/MessageContext");
const StaticContext_1 = require("../../../../../../chat-new/context/StaticContext");
const constants_1 = require("../../../../../../chat-new/model/constants");
const AudioPlayer_1 = __importDefault(require("./AudioPlayer"));
const regen_placeholder_1 = __importDefault(require("./regen-placeholder/views/regen-placeholder"));
function AudioDisplay({ message, showAudio = false }) {
    const audioPlayerRef = (0, react_1.useRef)(null);
    const { chatSetting } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { playingAudio, playNext, enQueue, clearQueue } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    const { audioUrl, status, id, source } = message;
    const audioRegenNeeded = (0, react_1.useMemo)(() => {
        if (showAudio && message?.status === 'DONE' && !message?.audioUrl) {
            return true;
        }
        if (chatSetting?.audioSpeed && message?.audioSpeed !== constants_1.AudioSpeedMap[chatSetting?.audioSpeed]) {
            return true;
        }
        return false;
    }, [showAudio, message?.status, message?.audioUrl, message?.audioSpeed, chatSetting?.audioSpeed]);
    (0, react_1.useEffect)(() => {
        if (playingAudio === id && audioUrl) {
            audioPlayerRef.current?.play();
        }
        else {
            audioPlayerRef.current?.pause();
        }
    }, [playingAudio, audioUrl, status, id]);
    const onEnded = () => {
        playNext?.();
    };
    const onManuallyInteracted = (play) => {
        clearQueue?.();
        if (play) {
            enQueue?.(id);
        }
    };
    if (source === 'USER') {
        if (message?.audioUrl) {
            return (0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { src: message?.audioUrl });
        }
    }
    else {
        if (showAudio) {
            if (audioRegenNeeded) {
                return (0, jsx_runtime_1.jsx)(regen_placeholder_1.default, {});
            }
            return ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { ref: audioPlayerRef, src: message?.audioUrl, onEnded: onEnded, onManuallyInteracted: onManuallyInteracted, serverDuration: message?.duration }));
        }
        return null;
    }
}
