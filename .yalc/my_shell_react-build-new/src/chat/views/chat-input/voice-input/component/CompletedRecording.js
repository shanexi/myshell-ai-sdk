"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const PaperAirplaneIcon_1 = __importDefault(require("@heroicons/react/24/solid/PaperAirplaneIcon"));
const PauseIcon_1 = __importDefault(require("@heroicons/react/24/solid/PauseIcon"));
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/solid/PlayIcon"));
const TrashIcon_1 = __importDefault(require("@heroicons/react/24/solid/TrashIcon"));
const react_1 = require("react");
const spinner_1 = __importDefault(require("../../../../../common/components/ui/spinner.js"));
const useWaveAnimation_1 = __importDefault(require("../../../../../common/hooks/useWaveAnimation.js"));
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
function CompletedRecording(props) {
    const audioPlayer = (0, react_1.useRef)(null);
    const { lottieRef, stopAnimation, startAnimation } = (0, useWaveAnimation_1.default)(false);
    function handleClick() {
        if (audioPlayer.current) {
            if (props.isPlaying) {
                audioPlayer.current?.pause();
                stopAnimation();
                props.setIsPlaying(false);
            }
            else {
                audioPlayer.current.play();
                startAnimation();
                props.setIsPlaying(true);
            }
        }
    }
    function afterPlayEnd() {
        stopAnimation();
        props.setIsPlaying(false);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center mt-3 text-center text-gray-600 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-[#141718] w-52 h-12 inline-flex justify-center items-center space-x-3 px-4 text-white rounded-4xl", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-grow text-right", children: [(0, common_helper_1.timeFormatter)(props.duration), "\""] }), (0, jsx_runtime_1.jsx)("div", { ref: lottieRef, className: "w-36 h-12" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)("div", { className: `w-10 h-10 ${props.sending ? '' : 'hover:bg-[#E2E8F0]'}  flex items-center justify-center  rounded-[50%]`, children: (0, jsx_runtime_1.jsx)(TrashIcon_1.default, { className: `fill-[#4b5563] w-[16px] h-[16px] ${props.sending ? 'pointer-events-none fill-[#E2E8F0] opacity-80 cursor-not-allowed' : 'cursor-pointer'}`, onClick: props.clearRecord }) }), (0, jsx_runtime_1.jsxs)("div", { onClick: () => handleClick(), className: "flex justify-center items-center w-16 h-16 mt-3 mb-4 bg-[#ECEFFF] rounded-full cursor-pointer", children: [props.isPlaying ? ((0, jsx_runtime_1.jsx)(PauseIcon_1.default, { className: "text-4xl fill-primary w-[30px] h-[30px]" })) : ((0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "text-4xl fill-primary w-[30px] h-[30px]" })), (0, jsx_runtime_1.jsx)("audio", { ref: audioPlayer, src: props.audioUrl, onEnded: afterPlayEnd })] }), (0, jsx_runtime_1.jsx)("div", { className: `w-10 h-10 hover:bg-[#E2E8F0] flex items-center justify-center  rounded-[50%] cursor-pointer ${props.sending ? 'bg-[#E2E8F0]' : ''}`, children: props.sending ? ((0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm", className: "text-[#4b5563] w-[16px] h-[16px]" })) : ((0, jsx_runtime_1.jsx)(PaperAirplaneIcon_1.default, { className: "fill-[#4b5563] w-[16px] h-[16px]", onClick: props.sendVoiceMessage })) })] })] }));
}
exports.default = CompletedRecording;
