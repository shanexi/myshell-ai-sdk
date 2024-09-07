"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
const useWaveAnimation_1 = __importDefault(require("../../../../../common/hooks/useWaveAnimation.js"));
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
function PauseRecording(props) {
    const { lottieRef, stopAnimation, startAnimation } = (0, useWaveAnimation_1.default)(false);
    (0, react_2.useEffect)(() => {
        startAnimation();
        return () => {
            stopAnimation();
        };
    }, [startAnimation, stopAnimation]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center mt-3 text-center text-gray-600 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-[#141718] w-52 h-12 inline-flex justify-center items-center space-x-3 px-4 text-white rounded-4xl", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-grow text-right", children: [(0, common_helper_1.timeFormatter)(props.duration), "\""] }), (0, jsx_runtime_1.jsx)("div", { ref: lottieRef, className: "w-36 h-12" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-4", children: (0, jsx_runtime_1.jsx)(react_1.Button, { onClick: props.stopRecording, backgroundColor: "#ff3b3026", className: "bg-[#ff3b3026]", w: 16, h: 16, marginTop: 3, marginBottom: 4, borderRadius: "full", _hover: {
                        backgroundColor: '#ff3b3026'
                    }, isLoading: props.stoping, children: (0, jsx_runtime_1.jsx)("div", { className: "bg-red-500 w-6 h-6 rounded-md" }) }) })] }));
}
exports.default = PauseRecording;
