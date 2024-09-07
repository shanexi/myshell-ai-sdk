"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function VideoPlayer({ src, triggerPlay }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full flex justify-center items-center", children: (0, jsx_runtime_1.jsx)("video", { src: src, className: "w-auto h-auto max-w-full max-h-full object-scale-down", disablePictureInPicture: true, controls: true, controlsList: "nodownload", autoPlay: triggerPlay }) }));
}
const MemorizedVideoPlayer = (0, react_1.memo)(VideoPlayer);
exports.default = MemorizedVideoPlayer;
