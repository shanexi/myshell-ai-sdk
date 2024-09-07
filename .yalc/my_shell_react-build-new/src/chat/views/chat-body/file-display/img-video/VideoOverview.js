"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/solid/PlayIcon"));
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const spinner_1 = __importDefault(require("../../../../../common/components/ui/spinner.js"));
function VideoOverview({ url, onViewVideo, customClass, showPlayBtn = true, showRadius = true, showLoading = true }) {
    const videoRef = (0, react_1.useRef)(null);
    const [loaded, setLoaded] = (0, react_1.useState)(false);
    const handleLoaded = () => {
        setLoaded(true);
    };
    (0, usehooks_ts_1.useEffectOnce)(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener('loadedmetadata', handleLoaded, {
                once: true
            });
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative w-full h-full', customClass, showRadius ? 'rounded-md overflow-hidden' : ''), children: [!loaded && showLoading && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-full h-full flex justify-center items-center z-[1] bg-[#00000033] backdrop-blur-2xl", children: (0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 p-[6px] flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "md", speed: "slow", className: "text-white" }) }) })), (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full h-full min-h-[240px]", children: [(0, jsx_runtime_1.jsx)("video", { ref: videoRef, src: url, muted: true, playsInline: true, disablePictureInPicture: true, className: "w-full h-full object-cover", preload: "metadata" }), showPlayBtn && ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full absolute top-0 left-0 flex justify-center items-center bg-[#00000033]", children: (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "w-10 h-10 text-white cursor-pointer", onClick: () => onViewVideo && onViewVideo() }) }))] })] }));
}
const MemorizedVideoOverview = (0, react_1.memo)(VideoOverview);
exports.default = MemorizedVideoOverview;
