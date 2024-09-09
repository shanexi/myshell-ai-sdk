"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PinchZoomImage;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const hammerjs_1 = __importDefault(require("hammerjs"));
const react_1 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const spinner_1 = __importDefault(require("../../../../../../../common/components/ui/spinner"));
function PinchZoomImage({ imgObj, onPinchStart, onPinchEnd }) {
    const containerRef = (0, react_1.useRef)(null);
    const [scaleValue, setScaleValue] = (0, react_1.useState)(1);
    const prevScale = (0, react_1.useRef)(1);
    const imageRef = (0, react_1.useRef)(null);
    const [loaded, setLoaded] = (0, react_1.useState)(false);
    const handleLoaded = () => {
        setLoaded(true);
    };
    (0, usehooks_ts_1.useEffectOnce)(() => {
        const image = imageRef.current;
        if (image) {
            image.addEventListener('load', handleLoaded, {
                once: true
            });
        }
    });
    (0, react_1.useEffect)(() => {
        if (containerRef.current) {
            const hammer = new hammerjs_1.default(containerRef.current);
            hammer.get('pinch').set({ enable: true });
            hammer.on('pinchstart', () => {
                onPinchStart();
            });
            hammer.on('pinch', e => {
                e.srcEvent.stopPropagation();
                const newScale = Math.min(3, Math.max(0.5, prevScale.current * e.scale));
                setScaleValue(newScale);
            });
            hammer.on('pinchend', e => {
                onPinchEnd();
                prevScale.current *= e.scale;
            });
            return () => {
                hammer.destroy();
            };
        }
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            scale: scaleValue
        }, ref: containerRef, className: "w-full h-full relative flex justify-center items-center", children: [!loaded && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-[#00000033] backdrop-blur-2xl", children: (0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 p-[6px] flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "md", speed: "slow", className: "text-white" }) }) })), (0, jsx_runtime_1.jsx)("img", { ref: imageRef, alt: "image", src: imgObj.url, width: imgObj.mediaFileMetadata?.width || 9999, height: imgObj.mediaFileMetadata?.height || 9999, className: (0, clsx_1.default)('h-auto max-w-full max-h-full object-scale-down touch-none z-20', imgObj.mediaFileMetadata?.width ? `w-[${imgObj.mediaFileMetadata.width}px]` : 'w-auto', imgObj.mediaFileMetadata?.height ? `h-[${imgObj.mediaFileMetadata.height}px]` : 'h-auto') })] }));
}
