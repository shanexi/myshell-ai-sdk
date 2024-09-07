"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FlowingLogo;
const jsx_runtime_1 = require("react/jsx-runtime");
const lottie_web_1 = __importDefault(require("lottie-web"));
const next_themes_1 = require("next-themes");
const react_1 = require("react");
const react_use_1 = require("react-use");
function FlowingLogo() {
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const isDark = resolvedTheme === 'dark';
    const logoRef = (0, react_1.useRef)(null);
    (0, react_use_1.useEffectOnce)(() => {
        const lRef = logoRef.current;
        let animation;
        if (lRef) {
            animation = lottie_web_1.default.loadAnimation({
                container: logoRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: isDark ? require('./flowing-logo-dark.json') : require('./flowing-logo-light.json')
            });
        }
        return () => animation.destroy();
    });
    return (0, jsx_runtime_1.jsx)("div", { ref: logoRef, className: "w-[49px] h-[32px]" });
}
