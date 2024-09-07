"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InlineVideoPlayer;
const jsx_runtime_1 = require("react/jsx-runtime");
function InlineVideoPlayer({ src }) {
    return ((0, jsx_runtime_1.jsx)("video", { src: src, loop: true, autoPlay: true, muted: true, playsInline: true, disablePictureInPicture: true, className: "w-full h-full block object-cover" }));
}
