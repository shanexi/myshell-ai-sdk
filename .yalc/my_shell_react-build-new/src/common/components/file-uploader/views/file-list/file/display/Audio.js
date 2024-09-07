"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Audio;
const jsx_runtime_1 = require("react/jsx-runtime");
const PauseIcon_1 = __importDefault(require("@heroicons/react/20/solid/PauseIcon"));
const PlayIcon_1 = __importDefault(require("@heroicons/react/20/solid/PlayIcon"));
const react_use_1 = require("react-use");
const slider_1 = require("../../../../../../../common/components/ui/slider.js");
const common_helper_1 = require("../../../../../../../common/utils/common-helper.js");
function Audio({ name, size, src, deleteEle }) {
    const [audio, state, controls] = (0, react_use_1.useAudio)({
        src: src,
        onEnded: () => controls.seek(0)
    });
    const { paused, time, duration } = state;
    const handleAudioToggle = () => {
        if (paused) {
            controls.play();
        }
        else {
            controls.pause();
        }
    };
    const handleValueChange = (value) => {
        !paused && controls.pause();
        controls.seek(value[0]);
    };
    const handleValueCommit = () => {
        controls.play();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1 w-full overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-9 h-9 rounded-full bg-surface-primary-subtle-hovered flex justify-center items-center shrink-0 cursor-pointer", onClick: handleAudioToggle, children: paused ? (0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "w-5 h-5 text-brand" }) : (0, jsx_runtime_1.jsx)(PauseIcon_1.default, { className: "w-5 h-5 text-brand" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1 grow overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-default truncate", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-subtler truncate", children: [(0, common_helper_1.durationFormatter)(duration), " ", size && `(${size})`] })] }), deleteEle] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(slider_1.Slider, { size: "sm", value: [time], min: 0, max: duration, step: 0.01, onValueChange: handleValueChange, onValueCommit: handleValueCommit }), (0, jsx_runtime_1.jsx)("span", { className: "inline-block shrink-0 text-subtler text-xs", children: (0, common_helper_1.durationFormatter)(time) })] }), audio] }));
}
