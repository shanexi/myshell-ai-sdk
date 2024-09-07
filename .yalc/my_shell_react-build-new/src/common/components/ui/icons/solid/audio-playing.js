"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AudioPlaying;
const jsx_runtime_1 = require("react/jsx-runtime");
const lottie_web_1 = __importDefault(require("lottie-web"));
const react_1 = require("react");
function AudioPlaying(props) {
    const playingRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const lRef = playingRef.current;
        let animation;
        if (lRef) {
            animation = lottie_web_1.default.loadAnimation({
                container: playingRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: require('@/common/assets/audio-playing.json')
            });
        }
        return () => animation.destroy();
    }, []);
    return (0, jsx_runtime_1.jsx)("div", { ref: playingRef, className: "w-[12px]" });
}
