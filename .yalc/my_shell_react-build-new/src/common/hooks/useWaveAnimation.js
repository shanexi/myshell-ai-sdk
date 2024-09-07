"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lottie_web_1 = __importDefault(require("lottie-web"));
const react_1 = require("react");
const wave_json_1 = __importDefault(require("../../common/assets/wave.json"));
function useWaveAnimation(isImmediate = true) {
    const lottieRef = (0, react_1.useRef)(null);
    const anim = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (lottieRef.current) {
            const options = {
                container: lottieRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: wave_json_1.default
            };
            anim.current = lottie_web_1.default.loadAnimation(options);
            stopAnimation();
            if (isImmediate)
                startAnimation();
        }
        return () => {
            lottieRef.current = null;
            stopAnimation();
        };
    }, [isImmediate]);
    function stopAnimation() {
        if (anim.current) {
            anim.current.stop();
        }
    }
    function startAnimation() {
        if (anim.current) {
            anim.current.play();
        }
    }
    return {
        lottieRef,
        stopAnimation,
        startAnimation
    };
}
exports.default = useWaveAnimation;
